const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 스킬 모듈 불러오기
const openingRoute = require("./routes/opening");
const locationRoute = require("./routes/location");
const priceRoute = require("./routes/price");

// 스킬 URL 연결
app.use("/skill/opening", openingRoute);
app.use("/skill/location", locationRoute);
app.use("/skill/price", priceRoute);

app.listen(port, () => {
  console.log(`ONYX Chatbot server running on port ${port}`);
});
