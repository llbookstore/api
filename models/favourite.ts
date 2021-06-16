import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { account, accountId } from './account';
import type { book, bookId } from './book';

export interface favouriteAttributes {
  acc_id: number;
  book_id: number;
}

export type favouritePk = "acc_id" | "book_id";
export type favouriteId = favourite[favouritePk];
export type favouriteCreationAttributes = Optional<favouriteAttributes, favouritePk>;

export class favourite extends Model<favouriteAttributes, favouriteCreationAttributes> implements favouriteAttributes {
  acc_id!: number;
  book_id!: number;

  // favourite belongsTo account via acc_id
  acc!: account;
  getAcc!: Sequelize.BelongsToGetAssociationMixin<account>;
  setAcc!: Sequelize.BelongsToSetAssociationMixin<account, accountId>;
  createAcc!: Sequelize.BelongsToCreateAssociationMixin<account>;
  // favourite belongsTo book via book_id
  book!: book;
  getBook!: Sequelize.BelongsToGetAssociationMixin<book>;
  setBook!: Sequelize.BelongsToSetAssociationMixin<book, bookId>;
  createBook!: Sequelize.BelongsToCreateAssociationMixin<book>;

  static initModel(sequelize: Sequelize.Sequelize): typeof favourite {
    favourite.init({
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
    }
  }, {
    sequelize,
    tableName: 'favourite',
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
        name: "favourite_fk_book_idx",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  });
  return favourite;
  }
}
