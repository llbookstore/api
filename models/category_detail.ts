import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';
import type { category, categoryId } from './category';

export interface category_detailAttributes {
  category_id: number;
  book_id: number;
}

export type category_detailPk = "category_id" | "book_id";
export type category_detailId = category_detail[category_detailPk];
export type category_detailCreationAttributes = Optional<category_detailAttributes, category_detailPk>;

export class category_detail extends Model<category_detailAttributes, category_detailCreationAttributes> implements category_detailAttributes {
  category_id!: number;
  book_id!: number;

  // category_detail belongsTo category via category_id
  category!: category;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<category>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<category, categoryId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<category>;
  // category_detail belongsTo book via book_id
  book!: book;
  getBook!: Sequelize.BelongsToGetAssociationMixin<book>;
  setBook!: Sequelize.BelongsToSetAssociationMixin<book, bookId>;
  createBook!: Sequelize.BelongsToCreateAssociationMixin<book>;

  static initModel(sequelize: Sequelize.Sequelize): typeof category_detail {
    category_detail.init({
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category',
        key: 'category_id'
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
    tableName: 'category_detail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_id" },
          { name: "book_id" },
        ]
      },
      {
        name: "cat_fk_book_idx",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  });
  return category_detail;
  }
}
