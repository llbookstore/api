const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('catagory_detail', {
    catagory_id: {
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
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'catagory_detail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "catagory_id" },
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
};