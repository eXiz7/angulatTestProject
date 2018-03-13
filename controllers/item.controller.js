module.exports.get = (router, dbService) => {
    let fs = require('fs');
    let url = require('url');

    router.get('/api/items', (req, res) => {
        dbService.selectAllItems((data) => {
            res.status(200);
            res.json(data);
        })
    });

    router.post('/api/items', (req, res) => {
        dbService.updateItem(req.body, (data) => {
            res.status(200);
            res.json(data);
        })
    });

    router.delete('/api/items', (req, res) => {
        dbService.deleteItem(req.query, (data) => {
            res.status(200);
            res.json({response: "Done!"});
        });
    });

    router.get('*', (req, res) => {
        let path = '/client/index.html';
        fs.readFile(__basedir + path, (err, data) => {
            if(err) {
                res.writeHead(404);
                res.write("Not found!");
                res.end();
            } else {
                res.writeHead(200, {"Content-Type" : "text/html"});
                res.write(data, "utf8");
                res.end();
            }
        });
    });

    return router;
}