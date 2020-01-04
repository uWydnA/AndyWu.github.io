const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
http.createServer((req, res) => {
    if (req.url != "/favicon.ico") {
        let pathname = url.parse(req.url).pathname;
        if (pathname == "/api") {
            ajaxHandle(req, res);
        } else {
            fsHandle(req, res);
        }
    }
}).listen("8888", "127.0.0.2", () => {
    console.log("run server at http://127.0.0.2:8888");
})

function ajaxHandle(req, res) {
    let str = "";
    req.on("data", (d) => {
        noder
        str += d;
    })
    req.on("end", () => {
        let data = str ? querystring(str) : url.parse(req.url, true).query;
        if (data.retr0) {
            var path = "./server/" + data.json;
            fs.readFile(path, (err, data) => {
                if (err === null) {
                    res.write(data);
                } else {
                    res.write("404");
                }
                res.end();
                return;
            })
        } else {
            res.write(JSON.parse(data));
            res.end();
        }
    })
}

function fsHandle(req, res) {
    let t = url.parse(req.url).pathname;
    if (t == "/") {
        t = "/index.html"
    }
    var path = "./server" + t;
    fs.readFile(path, (err, data) => {
        if (err === null) {
            res.write(data);
        } else {
            res.write("404");
        }
        res.end();
    })
}