import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';

export interface publishing_houseAttributes {
  publishing_id: number;
  name?: string;
  image?: string;
  description?: string;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;
  active?: number;
}

export type publishing_housePk = "publishing_id";
export type publishing_houseId = publishing_house[publishing_housePk];
export type publishing_houseCreationAttributes = Optional<publishing_houseAttributes, publishing_housePk>;

export class publishing_house extends Model<publishing_houseAttributes, publishing_houseCreationAttributes> implements publishing_houseAttributes {
  publishing_id!: number;
  name?: string;
  image?: string;
  description?: string;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;
  active?: number;

  // publishing_house hasMany book via publishing_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof publishing_house {
    publishing_house.init({
      publishing_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
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
      tableName: 'publishing_house',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "publishing_id" },
          ]
        },
        {
          name: "publishing_id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "publishing_id" },
          ]
        },
      ]
    });
    return publishing_house;
  }
}
