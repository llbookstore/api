var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _advisory = require("./advisory");
var _author = require("./author");
var _bill = require("./bill");
var _bill_detail = require("./bill_detail");
var _book = require("./book");
var _category = require("./category");
var _category_detail = require("./category_detail");
var _comment = require("./comment");
var _favourite = require("./favourite");
var _news = require("./news");
var _publishing_house = require("./publishing_house");
var _sale = require("./sale");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var advisory = _advisory(sequelize, DataTypes);
  var author = _author(sequelize, DataTypes);
  var bill = _bill(sequelize, DataTypes);
  var bill_detail = _bill_detail(sequelize, DataTypes);
  var book = _book(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var category_detail = _category_detail(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var favourite = _favourite(sequelize, DataTypes);
  var news = _news(sequelize, DataTypes);
  var publishing_house = _publishing_house(sequelize, DataTypes);
  var sale = _sale(sequelize, DataTypes);

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
  book.belongsTo(publishing_house, { as: "publishing", foreignKey: "publishing_id"});
  publishing_house.hasMany(book, { as: "books", foreignKey: "publishing_id"});
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
    category,
    category_detail,
    comment,
    favourite,
    news,
    publishing_house,
    sale,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
