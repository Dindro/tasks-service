var db = require("./db");

module.exports = {
    Check: async function (req, res) {
        if (req.session.user) {
            var query = "SELECT * FROM users WHERE id = ?;"
            var array = [req.session.user];
            var user = await db.GetResults(query, array);

            if (user.lenght != 0) {
                return (user[0].id);
            }
            else {
                req.session.destroy();
                throw new Error("Нет такого");
            }
        }
        else throw new Error("Нет сессии");
    }
}