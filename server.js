const http = require("http");
const url = require("url");
const fs = require("fs");

var server = http.createServer(gestisciRichiesta);
server.listen(1337);
console.log("Il server è stato avviato sulla porta 1337");

function gestisciRichiesta(richiesta, risposta){
    let info = url.parse(richiesta.headers.host + richiesta.url,true);
    var header;
    var file;
    switch(info.pathname){
        case "/":
            file = fs.readFileSync("public/index.html");
            header = {
                "Access-Control-Allow-Orgin":"*",
                "Content-Type":"text/html"
            };
            risposta.writeHead(200, header);
            risposta.write(file);
            risposta.end();
            break;

        case "/script.js":
            file = fs.readFileSync("public/JS/script.js");
            header = {
                "Access-Control-Allow-Orgin":"*",
                "Content-Type":"text/javascript"
            };                
            risposta.writeHead(200, header);
            risposta.write(file);
            risposta.end();
                break;

        case "/saluto":
            header = {
                "Content-Type":"text/plain"
            };
            risposta.writeHead(200, header);
            risposta.write("salve Mondo");
            risposta.end();
            break;
    }
}