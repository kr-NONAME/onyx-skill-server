// onyx-skill-server/index.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// 공통 응답 함수
function createResponse(text) {
  return {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: { text },
        },
      ],
    },
  };
}

// [1] 영업시간 스킬
app.post("/skill/opening", (req, res) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour * 60 + minute;
  const isThuOrSun = day === 4 || day === 0;
  const isFriOrSatOrHolidayEve = day === 5 || day === 6;

  let msg = "";
  if (isThuOrSun && (time >= 1230 || time < 270)) {
    msg = `현재는 영업 중입니다. 오늘은 04:30까지 운영합니다.`;
  } else if (isFriOrSatOrHolidayEve && (time >= 1350 || time < 390)) {
    msg = `현재는 영업 중입니다. 오늘은 06:30까지 운영합니다.`;
  } else {
    msg = `지금은 오닉스의 영업시간이 아닙니다.\n\n📌 [영업일 안내]\n- 목요일·일요일: 20:30 ~ 익일 04:30\n- 금요일·토요일·공휴일 전날: 22:30 ~ 익일 06:30\n\n예시) 15일이 공휴일이면, 14일 저녁 10시 30분부터 오픈합니다.\n\n※ 영업일 및 영업시간은 내부 사정에 따라 변경될 수 있습니다.`;
  }

  res.json(createResponse(msg));
});

// [2] 위치안내 스킬 (버튼 클릭 기반 조건 분기)
app.post("/skill/location", (req, res) => {
  const messageText = (
    req.body?.userRequest?.utterance ||
    req.body?.userRequest?.original?.utterance ||
    req.body?.userRequest?.message?.text ||
    ""
  ).toLowerCase();

  if (messageText === "카카오") {
    return res.json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "카카오 플랫폼 중 원하시는 서비스를 선택해주세요.",
            },
          },
        ],
        quickReplies: [
          {
            label: "카카오맵",
            action: "webLink",
            webLinkUrl:
              "https://map.kakao.com/link/map/오닉스,35.8126872,127.129557",
          },
          {
            label: "카카오내비",
            action: "webLink",
            webLinkUrl:
              "https://map.kakao.com/link/navi/오닉스,35.8126872,127.129557",
          },
          {
            label: "카카오 T",
            action: "webLink",
            webLinkUrl: "https://t.kakao.com/taxi",
          },
        ],
      },
    });
  }

  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "원하시는 위치 안내 플랫폼을 선택해주세요.",
          },
        },
      ],
      quickReplies: [
        {
          label: "네이버 지도",
          action: "webLink",
          webLinkUrl:
            "https://map.naver.com/v5/search/오닉스 전북 전주시 완산구 여울로 19",
        },
        {
          label: "카카오(맵, 내비, T)",
          action: "message",
          messageText: "카카오",
        },
        {
          label: "T맵",
          action: "webLink",
          webLinkUrl:
            "tmap://route?goalname=오닉스&goalx=127.129557&goaly=35.8126872",
        },
      ],
    },
  });
});

app.listen(port, () => {
  console.log(`ONYX Chatbot server running on port ${port}`);
});
const priceRoute = require("./routes/price"); // 파일 불러오기
app.use("/skill/price", priceRoute); // URL 연결
