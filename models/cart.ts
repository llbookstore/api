import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { account, accountId } from './account';
import type { book, bookId } from './book';

export interface cartAttributes {
  acc_id: number;
  book_id: number;
  quantity?: number;
}

export type cartPk = "acc_id" | "book_id";
export type cartId = cart[cartPk];
export type cartCreationAttributes = Optional<cartAttributes, cartPk>;

export class cart extends Model<cartAttributes, cartCreationAttributes> implements cartAttributes {
  acc_id!: number;
  book_id!: number;
  quantity?: number;

  // cart belongsTo account via acc_id
  acc!: account;
  getAcc!: Sequelize.BelongsToGetAssociationMixin<account>;
  setAcc!: Sequelize.BelongsToSetAssociationMixin<account, accountId>;
  createAcc!: Sequelize.BelongsToCreateAssociationMixin<account>;
  // cart belongsTo book via book_id
  book!: book;
  getBook!: Sequelize.BelongsToGetAssociationMixin<book>;
  setBook!: Sequelize.BelongsToSetAssociationMixin<book, bookId>;
  createBook!: Sequelize.BelongsToCreateAssociationMixin<book>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cart {
    cart.init({
    acc_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'account_id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'book',
        key: 'book_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'cart',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "acc_id" },
          { name: "book_id" },
        ]
      },
      {
        name: "fk_cart_book_idx",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  });
  return cart;
  }
}
