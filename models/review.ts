import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { account, accountId } from './account';
import type { book, bookId } from './book';

export interface reviewAttributes {
  review_id: number;
  acc_id?: number;
  book_id?: number;
  comment?: string;
  full_name?: string;
  rating?: number;
  created_at?: number;
  status?: number;
  accepted_by?: string;
  accepted_at?: number;
}

export type reviewPk = "review_id";
export type reviewId = review[reviewPk];
export type reviewCreationAttributes = Optional<reviewAttributes, reviewPk>;

export class review extends Model<reviewAttributes, reviewCreationAttributes> implements reviewAttributes {
  review_id!: number;
  acc_id?: number;
  book_id?: number;
  comment?: string;
  full_name?: string;
  rating?: number;
  created_at?: number;
  status?: number;
  accepted_by?: string;
  accepted_at?: number;

  // review belongsTo account via acc_id
  acc!: account;
  getAcc!: Sequelize.BelongsToGetAssociationMixin<account>;
  setAcc!: Sequelize.BelongsToSetAssociationMixin<account, accountId>;
  createAcc!: Sequelize.BelongsToCreateAssociationMixin<account>;
  // review belongsTo book via book_id
  book!: book;
  getBook!: Sequelize.BelongsToGetAssociationMixin<book>;
  setBook!: Sequelize.BelongsToSetAssociationMixin<book, bookId>;
  createBook!: Sequelize.BelongsToCreateAssociationMixin<book>;

  static initModel(sequelize: Sequelize.Sequelize): typeof review {
    review.init({
    review_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    acc_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'account_id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'book',
        key: 'book_id'
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    accepted_by: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    accepted_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'review',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "review_id" },
        ]
      },
      {
        name: "index4",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "acc_id" },
          { name: "book_id" },
        ]
      },
      {
        name: "review_fk_book_idx",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "review_fk_account_idx",
        using: "BTREE",
        fields: [
          { name: "acc_id" },
        ]
      },
    ]
  });
  return review;
  }
}
