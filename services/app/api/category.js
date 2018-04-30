const Category = require("../models/category");

let api = {};

api.getCategories = async (req, res) => {
  try {
    const parents = await Category.getParent();
    let parentsPromises = parents.map(async (parent) => {
      const children = await Category.getChildren(parent.id);
      parent.children = children;
    });

    for (const item of parentsPromises) {
      await item;
    }

    res.status(200).json({ categories: parents });
  } catch (e) {
    console.log("getCategories", e);
  }
};

module.exports = api;