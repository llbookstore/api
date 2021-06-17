import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface newsAttributes {
  news_id: number;
  title?: string;
  description?: string;
  created_at?: number;
  created_by?: string;
  published_at?: number;
  published_by?: string;
  updated_at?: number;
  updated_by?: string;
  status?: number;
  thumbnail?: string;
  source?: string;
  summary?: string;
}

export type newsPk = "news_id";
export type newsId = news[newsPk];
export type newsCreationAttributes = Optional<newsAttributes, newsPk>;

export class news extends Model<newsAttributes, newsCreationAttributes> implements newsAttributes {
  news_id!: number;
  title?: string;
  description?: string;
  created_at?: number;
  created_by?: string;
  published_at?: number;
  published_by?: string;
  updated_at?: number;
  updated_by?: string;
  status?: number;
  thumbnail?: string;
  source?: string;
  summary?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof news {
    news.init({
      news_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(500),
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
      published_at: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      published_by: {
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
      status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        comment: "0 - draft\n1 - published\n2 - pending\n3 - approved"
      },
      thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      source: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      summary: {
        type: DataTypes.STRING(500),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'news',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "news_id" },
          ]
        },
      ]
    });
    return news;
  }
}
