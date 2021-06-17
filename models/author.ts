import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';

export interface authorAttributes {
  author_id: number;
  name?: string;
  avatar?: string;
  description?: string;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;
  active?: number;
}

export type authorPk = "author_id";
export type authorId = author[authorPk];
export type authorCreationAttributes = Optional<authorAttributes, authorPk>;

export class author extends Model<authorAttributes, authorCreationAttributes> implements authorAttributes {
  author_id!: number;
  name?: string;
  avatar?: string;
  description?: string;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;
  active?: number;

  // author hasMany book via author_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof author {
    author.init({
      author_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(300),
        allowNull: true
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
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
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1
      }
    }, {
      sequelize,
      tableName: 'author',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "author_id" },
          ]
        },
        {
          name: "author_id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "author_id" },
          ]
        },
      ]
    });
    return author;
  }
}
