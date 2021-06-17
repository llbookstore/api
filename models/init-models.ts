import type { Sequelize, Model } from "sequelize";
import { account } from "./account";
import type { accountAttributes, accountCreationAttributes } from "./account";
import { advisory } from "./advisory";
import type { advisoryAttributes, advisoryCreationAttributes } from "./advisory";
import { author } from "./author";
import type { authorAttributes, authorCreationAttributes } from "./author";
import { bill } from "./bill";
import type { billAttributes, billCreationAttributes } from "./bill";
import { bill_detail } from "./bill_detail";
import type { bill_detailAttributes, bill_detailCreationAttributes } from "./bill_detail";
import { book } from "./book";
import type { bookAttributes, bookCreationAttributes } from "./book";
import { cart } from "./cart";
import type { cartAttributes, cartCreationAttributes } from "./cart";
import { category } from "./category";
import type { categoryAttributes, categoryCreationAttributes } from "./category";
import { category_detail } from "./category_detail";
import type { category_detailAttributes, category_detailCreationAttributes } from "./category_detail";
import { favourite } from "./favourite";
import type { favouriteAttributes, favouriteCreationAttributes } from "./favourite";
import { news } from "./news";
import type { newsAttributes, newsCreationAttributes } from "./news";
import { publishing_house } from "./publishing_house";
import type { publishing_houseAttributes, publishing_houseCreationAttributes } from "./publishing_house";
import { review } from "./review";
import type { reviewAttributes, reviewCreationAttributes } from "./review";
import { sale } from "./sale";
import type { saleAttributes, saleCreationAttributes } from "./sale";

export {
  account,
  advisory,
  author,
  bill,
  bill_detail,
  book,
  cart,
  category,
  category_detail,
  favourite,
  news,
  publishing_house,
  review,
  sale,
};

export type {
  accountAttributes,
  accountCreationAttributes,
  advisoryAttributes,
  advisoryCreationAttributes,
  authorAttributes,
  authorCreationAttributes,
  billAttributes,
  billCreationAttributes,
  bill_detailAttributes,
  bill_detailCreationAttributes,
  bookAttributes,
  bookCreationAttributes,
  cartAttributes,
  cartCreationAttributes,
  categoryAttributes,
  categoryCreationAttributes,
  category_detailAttributes,
  category_detailCreationAttributes,
  favouriteAttributes,
  favouriteCreationAttributes,
  newsAttributes,
  newsCreationAttributes,
  publishing_houseAttributes,
  publishing_houseCreationAttributes,
  reviewAttributes,
  reviewCreationAttributes,
  saleAttributes,
  saleCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  account.initModel(sequelize);
  advisory.initModel(sequelize);
  author.initModel(sequelize);
  bill.initModel(sequelize);
  bill_detail.initModel(sequelize);
  book.initModel(sequelize);
  cart.initModel(sequelize);
  category.initModel(sequelize);
  category_detail.initModel(sequelize);
  favourite.initModel(sequelize);
  news.initModel(sequelize);
  publishing_house.initModel(sequelize);
  review.initModel(sequelize);
  sale.initModel(sequelize);

  bill.belongsToMany(book, { through: bill_detail as typeof Model, foreignKey: "bill_id", otherKey: "book_id" });
  book.belongsToMany(bill, { through: bill_detail as typeof Model, foreignKey: "book_id", otherKey: "bill_id" });
  account.belongsToMany(book, { through: cart as typeof Model, foreignKey: "acc_id", otherKey: "book_id" });
  book.belongsToMany(account, { through: cart as typeof Model, foreignKey: "book_id", otherKey: "acc_id" });
  category.belongsToMany(book, { through: category_detail as typeof Model, foreignKey: "category_id", otherKey: "book_id" });
  book.belongsToMany(category, { through: category_detail as typeof Model, foreignKey: "book_id", otherKey: "category_id" });
  account.belongsToMany(book, { through: favourite as typeof Model, foreignKey: "acc_id", otherKey: "book_id" });
  book.belongsToMany(account, { through: favourite as typeof Model, foreignKey: "book_id", otherKey: "acc_id" });
  bill.belongsTo(account, { as: "user", foreignKey: "user_id" });
  account.hasMany(bill, { as: "bills", foreignKey: "user_id" });
  bill_detail.belongsTo(bill, { as: "bill", foreignKey: "bill_id" });
  bill.hasMany(bill_detail, { as: "bill_details", foreignKey: "bill_id" });
  bill_detail.belongsTo(book, { as: "book", foreignKey: "book_id" });
  book.hasMany(bill_detail, { as: "bill_details", foreignKey: "book_id" });
  book.belongsTo(author, { as: "author", foreignKey: "author_id" });
  author.hasMany(book, { as: "books", foreignKey: "author_id" });
  book.belongsTo(publishing_house, { as: "publishing", foreignKey: "publishing_id" });
  publishing_house.hasMany(book, { as: "books", foreignKey: "publishing_id" });
  book.belongsTo(sale, { as: "sale", foreignKey: "sale_id" });
  sale.hasMany(book, { as: "books", foreignKey: "sale_id" });
  cart.belongsTo(account, { as: "acc", foreignKey: "acc_id" });
  account.hasMany(cart, { as: "carts", foreignKey: "acc_id" });
  cart.belongsTo(book, { as: "book", foreignKey: "book_id" });
  book.hasMany(cart, { as: "carts", foreignKey: "book_id" });
  category_detail.belongsTo(category, { as: "category", foreignKey: "category_id" });
  category.hasMany(category_detail, { as: "category_details", foreignKey: "category_id" });
  category_detail.belongsTo(book, { as: "book", foreignKey: "book_id" });
  book.hasMany(category_detail, { as: "category_details", foreignKey: "book_id" });
  favourite.belongsTo(account, { as: "acc", foreignKey: "acc_id" });
  account.hasMany(favourite, { as: "favourites", foreignKey: "acc_id" });
  favourite.belongsTo(book, { as: "book", foreignKey: "book_id" });
  book.hasMany(favourite, { as: "favourites", foreignKey: "book_id" });
  review.belongsTo(account, { as: "acc", foreignKey: "acc_id" });
  account.hasMany(review, { as: "reviews", foreignKey: "acc_id" });
  review.belongsTo(book, { as: "book", foreignKey: "book_id" });
  book.hasMany(review, { as: "reviews", foreignKey: "book_id" });

  return {
    account: account,
    advisory: advisory,
    author: author,
    bill: bill,
    bill_detail: bill_detail,
    book: book,
    cart: cart,
    category: category,
    category_detail: category_detail,
    favourite: favourite,
    news: news,
    publishing_house: publishing_house,
    review: review,
    sale: sale,
  };
}
