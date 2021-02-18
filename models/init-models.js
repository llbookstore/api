const DataTypes = require("sequelize").DataTypes;
const _account = require("./account");
const _advisory = require("./advisory");
const _author = require("./author");
const _bill = require("./bill");
const _bill_detail = require("./bill_detail");
const _book = require("./book");
const _category_detail = require("./category_detail");
const _category = require("./category");
const _comment = require("./comment");
const _favourite = require("./favourite");
const _news = require("./news");
const _sale = require("./sale");

function initModels(sequelize) {
  const account = _account(sequelize, DataTypes);
  const advisory = _advisory(sequelize, DataTypes);
  const author = _author(sequelize, DataTypes);
  const bill = _bill(sequelize, DataTypes);
  const bill_detail = _bill_detail(sequelize, DataTypes);
  const book = _book(sequelize, DataTypes);
  const category_detail = _category_detail(sequelize, DataTypes);
  const category = _category(sequelize, DataTypes);
  const comment = _comment(sequelize, DataTypes);
  const favourite = _favourite(sequelize, DataTypes);
  const news = _news(sequelize, DataTypes);
  const sale = _sale(sequelize, DataTypes);

  bill.belongsToMany(book, { through: bill_detail, foreignKey: "bill_id", otherKey: "book_id" });
  book.belongsToMany(bill, { through: bill_detail, foreignKey: "book_id", otherKey: "bill_id" });
  category.belongsToMany(book, { through: category_detail, foreignKey: "category_id", otherKey: "book_id" });
  book.belongsToMany(category, { through: category_detail, foreignKey: "book_id", otherKey: "category_id" });
  account.belongsToMany(book, { through: favourite, foreignKey: "acc_id", otherKey: "book_id" });
  book.belongsToMany(account, { through: favourite, foreignKey: "book_id", otherKey: "acc_id" });
  bill.belongsTo(account, { as: "admin", foreignKey: "admin_id"});
  account.hasMany(bill, { as: "bills", foreignKey: "admin_id"});
  bill_detail.belongsTo(bill, { as: "bill", foreignKey: "bill_id"});
  bill.hasMany(bill_detail, { as: "bill_details", foreignKey: "bill_id"});
  bill_detail.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(bill_detail, { as: "bill_details", foreignKey: "book_id"});
  book.belongsTo(author, { as: "author", foreignKey: "author_id"});
  author.hasMany(book, { as: "books", foreignKey: "author_id"});
  book.belongsTo(sale, { as: "sale", foreignKey: "sale_id"});
  sale.hasMany(book, { as: "books", foreignKey: "sale_id"});
  category_detail.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(category_detail, { as: "category_details", foreignKey: "category_id"});
  category_detail.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(category_detail, { as: "category_details", foreignKey: "book_id"});
  comment.belongsTo(account, { as: "acc", foreignKey: "acc_id"});
  account.hasMany(comment, { as: "comments", foreignKey: "acc_id"});
  comment.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(comment, { as: "comments", foreignKey: "book_id"});
  favourite.belongsTo(account, { as: "acc", foreignKey: "acc_id"});
  account.hasMany(favourite, { as: "favourites", foreignKey: "acc_id"});
  favourite.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(favourite, { as: "favourites", foreignKey: "book_id"});

  return {
    account,
    advisory,
    author,
    bill,
    bill_detail,
    book,
    category_detail,
    category,
    comment,
    favourite,
    news,
    sale,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
