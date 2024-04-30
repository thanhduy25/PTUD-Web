const app = require("./app");
const config = require("./app/config");
const DB = require("./app/config/DB")

app.listen(config.app.port, () => {
    console.log(`Server is running on port ${config.app.port}`);
})
DB.connect();