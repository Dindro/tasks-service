var db = require("@config/db");

module.exports = {
    GetIdByName: async function (name) {
        var query = "SELECT id FROM rights WHERE name = ?";
        var array = [name];
        try {
            var result = await db.GetResults(query, array);
            if(result[0].id)
                return result[0].id;
            else 
                throw new Error("Нет такого права доступа");
        } catch (e) {
            throw e;
        }
    }
};