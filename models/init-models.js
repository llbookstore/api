var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _advisory = require("./advisory");
var _author = require("./author");
var _bill = require("./bill");
var _bill_detail = require("./bill_detail");
var _book = require("./book");
var _catagory_detail = require("./catagory_detail");
var _category = require("./category");
var _comment = require("./comment");
var _favourite = require("./favourite");
var _news = require("./news");
var _sale = require("./sale");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var advisory = _advisory(sequelize, DataTypes);
  var author = _author(sequelize, DataTypes);
  var bill = _bill(sequelize, DataTypes);
  var bill_detail = _bill_detail(sequelize, DataTypes);
  var book = _book(sequelize, DataTypes);
  var catagory_detail = _catagory_detail(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var favourite = _favourite(sequelize, DataTypes);
  var news = _news(sequelize, DataTypes);
  var sale = _sale(sequelize, DataTypes);

  bill.belongsToMany(book, { through: bill_detail, foreignKey: "bill_id", otherKey: "book_id" });
  book.belongsToMany(bill, { through: bill_detail, foreignKey: "book_id", otherKey: "bill_id" });
  category.belongsToMany(book, { through: catagory_detail, foreignKey: "catagory_id", otherKey: "book_id" });
  book.belongsToMany(category, { through: catagory_detail, foreignKey: "book_id", otherKey: "catagory_id" });
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
  catagory_detail.belongsTo(category, { as: "catagory", foreignKey: "catagory_id"});
  category.hasMany(catagory_detail, { as: "catagory_details", foreignKey: "catagory_id"});
  catagory_detail.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(catagory_detail, { as: "catagory_details", foreignKey: "book_id"});
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
    catagory_detail,
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
