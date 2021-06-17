import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { account, accountId } from './account';
import type { author, authorId } from './author';
import type { bill, billId } from './bill';
import type { bill_detail, bill_detailId } from './bill_detail';
import type { cart, cartId } from './cart';
import type { category, categoryId } from './category';
import type { category_detail, category_detailId } from './category_detail';
import type { favourite, favouriteId } from './favourite';
import type { publishing_house, publishing_houseId } from './publishing_house';
import type { review, reviewId } from './review';
import type { sale, saleId } from './sale';

export interface bookAttributes {
  book_id: number;
  author_id?: number;
  name: string;
  cover_image?: string;
  description?: string;
  language?: string;
  pages: number;
  dimension?: string;
  weight?: number;
  published_date?: number;
  publisher?: string;
  format?: string;
  book_translator?: string;
  quantity?: number;
  price: number;
  had_bought?: number;
  sale_id?: number;
  updated_at?: number;
  updated_by?: string;
  created_at?: number;
  created_by?: string;
  active?: number;
  publishing_id?: number;
  rating?: number;
}

export type bookPk = "book_id";
export type bookId = book[bookPk];
export type bookCreationAttributes = Optional<bookAttributes, bookPk>;

export class book extends Model<bookAttributes, bookCreationAttributes> implements bookAttributes {
  book_id!: number;
  author_id?: number;
  name!: string;
  cover_image?: string;
  description?: string;
  language?: string;
  pages!: number;
  dimension?: string;
  weight?: number;
  published_date?: number;
  publisher?: string;
  format?: string;
  book_translator?: string;
  quantity?: number;
  price!: number;
  had_bought?: number;
  sale_id?: number;
  updated_at?: number;
  updated_by?: string;
  created_at?: number;
  created_by?: string;
  active?: number;
  publishing_id?: number;
  rating?: number;

  // book hasMany bill_detail via book_id
  bill_details!: bill_detail[];
  getBill_details!: Sequelize.HasManyGetAssociationsMixin<bill_detail>;
  setBill_details!: Sequelize.HasManySetAssociationsMixin<bill_detail, bill_detailId>;
  addBill_detail!: Sequelize.HasManyAddAssociationMixin<bill_detail, bill_detailId>;
  addBill_details!: Sequelize.HasManyAddAssociationsMixin<bill_detail, bill_detailId>;
  createBill_detail!: Sequelize.HasManyCreateAssociationMixin<bill_detail>;
  removeBill_detail!: Sequelize.HasManyRemoveAssociationMixin<bill_detail, bill_detailId>;
  removeBill_details!: Sequelize.HasManyRemoveAssociationsMixin<bill_detail, bill_detailId>;
  hasBill_detail!: Sequelize.HasManyHasAssociationMixin<bill_detail, bill_detailId>;
  hasBill_details!: Sequelize.HasManyHasAssociationsMixin<bill_detail, bill_detailId>;
  countBill_details!: Sequelize.HasManyCountAssociationsMixin;
  // book belongsToMany bill via book_id and bill_id
  bills!: bill[];
  getBills!: Sequelize.BelongsToManyGetAssociationsMixin<bill>;
  setBills!: Sequelize.BelongsToManySetAssociationsMixin<bill, billId>;
  addBill!: Sequelize.BelongsToManyAddAssociationMixin<bill, billId>;
  addBills!: Sequelize.BelongsToManyAddAssociationsMixin<bill, billId>;
  createBill!: Sequelize.BelongsToManyCreateAssociationMixin<bill>;
  removeBill!: Sequelize.BelongsToManyRemoveAssociationMixin<bill, billId>;
  removeBills!: Sequelize.BelongsToManyRemoveAssociationsMixin<bill, billId>;
  hasBill!: Sequelize.BelongsToManyHasAssociationMixin<bill, billId>;
  hasBills!: Sequelize.BelongsToManyHasAssociationsMixin<bill, billId>;
  countBills!: Sequelize.BelongsToManyCountAssociationsMixin;
  // book belongsTo author via author_id
  author!: author;
  getAuthor!: Sequelize.BelongsToGetAssociationMixin<author>;
  setAuthor!: Sequelize.BelongsToSetAssociationMixin<author, authorId>;
  createAuthor!: Sequelize.BelongsToCreateAssociationMixin<author>;
  // book belongsTo publishing_house via publishing_id
  publishing!: publishing_house;
  getPublishing!: Sequelize.BelongsToGetAssociationMixin<publishing_house>;
  setPublishing!: Sequelize.BelongsToSetAssociationMixin<publishing_house, publishing_houseId>;
  createPublishing!: Sequelize.BelongsToCreateAssociationMixin<publishing_house>;
  // book belongsTo sale via sale_id
  sale!: sale;
  getSale!: Sequelize.BelongsToGetAssociationMixin<sale>;
  setSale!: Sequelize.BelongsToSetAssociationMixin<sale, saleId>;
  createSale!: Sequelize.BelongsToCreateAssociationMixin<sale>;
  // book hasMany cart via book_id
  carts!: cart[];
  getCarts!: Sequelize.HasManyGetAssociationsMixin<cart>;
  setCarts!: Sequelize.HasManySetAssociationsMixin<cart, cartId>;
  addCart!: Sequelize.HasManyAddAssociationMixin<cart, cartId>;
  addCarts!: Sequelize.HasManyAddAssociationsMixin<cart, cartId>;
  createCart!: Sequelize.HasManyCreateAssociationMixin<cart>;
  removeCart!: Sequelize.HasManyRemoveAssociationMixin<cart, cartId>;
  removeCarts!: Sequelize.HasManyRemoveAssociationsMixin<cart, cartId>;
  hasCart!: Sequelize.HasManyHasAssociationMixin<cart, cartId>;
  hasCarts!: Sequelize.HasManyHasAssociationsMixin<cart, cartId>;
  countCarts!: Sequelize.HasManyCountAssociationsMixin;
  // book belongsToMany account via book_id and acc_id
  accs!: account[];
  getAccs!: Sequelize.BelongsToManyGetAssociationsMixin<account>;
  setAccs!: Sequelize.BelongsToManySetAssociationsMixin<account, accountId>;
  addAcc!: Sequelize.BelongsToManyAddAssociationMixin<account, accountId>;
  addAccs!: Sequelize.BelongsToManyAddAssociationsMixin<account, accountId>;
  createAcc!: Sequelize.BelongsToManyCreateAssociationMixin<account>;
  removeAcc!: Sequelize.BelongsToManyRemoveAssociationMixin<account, accountId>;
  removeAccs!: Sequelize.BelongsToManyRemoveAssociationsMixin<account, accountId>;
  hasAcc!: Sequelize.BelongsToManyHasAssociationMixin<account, accountId>;
  hasAccs!: Sequelize.BelongsToManyHasAssociationsMixin<account, accountId>;
  countAccs!: Sequelize.BelongsToManyCountAssociationsMixin;
  // book hasMany category_detail via book_id
  category_details!: category_detail[];
  getCategory_details!: Sequelize.HasManyGetAssociationsMixin<category_detail>;
  setCategory_details!: Sequelize.HasManySetAssociationsMixin<category_detail, category_detailId>;
  addCategory_detail!: Sequelize.HasManyAddAssociationMixin<category_detail, category_detailId>;
  addCategory_details!: Sequelize.HasManyAddAssociationsMixin<category_detail, category_detailId>;
  createCategory_detail!: Sequelize.HasManyCreateAssociationMixin<category_detail>;
  removeCategory_detail!: Sequelize.HasManyRemoveAssociationMixin<category_detail, category_detailId>;
  removeCategory_details!: Sequelize.HasManyRemoveAssociationsMixin<category_detail, category_detailId>;
  hasCategory_detail!: Sequelize.HasManyHasAssociationMixin<category_detail, category_detailId>;
  hasCategory_details!: Sequelize.HasManyHasAssociationsMixin<category_detail, category_detailId>;
  countCategory_details!: Sequelize.HasManyCountAssociationsMixin;
  // book belongsToMany category via book_id and category_id
  categories!: category[];
  getCategories!: Sequelize.BelongsToManyGetAssociationsMixin<category>;
  setCategories!: Sequelize.BelongsToManySetAssociationsMixin<category, categoryId>;
  addCategory!: Sequelize.BelongsToManyAddAssociationMixin<category, categoryId>;
  addCategories!: Sequelize.BelongsToManyAddAssociationsMixin<category, categoryId>;
  createCategory!: Sequelize.BelongsToManyCreateAssociationMixin<category>;
  removeCategory!: Sequelize.BelongsToManyRemoveAssociationMixin<category, categoryId>;
  removeCategories!: Sequelize.BelongsToManyRemoveAssociationsMixin<category, categoryId>;
  hasCategory!: Sequelize.BelongsToManyHasAssociationMixin<category, categoryId>;
  hasCategories!: Sequelize.BelongsToManyHasAssociationsMixin<category, categoryId>;
  countCategories!: Sequelize.BelongsToManyCountAssociationsMixin;
  // book hasMany favourite via book_id
  favourites!: favourite[];
  getFavourites!: Sequelize.HasManyGetAssociationsMixin<favourite>;
  setFavourites!: Sequelize.HasManySetAssociationsMixin<favourite, favouriteId>;
  addFavourite!: Sequelize.HasManyAddAssociationMixin<favourite, favouriteId>;
  addFavourites!: Sequelize.HasManyAddAssociationsMixin<favourite, favouriteId>;
  createFavourite!: Sequelize.HasManyCreateAssociationMixin<favourite>;
  removeFavourite!: Sequelize.HasManyRemoveAssociationMixin<favourite, favouriteId>;
  removeFavourites!: Sequelize.HasManyRemoveAssociationsMixin<favourite, favouriteId>;
  hasFavourite!: Sequelize.HasManyHasAssociationMixin<favourite, favouriteId>;
  hasFavourites!: Sequelize.HasManyHasAssociationsMixin<favourite, favouriteId>;
  countFavourites!: Sequelize.HasManyCountAssociationsMixin;
  // book belongsToMany account via book_id and acc_id
  // accs!: account[];
  // getAccs!: Sequelize.BelongsToManyGetAssociationsMixin<account>;
  // setAccs!: Sequelize.BelongsToManySetAssociationsMixin<account, accountId>;
  // addAcc!: Sequelize.BelongsToManyAddAssociationMixin<account, accountId>;
  // addAccs!: Sequelize.BelongsToManyAddAssociationsMixin<account, accountId>;
  // createAcc!: Sequelize.BelongsToManyCreateAssociationMixin<account>;
  // removeAcc!: Sequelize.BelongsToManyRemoveAssociationMixin<account, accountId>;
  // removeAccs!: Sequelize.BelongsToManyRemoveAssociationsMixin<account, accountId>;
  // hasAcc!: Sequelize.BelongsToManyHasAssociationMixin<account, accountId>;
  // hasAccs!: Sequelize.BelongsToManyHasAssociationsMixin<account, accountId>;
  // countAccs!: Sequelize.BelongsToManyCountAssociationsMixin;
  // book hasMany review via book_id
  reviews!: review[];
  getReviews!: Sequelize.HasManyGetAssociationsMixin<review>;
  setReviews!: Sequelize.HasManySetAssociationsMixin<review, reviewId>;
  addReview!: Sequelize.HasManyAddAssociationMixin<review, reviewId>;
  addReviews!: Sequelize.HasManyAddAssociationsMixin<review, reviewId>;
  createReview!: Sequelize.HasManyCreateAssociationMixin<review>;
  removeReview!: Sequelize.HasManyRemoveAssociationMixin<review, reviewId>;
  removeReviews!: Sequelize.HasManyRemoveAssociationsMixin<review, reviewId>;
  hasReview!: Sequelize.HasManyHasAssociationMixin<review, reviewId>;
  hasReviews!: Sequelize.HasManyHasAssociationsMixin<review, reviewId>;
  countReviews!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof book {
    book.init({
      book_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'author',
          key: 'author_id'
        }
      },
      name: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          checkNameLength(name: string) {
            if (name.length < 2)
              throw new Error('name must have more than 2 characters!')
          }
        }
      },
      cover_image: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      language: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'pages must be a integer'
          },
          checkPositive(item: number) {
            if (item < 0) throw new Error('pages must is Positive Integer')
          }
        }
      },
      dimension: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      weight: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        comment: "kg",
        validate: {
          isInt: {
            msg: 'weight must be a number'
          },
          checkPositive(item: number) {
            if (item < 0) throw new Error('weight must is Positive Integer')
          }
        }
      },
      published_date: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      publisher: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      format: {
        type: DataTypes.STRING(45),
        allowNull: true,
        comment: "audio- text"
      },
      book_translator: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: 'quantity must be a number'
          },
          checkPositive(item: number) {
            if (item < 0) throw new Error('quantity must is Positive Integer')
          }
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'price must be a number'
          },
          checkPositive(item: number) {
            if (item < 0) throw new Error('quantity must is Positive Integer')
          }
        }
      },
      had_bought: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      sale_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'sale',
          key: 'sale_id'
        }
      },
      updated_at: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      updated_by: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      created_at: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      created_by: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1
      },
      publishing_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'publishing_house',
          key: 'publishing_id'
        }
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'book',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "book_id" },
          ]
        },
        {
          name: "book_id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "book_id" },
          ]
        },
        {
          name: "book_fk_author_idx",
          using: "BTREE",
          fields: [
            { name: "author_id" },
          ]
        },
        {
          name: "book_fk_sale_idx",
          using: "BTREE",
          fields: [
            { name: "sale_id" },
          ]
        },
        {
          name: "book_fk_publishing_idx",
          using: "BTREE",
          fields: [
            { name: "publishing_id" },
          ]
        },
      ]
    });
    return book;
  }
}
