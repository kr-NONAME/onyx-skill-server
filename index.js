const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// static 폴더 경로 설정 (이미지 제공용)
app.use("/static", express.static("static"));

// 스킬 라우터 연결
const welcomeRouter = require("./routes/welcome");
const openingRoute = require("./routes/opening");
const locationRoute = require("./routes/location");
const priceRoute = require("./routes/price");
const policyRoute = require("./routes/policy");
const reserveRoute = require("./routes/reserve");
const placeRoute = require("./routes/place");
const snsRoute = require("./routes/sns");
const eventRoute = require("./routes/event");
const contactRoute = require("./routes/contact");

app.use("/skill/welcome", welcomeRouter);
app.use("/skill/opening", openingRoute);
app.use("/skill/location", locationRoute);
app.use("/skill/price", priceRoute);
app.use("/skill/policy", policyRoute);
app.use("/skill/reserve", reserveRoute);
app.use("/skill/place", placeRoute);
app.use("/skill/sns", snsRoute);
app.use("/skill/event", eventRoute);
app.use("/skill/contact", contactRoute);

app.listen(port, () => {
  console.log(`ONYX Chatbot server running on port ${port}`);
});
