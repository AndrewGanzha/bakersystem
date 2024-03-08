"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
let transports = [
    { id: 0, name: "Фрунзенская" },
    { id: 1, name: "Костомароваская" },
];
const parserMiddleware = (0, body_parser_1.default)();
exports.app.use(parserMiddleware);
exports.app.get("/transports", (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(transports.filter((transport) => transport.name.indexOf(searchString) > -1));
    }
    res.send(transports);
});
exports.app.post("/transports", (req, res) => {
    if (!req.body.name) {
        res.send(400);
        return;
    }
    const newTransport = { id: +new Date(), name: req.body.name.toString() };
    transports.push(newTransport);
    res.status(201).send(newTransport);
});
exports.app.get("/transports/:id", (req, res) => {
    let transport = transports.find((item) => item.id === +req.params.id);
    if (transport) {
        res.send(transport);
    }
    else {
        res.send(404);
    }
    res.send(transport);
});
exports.app.put("/transports/:id", (req, res) => {
    let transport = transports.find((item) => item.id === +req.params.id);
    if (transport) {
        transport.name = req.body.title;
        res.send(transport);
    }
    else {
        res.send(404);
    }
    res.send(transport);
});
exports.app.delete("/transports/:id", (req, res) => {
    for (let i = 0; i < transports.length; i++) {
        if (transports[i].id == +req.params.id) {
            transports.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
exports.app.delete("/__test__/data", (req, res) => {
    transports = [];
    res.sendStatus(204);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
