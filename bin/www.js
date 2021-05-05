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
        const io = require("../config/socketIO").init(server);
        // io.on("connection",socket=>{
        //     console.log(socket.handshake.headers);
        //     socket.on('connect',()=>{
        //         console.log('client connected')
        //     })
        //     socket.on('disconnect', () => {
        //         console.log('client disconnected')
        //     });
        // })
    }) 
    .catch((error) => {
        new Error(error)
    });

