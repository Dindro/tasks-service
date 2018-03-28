const db = require("@config/db");
let model = {};

model.Create = async (id_task) => {
    let query = `
        SELECT * FROM table_name WHERE id = ${id_task};
    `;

    try {
        const result = await pool.GetResults(query, array);
        return result[0];
    }
    catch (e) {
        throw e;
    }
};

module.exports = model;