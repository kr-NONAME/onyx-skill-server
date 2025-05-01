// routes/contact.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const responseText = `오닉스 문의 안내 ☎️\n\n0507-1397-9717 (스마트 ARS 연결)\n- 통화 연결은 다소 어려울 수 있습니다.\n- 부재중인 경우, 공식 카카오채널로 문의를 남겨주세요.`;

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
          label: "전화하기",
          action: "webLink",
          webLinkUrl: "tel:050713979717",
        },
        {
          label: "카카오채널 문의하기",
          action: "webLink",
          webLinkUrl: "http://pf.kakao.com/_CDxacxj",
        },
      ],
    },
  });
});

module.exports = router;
