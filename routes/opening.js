// routes/opening.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

const SERVICE_KEY = process.env.PUBLIC_DATA_SERVICE_KEY;

// 영업일 안내 고정 텍스트
const openingGuide = `📌 [영업일 안내]
- 목요일: 22:30 ~ 익일 03:30
- 금요일·토요일·공휴일 전날: 22:30 ~ 익일 06:30

예시) 15일이 공휴일이면, 14일 저녁 10시 30분부터 오픈합니다.

※ 일·월·화·수는 정기 휴무입니다.
※ 영업일 및 영업시간은 내부 사정에 따라 변경될 수 있습니다.`;

async function getHolidayList(year) {
  if (!SERVICE_KEY) {
    console.warn("PUBLIC_DATA_SERVICE_KEY is not configured; holiday lookup skipped.");
    return [];
  }

  const url = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo`;
  const params = {
    ServiceKey: SERVICE_KEY,
    solYear: year,
    _type: "json",
    numOfRows: 100,
  };

  try {
    const response = await axios.get(url, { params });
    const items = response.data.response.body.items.item;
    return items.map(item => dayjs(item.locdate.toString(), "YYYYMMDD").format("YYYY-MM-DD"));
  } catch (error) {
    console.error("공휴일 불러오기 실패", error.response && error.response.status);
    return [];
  }
}

router.post("/", async (req, res) => {
  const now = dayjs().tz("Asia/Seoul");
  const today = now.format("YYYY-MM-DD");
  const yesterday = now.subtract(1, "day").format("YYYY-MM-DD");
  const dayOfWeek = now.day(); // 0:일 ~ 6:토
  const hour = now.hour();
  const minute = now.minute();
  const time = hour * 60 + minute;

  const holidays = await getHolidayList(now.year());
  const isHolidayEve = holidays.includes(today) || holidays.includes(yesterday);

  let message = "";

  // 금/토/공휴일 전날 → 22:30 ~ 익일 06:30
  if ((dayOfWeek === 5 || dayOfWeek === 6 || isHolidayEve) && (time >= 1350 || time < 390)) {
    message = `현재는 영업 중입니다. 오늘은 06:30까지 운영합니다.\n\n${openingGuide}`;
  }
  // 목요일 (공휴일 전날 제외) → 22:30 ~ 익일 03:30
  else if (dayOfWeek === 4 && !isHolidayEve && (time >= 1350 || time < 210)) {
    message = `현재는 영업 중입니다. 오늘은 03:30까지 운영합니다.\n\n${openingGuide}`;
  } else {
    message = `현재는 영업시간이 아닙니다.\n\n${openingGuide}`;
  }

  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: message
          }
        }
      ]
    }
  });
});

module.exports = router;
