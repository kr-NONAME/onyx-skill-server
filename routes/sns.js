// routes/sns.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const responseText = `오닉스 공식 SNS 📲\n\n최신 소식과 이벤트를 SNS에서 확인해보세요!`;

  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: { text: responseText },
        },
      ],
      quickReplies: [
        {
          label: "Instagram",
          action: "webLink",
          webLinkUrl: "https://www.instagram.com/clubonyx_official/",
        },
      ],
    },
  });
});

module.exports = router;
