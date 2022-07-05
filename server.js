var http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app= require('./app')

/* var httpsOptions = {  
   key: fs.readFileSync('../ssl/key.pem'),
   cert: fs.readFileSync('../ssl/cert.pem')
}; */

const server = http.createServer(app)
server.listen(port,()=>{console.log(`Listening on port ${port}..`)})
module.exports = server;