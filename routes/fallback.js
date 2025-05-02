// routes/fallback.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          basicCard: {
            title: "죄송합니다. 이해하지 못했습니다.",
            description: "아래에서 원하시는 안내를 선택해주세요.",
            buttons: [
              {
                label: "영업시간",
                action: "message",
                messageText: "영업시간",
              },
              {
                label: "위치안내",
                action: "message",
                messageText: "위치안내",
              },
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
                label: "예약문의",
                action: "message",
                messageText: "예약문의",
              },
              {
                label: "안내도",
                action: "message",
                messageText: "안내도",
              },
              {
                label: "SNS",
                action: "message",
                messageText: "SNS",
              },
              {
                label: "EVENT",
                action: "message",
                messageText: "EVENT",
              },
              {
                label: "전화번호",
                action: "message",
                messageText: "전화번호",
              },
            ]
          }
        }
      ]
    }
  });
});

module.exports = router;
