const app = require("../app");
const http = require("http");
const DB = require("../config/database")
const Helpers = require("../utilities/helpers");

const port = process.env.PORT

const server = http.createServer(app);

new DB().connectToDB()
    .then(() => {
        server.listen(port, () => {
            Helpers.logger.debug(`listening on http://localhost:${port}`)
        });
    })
    .catch((error) => {
        throw new Error(error)
    });

