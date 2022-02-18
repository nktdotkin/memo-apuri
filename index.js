const http = require("http");
const app = require("./app/app");
const server = http.createServer(app);
const port = process.env.API_PORT || 80;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
