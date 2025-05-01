// routes/location.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const roadAddress = "전북특별자치도 전주시 완산구 여울로 19, 2층 (서신동 968-6)";
  const placeName = "전주 클럽 오닉스";

  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `오닉스 위치 안내입니다 🗺️\n\n${roadAddress}\n\n아래 버튼을 눌러 원하시는 지도 앱으로 바로 연결하실 수 있습니다.`
          }
        },
        {
          basicCard: {
            title: "위치 안내 바로가기",
            buttons: [
              {
                label: "네이버 지도",
                action: "webLink",
                webLinkUrl: `nmap://search?query=${placeName}`
              },
              {
                label: "카카오맵",
                action: "webLink",
                webLinkUrl: `kakaomap://search?q=${placeName}`
              },
              {
                label: "T맵",
                action: "webLink",
                webLinkUrl: `tmap://search?name=${placeName}`
              }
            ]
          }
        }
      ]
    }
  });
});

module.exports = router;