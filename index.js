// app.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.post("/skill/opening", (req, res) => {
  const now = new Date();
  const day = now.getDay(); // 0:일, 1:월 ... 6:토
  const hour = now.getHours();
  const minute = now.getMinutes();

  const time = hour * 60 + minute;

  // 요일 및 시간 조건
  const isThuOrSun = day === 4 || day === 0;
  const isFriOrSatOrHolidayEve = day === 5 || day === 6;

  let isOpen = false;
  let msg = "";

  if (isThuOrSun && (time >= 1230 || time < 270)) {
    msg = `현재는 영업 중입니다. 오늘은 04:30까지 운영합니다.`;
  } else if (isFriOrSatOrHolidayEve && (time >= 1350 || time < 390)) {
    msg = `현재는 영업 중입니다. 오늘은 06:30까지 운영합니다.`;
  } else {
    msg = `지금은 오닉스의 영업시간이 아닙니다.

📌 [영업일 안내]
- 목요일·일요일: 20:30 ~ 익일 04:30
- 금요일·토요일·공휴일 전날: 22:30 ~ 익일 06:30

예시) 15일이 공휴일이면, 14일 저녁 10시 30분부터 오픈합니다.

※ 영업일 및 영업시간은 내부 사정에 따라 변경될 수 있습니다.`;
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

app.listen(port, () => {
  console.log(`ONYX Chatbot server running on port ${port}`);
});
