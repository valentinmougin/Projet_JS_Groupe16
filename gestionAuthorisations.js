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
