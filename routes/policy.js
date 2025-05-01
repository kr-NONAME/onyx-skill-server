// routes/policy.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const responseText = `오닉스 입장 제한 및 유의사항 안내 🚫

✅ 입장 조건
- 신분증 지참 필수 (본인확인 후 입장 가능)
- 밴딩 손상 또는 미착용 시 입장 불가

🚫 입장 제한 복장 예시
- 슬리퍼, 운동복 등 안전사고에 쉽게 노출되거나
  다른 이용객에게 불쾌감을 줄 수 있는 복장 착용 시

❗ 아래 항목에 해당할 경우 **영구 입장 제한**됩니다
- 직원의 통제에 따르지 않는 경우
- 다툼이 발생한 경우
- 흉기 및 불법 무기 소지 시
- 외부 음식, 주류, 마약류 반입 시

📌 유효한 신분증 기준
- 주민등록번호 13자리, 성명, 사진이 모두 명확하게 기재되어야 하며
  공공기관 기관장이 발행한 신분증에 한해 인정됩니다

※ 내부 방침에 따라 제한 내용은 사전 고지 없이 변경될 수 있습니다.`;

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
