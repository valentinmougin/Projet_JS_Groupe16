const express = require("express");
const userRouter = require("./routes/users");
const securityRouter = require("./routes/security");
const helloRouter = require("./routes/hello");
const checkRequestFormat = require("./middlewares/checkRequestFormat");
const errorHandler = require("./middlewares/errorHandler");

app.use("/admin", (req, res, next) => {
        if(!req.headers["content-type"]?.startsWith("application/json")) {
            res.sendStatus(400);
            return;
        }
    next();
});

app.use("/visitor", (req, res, next) => {
    if(req.method === "POST" || req.method === "PUT" || req.method === "GET" || req.method === "DELETE") {
        if(!req.headers["content-type"]?.startsWith("application/json")) {
            res.sendStatus(400);
            return;
        }
    }
    next();
});

app.use("/seller/:id", (req, res, next) => {
    if(req.method === "POST" || req.method === "PUT" || req.method === "GET" || req.method === "DELETE") {
        if(!req.headers["content-type"]?.startsWith("application/json")) {
            res.sendStatus(400);
            return;
        }
    }
    next();
});
