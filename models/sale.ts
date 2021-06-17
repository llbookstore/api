import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';

export interface saleAttributes {
  sale_id: number;
  active?: number;
  percent?: number;
  date_start?: number;
  date_end?: number;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;
}

export type salePk = "sale_id";
export type saleId = sale[salePk];
export type saleCreationAttributes = Optional<saleAttributes, salePk>;

export class sale extends Model<saleAttributes, saleCreationAttributes> implements saleAttributes {
  sale_id!: number;
  active?: number;
  percent?: number;
  date_start?: number;
  date_end?: number;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;

  // sale hasMany book via sale_id
  books!: book[];
  getBooks!: Sequelize.HasManyGetAssociationsMixin<book>;
  setBooks!: Sequelize.HasManySetAssociationsMixin<book, bookId>;
  addBook!: Sequelize.HasManyAddAssociationMixin<book, bookId>;
  addBooks!: Sequelize.HasManyAddAssociationsMixin<book, bookId>;
  createBook!: Sequelize.HasManyCreateAssociationMixin<book>;
  removeBook!: Sequelize.HasManyRemoveAssociationMixin<book, bookId>;
  removeBooks!: Sequelize.HasManyRemoveAssociationsMixin<book, bookId>;
  hasBook!: Sequelize.HasManyHasAssociationMixin<book, bookId>;
  hasBooks!: Sequelize.HasManyHasAssociationsMixin<book, bookId>;
  countBooks!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof sale {
    sale.init({
      sale_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
        comment: "0 - inactive\\\\\\\\\\\\\\\\n1 - active"
      },
      percent: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      date_start: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      date_end: {
        type: DataTypes.INTEGER,
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
      updated_at: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      updated_by: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'sale',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "sale_id" },
          ]
        },
        {
          name: "sale_id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "sale_id" },
          ]
        },
      ]
    });
    return sale;
  }
}
