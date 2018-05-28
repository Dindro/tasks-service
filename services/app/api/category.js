const Category = require("../models/category");

let api = {};

api.getCategories = async (req, res) => {
  try {
    const parents = await Category.getParent();
    let parentsPromises = parents.map(async (parent) => {
      const childrens = await Category.getChildren({ parentId: parent.id });
      parent.childrens = childrens;
    });

    for (const item of parentsPromises) {
      await item;
    }

    // нормализация категорий в список
    let categories = [];
    for (const parent of parents) {
      categories.push(parent);
      for (const children of parent.childrens) {
        categories.push(children);
      }
    }

    res.status(200).json({ categories });
  } catch (e) {
    console.log("getCategories", e);
  }
};

module.exports = api;