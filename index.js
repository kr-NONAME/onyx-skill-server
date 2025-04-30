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
    isOpen = true;
    msg = "현재는 영업 중입니다. 오늘은 04:30까지 운영합니다.";
  } else if (isFriOrSatOrHolidayEve && (time >= 1350 || time < 390)) {
    isOpen = true;
    msg = "현재는 영업 중입니다. 오늘은 06:30까지 운영합니다.";
  } else {
    isOpen = false;
    msg =
      "현재는 영업시간이 아닙니다. 오닉스는 목~일요일, 공휴일 전날에만 운영됩니다.";
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
