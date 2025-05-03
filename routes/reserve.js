const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const responseText = `오닉스 예약 안내 📝

✅ 예약 방법
- 아래 버튼을 눌러 직원과 1:1 채팅을 통해 예약해주세요

※ 예약 확정은 운영진의 확인 메시지로 최종 완료되며, 선착순으로 마감될 수 있습니다.`;

  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: responseText
          }
        },
        {
          basicCard: {
            thumbnail: {
              imageUrl: "https://onyx-skill-server.onrender.com/static/reserve.png",
              altText: "오닉스 예약 안내"
            },
            title: "직원과 1:1 채팅하기",
            buttons: [
              {
                label: "오픈채팅 바로가기",
                action: "webLink",
                webLinkUrl: "https://open.kakao.com/o/s8asFRth"
              }
            ]
          }
        }
      ]
    }
  });
});

module.exports = router;
