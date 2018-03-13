module.exports.create = (sqlModule) => {
    const db = new sqlModule.Database(':memory:');
    const mTableName = "Items";

    let updateItem = (data, callback) => {
        if(!data.item_id) return insertItem(data, callback);
        
        let stmt = db.prepare(`UPDATE ${mTableName} SET item_name = ?, type_name = ? WHERE item_id = ?`);
        stmt.run([data.item_name, data.type_name, data.item_id],  (err, rows) => {
            if(err) throw new Error(err);
            if(callback)
                callback(rows);
        });
    }

    let deleteItem = (data, callback) => {
        let stmt = db.prepare(`DELETE FROM ${mTableName} WHERE item_id = ?`);
        stmt.run([data.item_id],  (err, rows) => {
            if(err) throw new Error(err);
            if(callback)
                callback(rows);
        });
    }

    let insertItem = (data, callback) => {
        let stmt = db.prepare(`INSERT INTO ${mTableName} (item_name, type_name) VALUES (?, ?)`);
        stmt.run([data.item_name, data.type_name], function(err, res) {
            if(err) throw new Error(err);
            
            data.item_id = this.lastID;
            if(callback) callback(data);
        });
    }

    let selectAllItems = (callback) => {
        db.all(`SELECT item_id, item_name, type_name FROM '${mTableName}'`, (err, rows) => {
            if(err) throw new Error(err);
            if(callback)
                callback(rows);
        });
    };

    db.serialize(() => {
        db.run(`CREATE TABLE ${mTableName} (item_id integer PRIMARY KEY, item_name text NOT NULL, type_name text NOT NULL)`, () => {
            insertItem({item_name: "Nokia", type_name: "Mobile"});
            insertItem({item_name: "Motorolla", type_name: "Mobile"});
            insertItem({item_name: "Simens", type_name: "Mobile"});
            insertItem({item_name: "Samsung", type_name: "Mobile"});
            insertItem({item_name: "iPhone", type_name: "Mobile"});
        });
    });

    return {
        insertItem: insertItem,
        selectAllItems: selectAllItems,
        updateItem: updateItem,
        deleteItem: deleteItem
    }
}