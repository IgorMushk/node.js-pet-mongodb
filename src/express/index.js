const express = require("express");
const assignRequestId = require("./middlewares/assignRequestId");
const getLogger = require("./middlewares/logger");
const handleError = require("./middlewares/handleerror");

routers = require("./routes");

const app = express();
app.use(express.json());

app.use(assignRequestId);

app.use(getLogger());

//app.use('/animals',  router);
app.use(routers);

app.get("/health", (req, res) => {
  res.setHeader("x-request-id", req.id);
  res.json({ status: 200, message: "Server is running" });
});

app.use(handleError);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
