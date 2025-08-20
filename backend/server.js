const express = require("express");
const bodyParser = require("body-parser");
const logger = require("../logging-middleware/logger");
const routes = require("./routes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(logger);

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
