// routes/contact.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          basicCard: {
            title: "오닉스 전화 문의",
            description:
              "0507-1397-9717\n\n스마트 ARS로 연결됩니다. 통화 연결이 어려울 경우 카카오채널로 문의해 주세요.",
            buttons: [
              {
                label: "전화 걸기",
                action: "phone",
                phoneNumber: "050713979717",
              },
            ],
          },
        },
      ],
    },
  });
});

module.exports = router;
