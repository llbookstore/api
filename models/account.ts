import Sequelize, { DataTypes, Model, Optional, ModelValidateOptions } from 'sequelize';
import type { bill, billId } from './bill';
import type { book, bookId } from './book';
import type { cart, cartId } from './cart';
import type { favourite, favouriteId } from './favourite';
import type { review, reviewId } from './review';

export interface accountAttributes {
  account_id: number;
  account_name: string;
  full_name?: string;
  password: string;
  email?: string;
  birth_date?: number;
  gender?: number;
  type: number;
  active?: number;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;
  phone?: string;
  avatar?: string;
  address?: string;
}

export type accountPk = "account_id";
export type accountId = account[accountPk];
export type accountCreationAttributes = Optional<accountAttributes, accountPk>;

export class account extends Model<accountAttributes, accountCreationAttributes> implements accountAttributes {
  account_id!: number;
  account_name!: string;
  full_name?: string;
  password!: string;
  email?: string;
  birth_date?: number;
  gender?: number;
  type!: number;
  active?: number;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;
  phone?: string;
  avatar?: string;
  address?: string;

  // account hasMany bill via user_id
  bills!: bill[];
  getBills!: Sequelize.HasManyGetAssociationsMixin<bill>;
  setBills!: Sequelize.HasManySetAssociationsMixin<bill, billId>;
  addBill!: Sequelize.HasManyAddAssociationMixin<bill, billId>;
  addBills!: Sequelize.HasManyAddAssociationsMixin<bill, billId>;
  createBill!: Sequelize.HasManyCreateAssociationMixin<bill>;
  removeBill!: Sequelize.HasManyRemoveAssociationMixin<bill, billId>;
  removeBills!: Sequelize.HasManyRemoveAssociationsMixin<bill, billId>;
  hasBill!: Sequelize.HasManyHasAssociationMixin<bill, billId>;
  hasBills!: Sequelize.HasManyHasAssociationsMixin<bill, billId>;
  countBills!: Sequelize.HasManyCountAssociationsMixin;
  // account hasMany cart via acc_id
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
  // account belongsToMany book via acc_id and book_id
  books!: book[];
  getBooks!: Sequelize.BelongsToManyGetAssociationsMixin<book>;
  setBooks!: Sequelize.BelongsToManySetAssociationsMixin<book, bookId>;
  addBook!: Sequelize.BelongsToManyAddAssociationMixin<book, bookId>;
  addBooks!: Sequelize.BelongsToManyAddAssociationsMixin<book, bookId>;
  createBook!: Sequelize.BelongsToManyCreateAssociationMixin<book>;
  removeBook!: Sequelize.BelongsToManyRemoveAssociationMixin<book, bookId>;
  removeBooks!: Sequelize.BelongsToManyRemoveAssociationsMixin<book, bookId>;
  hasBook!: Sequelize.BelongsToManyHasAssociationMixin<book, bookId>;
  hasBooks!: Sequelize.BelongsToManyHasAssociationsMixin<book, bookId>;
  countBooks!: Sequelize.BelongsToManyCountAssociationsMixin;
  // account hasMany favourite via acc_id
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
  // account belongsToMany book via acc_id and book_id
  // books!: book[];
  // getBooks!: Sequelize.BelongsToManyGetAssociationsMixin<book>;
  // setBooks!: Sequelize.BelongsToManySetAssociationsMixin<book, bookId>;
  // addBook!: Sequelize.BelongsToManyAddAssociationMixin<book, bookId>;
  // addBooks!: Sequelize.BelongsToManyAddAssociationsMixin<book, bookId>;
  // createBook!: Sequelize.BelongsToManyCreateAssociationMixin<book>;
  // removeBook!: Sequelize.BelongsToManyRemoveAssociationMixin<book, bookId>;
  // removeBooks!: Sequelize.BelongsToManyRemoveAssociationsMixin<book, bookId>;
  // hasBook!: Sequelize.BelongsToManyHasAssociationMixin<book, bookId>;
  // hasBooks!: Sequelize.BelongsToManyHasAssociationsMixin<book, bookId>;
  // countBooks!: Sequelize.BelongsToManyCountAssociationsMixin;
  // account hasMany review via acc_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof account {
    account.init({
      account_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      account_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: "account_name_UNIQUE",
        validate: {
          notNull: {
            msg: 'please enter username'
          },
          len: {
            args: [6, 255],
            msg: 'username must have at least 6 characters'
          }
        }
      },
      full_name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'please enter password'
          }
        }
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: true,
        unique: "email_UNIQUE",
        validate: {
          isEmail: true
        }
      },
      birth_date: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: 'birth_date must be a integer'
          },
          len: {
            args: [7, 20],
            msg: '[birth_date] min: 7 digits'
          }
        }
      },
      gender: {
        type: DataTypes.TINYINT,
        allowNull: true,
        comment: "0 - MAN\\\\\\\\n1 - Woman",
        validate: {
          isInt: {
            msg: 'gender must be a number (0-1)'
          },
          checkStatus(status: number) {
            if (status < 0 || status > 1)
              throw new Error('gender is invalid!');
          }
        }
      },
      type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: "0 - common user\\n1 - admin\\n2 - writer\\n3 - approver",
        validate: {
          isInt: {
            msg: 'type must be a number'
          },
          checkStatus(status: number) {
            if (status < 0)

              throw new Error('type is invalid!');
          }
        }
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
        comment: "0 - inactive\\n1 - active",
        validate: {
          isInt: {
            msg: 'active must be a number (0-1)'
          },
          checkStatus(status: number) {
            if (status < 0 || status > 1)
              throw new Error('active is invalid!');
          }
        }
      },
      created_at: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: 'created_at must be a number'
          },
          len: {
            args: [7, 20],
            msg: '[created_at] min: 7 digits'
          }
        }
      },
      created_by: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      updated_at: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: 'updated_at must be a number'
          },
          len: {
            args: [7, 20],
            msg: '[updated_at] min: 7 digits'
          }
        }
      },
      updated_by: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
        unique: "phone_UNIQUE",
        validate: {
          is: {
            args: /^[0]{1}[1235789]{1}[0-9]{8}$/i,
            msg: 'invalid phone number'
          }
        }
      },
      avatar: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      address: {
        type: DataTypes.STRING(500),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'account',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "account_id" },
          ]
        },
        {
          name: "account_id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "account_id" },
          ]
        },
        {
          name: "account_name_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "account_name" },
          ]
        },
        {
          name: "email_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "email" },
          ]
        },
        {
          name: "phone_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "phone" },
          ]
        },
      ]
    });
    return account;
  }
}
