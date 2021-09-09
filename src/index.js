const mongoose = require("mongoose");
const app = require("./app");

const config = require("../config/config");
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log("Connected Mongoose");
    app.listen(config.port, () => {
      console.log(`Server listening on ${config.port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
