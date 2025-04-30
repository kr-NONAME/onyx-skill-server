// routes/price.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const responseText = `오닉스 입장료 안내입니다 🎟️

✅ 스탠딩 입장료: 1인 10,000원
- 입장 시 프리 드링크 쿠폰 1매 제공

🎉 목요일 · 일요일은 프로모션 기간으로 무료입장 진행!

🥤 프리 드링크 쿠폰 교환 가능 품목:
- 데킬라, 맥주, 오렌지주스, 에너지 드링크, 생수

※ 쿠폰 교환 가능 품목은 변동될 수 있습니다`;

  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: { text: responseText },
        },
      ],
    },
  });
});

module.exports = router;
