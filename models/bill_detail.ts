import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { bill, billId } from './bill';
import type { book, bookId } from './book';

export interface bill_detailAttributes {
  bill_id: number;
  book_id: number;
  quantity?: number;
  price?: number;
}

export type bill_detailPk = "bill_id" | "book_id";
export type bill_detailId = bill_detail[bill_detailPk];
export type bill_detailCreationAttributes = Optional<bill_detailAttributes, bill_detailPk>;

export class bill_detail extends Model<bill_detailAttributes, bill_detailCreationAttributes> implements bill_detailAttributes {
  bill_id!: number;
  book_id!: number;
  quantity?: number;
  price?: number;

  // bill_detail belongsTo bill via bill_id
  bill!: bill;
  getBill!: Sequelize.BelongsToGetAssociationMixin<bill>;
  setBill!: Sequelize.BelongsToSetAssociationMixin<bill, billId>;
  createBill!: Sequelize.BelongsToCreateAssociationMixin<bill>;
  // bill_detail belongsTo book via book_id
  book!: book;
  getBook!: Sequelize.BelongsToGetAssociationMixin<book>;
  setBook!: Sequelize.BelongsToSetAssociationMixin<book, bookId>;
  createBook!: Sequelize.BelongsToCreateAssociationMixin<book>;

  static initModel(sequelize: Sequelize.Sequelize): typeof bill_detail {
    bill_detail.init({
      bill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'bill',
          key: 'bill_id'
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
        allowNull: true
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'bill_detail',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "bill_id" },
            { name: "book_id" },
          ]
        },
        {
          name: "bill_detail_fk_book_idx",
          using: "BTREE",
          fields: [
            { name: "book_id" },
          ]
        },
      ]
    });
    return bill_detail;
  }
}
