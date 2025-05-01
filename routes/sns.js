// routes/sns.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          basicCard: {
            title: "오닉스 공식 SNS",
            description: "오닉스의 최신 소식과 이벤트를 확인해보세요.",
            buttons: [
              {
                label: "Instagram",
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
