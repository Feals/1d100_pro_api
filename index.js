const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const rpgRoutes = require("./routes/rpgRoutes");
const rpgTableRoutes = require("./routes/rpgTableRoutes");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/rpgs", rpgRoutes);
app.use("/rpgTables", rpgTableRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
