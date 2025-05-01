// routes/place.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "오닉스 안내도입니다 🧭\n\n아래 이미지를 참고하여 안전하고 편리하게 이용해주세요.",
          },
        },
        {
          simpleImage: {
            imageUrl:
              "https://onyx-skill-server.onrender.com/static/onyx_place_info.png",
            altText: "오닉스 자리 및 비상구 안내",
          },
        },
      ],
    },
  });
});

module.exports = router;
