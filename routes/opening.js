// routes/opening.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour * 60 + minute;

  const isThuOrSun = day === 4 || day === 0;
  const isFriOrSatOrHolidayEve = day === 5 || day === 6;

  const utter = (req.body?.userRequest?.utterance || "").toLowerCase();

  let msg = "";

  // 정규표현식으로 입장 가능 여부 발화 인식
  const checkEnterRegex = /(입장.?가능|입장.?여부|지금.?입장|입장돼|입장 돼)/;

  if (checkEnterRegex.test(utter)) {
    // 입장 가능 여부 전용 응답
    if (isThuOrSun && (time >= 1230 || time < 270)) {
      msg = "지금 입장 가능합니다. 오늘은 04:30까지 운영합니다.";
    } else if (isFriOrSatOrHolidayEve && (time >= 1350 || time < 390)) {
      msg = "지금 입장 가능합니다. 오늘은 06:30까지 운영합니다.";
    } else {
      msg = "지금은 입장 가능한 시간이 아닙니다.";
    }
  } else {
    // 기본 영업시간 안내
    if (isThuOrSun && (time >= 1230 || time < 270)) {
      msg = `현재는 영업 중입니다. 오늘은 04:30까지 운영합니다.`;
    } else if (isFriOrSatOrHolidayEve && (time >= 1350 || time < 390)) {
      msg = `현재는 영업 중입니다. 오늘은 06:30까지 운영합니다.`;
    } else {
      msg = `지금은 오닉스의 영업시간이 아닙니다.\n\n📌 [영업일 안내]\n- 목요일·일요일: 20:30 ~ 익일 04:30\n- 금요일·토요일·공휴일 전날: 22:30 ~ 익일 06:30\n\n예시) 15일이 공휴일이면, 14일 저녁 10시 30분부터 오픈합니다.\n\n※ 영업일 및 영업시간은 내부 사정에 따라 변경될 수 있습니다.`;
    }
  }

  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: msg,
          },
        },
      ],
    },
  });
});

module.exports = router;
