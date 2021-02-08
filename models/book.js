const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book', {
    book_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'author',
        key: 'author_id'
      }
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    cover_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dimension: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "kg"
    },
    published_date: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    publishing_house: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    publisher: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    format: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "audio- text"
    },
    book_translator: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    had_bought: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sale',
        key: 'sale_id'
      }
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "0 - sắp có\n1 - không bán\n2 - dừng sản xuất\n"
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'book',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "book_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "book_fk_author_idx",
        using: "BTREE",
        fields: [
          { name: "author_id" },
        ]
      },
      {
        name: "book_fk_sale_idx",
        using: "BTREE",
        fields: [
          { name: "sale_id" },
        ]
      },
    ]
  });
};
