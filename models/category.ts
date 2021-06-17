import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';
import type { category_detail, category_detailId } from './category_detail';

export interface categoryAttributes {
  category_id: number;
  name?: string;
  group_id?: number;
  ordering?: number;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;
  active?: number;
}

export type categoryPk = "category_id";
export type categoryId = category[categoryPk];
export type categoryCreationAttributes = Optional<categoryAttributes, categoryPk>;

export class category extends Model<categoryAttributes, categoryCreationAttributes> implements categoryAttributes {
  category_id!: number;
  name?: string;
  group_id?: number;
  ordering?: number;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;
  active?: number;

  // category hasMany category_detail via category_id
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
  // category belongsToMany book via category_id and book_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof category {
    category.init({
      category_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ordering: {
        type: DataTypes.INTEGER,
        allowNull: true
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
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1
      }
    }, {
      sequelize,
      tableName: 'category',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "category_id" },
          ]
        },
        {
          name: "category_id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "category_id" },
          ]
        },
      ]
    });
    return category;
  }
}
