const app = require("../app");
require("debug")('workmanbackend:serve')
const http = require("http");
const DB = require("../config/database")

const port = process.env.PORT

const server = http.createServer(app);

new DB().connectToDB()
    .then(() => {
        server.listen(port, () => {
            console.log(`listening on http://localhost:${port}`);
        });
    }) 
    .catch((e) => {
        console.log(`caught error: ${e} when connecting to mongodb sever`);
    });
