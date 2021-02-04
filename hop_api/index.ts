import express from 'express';
import sqlite from 'sqlite3';

const app: express.Express = express();

app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router: express.Router = express.Router();
router.get(
    '/api/genes',
    (req:express.Request, res:express.Response) => {
        var term = req.query.keyword;
        let db = new sqlite.Database("human_genes.db");
        db.serialize(
            function() {
                let sql = "SELECT name FROM genes";
                if(term !== undefined && term !== null && term !== '') {
                    sql = sql + " WHERE name like '%" + term + "%'";
                }
                db.all(
                    sql,
                    function(error, rows) {
                        res.json(rows);
                    }
                );
            }
        );
        db.close();
    }
);
app.use(router);

app.listen(
    3000,
    () => {
        console.log('HOP API Servier is running on port 3000.');
    }
);
