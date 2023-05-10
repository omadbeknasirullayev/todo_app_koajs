const Koa = require("koa");
const app = new Koa();
const config = require("config");
const router = require("./routes/index.routes");
const sequelize = require("./config/database");
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const PORT = config.get("port") || 3090;

app.use(cors())
app.use(bodyParser())
app.use(router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
};

start();