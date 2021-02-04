"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sqlite3_1 = __importDefault(require("sqlite3"));
var app = express_1.default();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var router = express_1.default.Router();
router.get('/api/genes', function (req, res) {
    var term = req.query.keyword;
    var db = new sqlite3_1.default.Database("human_genes.db");
    db.serialize(function () {
        var sql = "SELECT name FROM genes";
        if (term !== undefined && term !== null && term !== '') {
            sql = sql + " WHERE name like '%" + term + "%'";
        }
        db.all(sql, function (error, rows) {
            res.json(rows);
        });
    });
    db.close();
});
app.use(router);
app.listen(3000, function () {
    console.log('HOP API Servier is running on port 3000.');
});
