require('module-alias/register');
const express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    http = require('http');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const server = http.Server(app);
const port = process.env.PORT || 3001;
server.listen(port, function () {
    `Tasks service running on ${port}`;
});