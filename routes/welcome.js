// routes/welcome.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "안녕하세요, 오닉스입니다 🎉\n\n아래 내용을 안내해 드릴 수 있습니다.\n\n- 입장료\n- 입장 제한사항\n- 자리 및 비상구 안내\n- DJ 및 이벤트 안내\n- 전화번호 문의\n\n궁금하신 내용을 선택하거나 말씀해 주세요!",
          },
        },
      ],
      quickReplies: [
        {
          label: "입장료",
          action: "message",
          messageText: "입장료",
        },
        {
          label: "제한사항",
          action: "message",
          messageText: "제한사항",
        },
        {
          label: "안내도",
          action: "message",
          messageText: "안내도",
        },
        {
          label: "이벤트",
          action: "message",
          messageText: "이벤트",
        },
        {
          label: "전화번호",
          action: "message",
          messageText: "전화번호",
        },
      ],
    },
  });
});

module.exports = router;
