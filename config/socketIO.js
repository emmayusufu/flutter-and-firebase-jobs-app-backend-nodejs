let io;

module.exports = {
    init: (httpServer) => {
        io = require("socket.io")(httpServer, {
            handlePreflightRequest: (req, res) => {
                res.writeHead(200, {
                    //   "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "GET,POST",
                    "Access-Control-Allow-Headers": "user",
                    "Access-Control-Allow-Credentials": true,
                });
                res.end();
            },
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("io not initialized");
        }
        return io;
    },
};
