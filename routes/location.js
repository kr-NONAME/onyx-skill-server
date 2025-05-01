// routes/location.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const roadAddress = "전북특별자치도 전주시 완산구 여울로 19, 2층";
  const placeName = "오닉스";
  const latitude = "35.8126872";
  const longitude = "127.129557";

  const messageText = (
    req.body?.userRequest?.utterance ||
    req.body?.userRequest?.original?.utterance ||
    req.body?.userRequest?.message?.text ||
    ""
  ).toLowerCase();

  // 카카오 선택 시 → 카카오맵/내비/T 선택용 basicCard
  if (messageText === "카카오") {
    return res.json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "카카오 플랫폼 중 원하시는 서비스를 선택해주세요."
            }
          },
          {
            basicCard: {
              title: "카카오 플랫폼 선택",
              buttons: [
                {
                  label: "카카오맵",
                  action: "webLink",
                  webLinkUrl: `kakaomap://search?q=${placeName}`
                },
                {
                  label: "카카오내비",
                  action: "webLink",
                  webLinkUrl: `kakaonavi://navigate?destination=${latitude},${longitude}`
                },
                {
                  label: "카카오 T",
                  action: "webLink",
                  webLinkUrl: "https://t.kakao.com/taxi"
                }
              ]
            }
          }
        ]
      }
    });
  }

  // 기본 위치 안내
  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `오닉스 위치 안내입니다 🗺️\n\n${roadAddress} (${placeName})\n\n아래 버튼을 눌러 원하시는 지도로 바로 연결하실 수 있습니다.`
          }
        },
        {
          basicCard: {
            title: "위치 안내 바로가기",
            buttons: [
              {
                label: "네이버 지도",
                action: "webLink",
                webLinkUrl: `nmap://search?query=${roadAddress} ${placeName}`
              },
              {
                label: "카카오(맵, 내비, T)",
                action: "message",
                messageText: "카카오"
              },
              {
                label: "T맵",
                action: "webLink",
                webLinkUrl: `tmap://route?goalname=${placeName}&goalx=${longitude}&goaly=${latitude}`
              }
            ]
          }
        }
      ]
    }
  });
});

module.exports = router;