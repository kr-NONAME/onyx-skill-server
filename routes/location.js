// routes/location.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const address =
    "전북특별자치도 전주시 완산구 여울로 19, 2층 (서신동 968-6, 2층)";

  const messageText = (
    req.body?.userRequest?.utterance ||
    req.body?.userRequest?.original?.utterance ||
    req.body?.userRequest?.message?.text ||
    ""
  ).toLowerCase();

  // 카카오 선택시 → basicCard로 플랫폼 선택
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
          {
            basicCard: {
              title: "카카오 플랫폼 선택",
              buttons: [
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
          },
        ],
      },
    });
  }

  // 기본 위치 안내
  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `오닉스 위치 안내입니다 🗺️\n\n${address}\n\n원하시는 위치 안내 플랫폼을 선택해주세요.`,
          },
        },
        {
          basicCard: {
            title: "위치 안내 바로가기",
            buttons: [
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
        },
      ],
    },
  });
});

module.exports = router;
