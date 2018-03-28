const db = require("@config/db");
let model = {};

model.Create = async (idTask, idUserWant)=>{
    let query = `
        INSERT INTO request SET 
        id_task = ${idTask},
        id_user_want = ${idUserWant};
    `;

    try {
        const requests = await pool.GetResults(query, array);
        return requests[0];
    }
    catch (e) {
        throw e;
    }
};

module.exports = model;