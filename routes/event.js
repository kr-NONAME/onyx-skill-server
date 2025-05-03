const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          basicCard: {
            thumbnail: {
              imageUrl: "https://onyx-skill-server.onrender.com/static/event.png",
              altText: "오닉스 이벤트 안내"
            },
            title: "오닉스 이벤트 안내 🎉",
            description: "진행 중인 이벤트 및 최신 소식은 아래 채널에서 확인하실 수 있습니다.",
            buttons: [
              {
                label: "카카오채널 소식탭",
                action: "webLink",
                webLinkUrl: "http://pf.kakao.com/_CDxacxj",
              },
              {
                label: "공식 SNS",
                action: "webLink",
                webLinkUrl: "https://www.instagram.com/clubonyx_official/",
              },
            ],
          },
        },
      ],
    },
  });
});

module.exports = router;
