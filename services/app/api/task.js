const ModelTask = require("@models/task");
const ModelCoordinate = require("@models/coordinate");

let api = {};

api.Post = async (req, res) => {
    // Проверка на авторизацию

    const idUserCustomer = 1;
    const idCategory = 1;
    const { title, description, priceFrom, priceBefore } = req.body;

    // Проверка цены от и до
    if (priceFrom > priceBefore) {
        const timePrice = priceFrom;
        priceFrom = priceBefore;
        priceBefore = timePrice;
    }

    const idTask = await ModelTask.Create(idUserCustomer, { priceFrom, priceBefore, title, description });

    // Добавить координаты в БД
    let coordinatesPromise = coordinates.map(async (coordinate) => {
        const idCoordinate = await ModelCoordinate.Create(coordinate);
        const idCoordinateTask = await ModelTask.AddCoordinate(idCoordinate, idTask);
    });

    // Добавить картинки
}

module.exports = api;