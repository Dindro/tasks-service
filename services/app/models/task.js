const db = require('../../config/db');
const Category = require('./category');

let model = {};

model.create = async (task) => {
  const query = `
    INSERT INTO tasks SET 
    userCustomerId = ${task.userId},
    categoryId = ${task.categoryId},
    name = '${task.name}',
    description = '${task.description}',
    priceFrom = ${task.priceFrom},
    priceBefore = ${task.priceBefore},
    ${task.dateStart !== "" ? `doFrom = '${task.dateStart}',` : ''}
    ${task.dateEnd !== "" ? `doBefore = '${task.dateEnd}',` : ''}
    phone = '${task.phoneNumber}',
    isComment = ${task.isComment}
  ;`;
  try {
    const result = await db.getResult(query);
    return result.insertId;
  } catch (e) {
    throw e;
  }
};

model.getByUserId = async ({ userId, count }) => {
  let param = '';

  // если количество указано
  if (count !== undefined) {
    param = `LIMIT ${count}`;
  }

  const query = `
    SELECT * FROM tasks 
    WHERE userCustomerId = ${userId} 
    ORDER BY created 
    DESC ${param}
  ;`;

  try {
    const tasks = await db.getResult(query);
    return tasks;
  } catch (e) {
    throw e;
  }
};

model.getById = async ({ taskId }) => {
  const query = `SELECT * FROM tasks WHERE id = ${taskId};`;
  try {
    const result = await db.getResult(query);
    let task = result[0];

    if (task) {
      // получаем координаты
      task.locations = await model.getLocations({ taskId: task.id });

      // TODO: получить картинки
    }
    return task;
  } catch (e) {
    throw e;
  }
};

// получить задачи по заданным параметрам
model.getTasks = async ({
  lastTaskId,
  count,
  userId,
  search,
  filterCategoryId,
  filterStatusId,
  filterPriceFrom,
  filterPriceBefore
}) => {
  let where = `WHERE `;
  let include = false;

  if (search) {
    const words = search.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (i === 0) {
        where += `name LIKE '%${words[i]}%' `;
      } else {
        where += `AND name LIKE '%${words[i]}%' `;
      }
      include = true;
    }
  }

  if (userId) {
    if (include) {
      where += 'AND ';
    }
    where += `userCustomerId = ${userId} `;
    include = true;
  }

  if (lastTaskId) {
    if (include) {
      where += 'AND ';
    }
    where += `id < ${lastTaskId} `;
    include = true;
  }

  if (filterCategoryId) {
    if (include) {
      where += 'AND ';
    }
    where += `categoryId = ${filterCategoryId} `;
    include = true;
  }

  if (filterPriceFrom) {
    if (include) {
      where += 'AND ';
    }
    where += `priceFrom > ${filterPriceFrom} `;
    include = true;
  }

  if (filterPriceBefore) {
    if (include) {
      where += 'AND ';
    }
    where += `priceBefore < ${filterPriceBefore} `;
    include = true;
  }

  if (filterStatusId) {
    if (1 <= include && include <= 3) {
      where += 'AND ';
    }

    switch (filterStatusId) {
      case 1:
        where += `started IS NULL AND finished IS NULL `;
        include = true;
        break;
      case 2:
        where += `started IS NOT NULL AND finished IS NULL `;
        include = true;
        break;
      case 3:
        where += `finished IS NOT NULL `;
        include = true;
        break;
      default:
        break;
    }
  }

  const query = `
    SELECT * FROM tasks  
    ${include ? where : ''} 
    ORDER BY id DESC LIMIT ${count}
  ;`;
  try {
    const results = await db.getResult(query);
    return results;
  } catch (e) {
    throw e;
  }
}

model.makePerformer = async ({ userPerformerId, taskId }) => {
  const query = `
    UPDATE tasks SET 
    userPerformerId = ${userPerformerId},
    started = now()
    WHERE 
    id = ${taskId}
  ;`;

  try {
    const result = await db.getResult(query);
    return result[0];
  }
  catch (e) {
    throw e;
  }
};

// Добавить координаты в таблицу tasks_locations
model.addLocations = async ({ locationId, taskId }) => {
  const query = `
    INSERT INTO tasks_locations SET 
    locationId = ${locationId},
    taskId = ${taskId}
  ;`;

  try {
    const result = await db.getResult(query);
    return result.insertId;
  } catch (e) {
    throw e;
  }
};

model.getLocations = async ({ taskId }) => {
  const query = `
    SELECT l.* FROM 
    tasks_locations as t_l 
    INNER JOIN 
    locations as l 
    ON t_l.locationId = l.id
    WHERE 
    t_l.taskId = ${taskId} 
    ORDER BY l.priority ASC;
  ;`;

  try {
    const results = await db.getResult(query);
    return results;
  } catch (e) {
    throw e;
  }
}

model.getCountByUserId = async ({ userId, type }) => {
  let query = '';
  if (!type || type === '') {
    type = 'create';
  }

  switch (type) {
    case 'create':
      query = `
        SELECT COUNT(*) AS count 
        FROM tasks 
        WHERE 
        userCustomerId = ${userId}
      ;`;
      break;
    case 'success':
      query = `
        SELECT COUNT(*) AS count 
        FROM tasks 
        WHERE 
        userPerformerId = ${userId} AND 
        finished IS NOT NULL 
      ;`;
      break;
  }

  try {
    const result = await db.getResult(query);
    return result[0].count;
  } catch (e) {
    throw e;
  }
};

// завершение задачи
model.finish = async ({ taskId }) => {
  const query = `
    UPDATE tasks SET 
    finished = now()
    WHERE 
    id = ${taskId}
  ;`;

  try {
    const result = await db.getResult(query);
    return result[0];
  }
  catch (e) {
    throw e;
  }
};


module.exports = model;