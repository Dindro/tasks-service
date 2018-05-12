let where = "";
for (const key in obj) {
	if (where === "") {
		where += "WHERE ";
	}
	else {
		where += " AND ";
	}
	where += `${key} = '${obj[key]}'`;
}
let query = `SELECT * FROM requests ${where}`;