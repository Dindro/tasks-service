module.exports = {
	db: {
		host: "localhost",
		user: "root",
		password: "root",
		database: "tasks-service",
		port: 3306,
	},
	jwt: {
		secret: "dinroJwtToken",

		// истекает через 24 часа
		expires: 86400
	}
}