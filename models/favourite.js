const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favourite', {
    acc_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'account_id'
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
    tableName: 'favourite',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "acc_id" },
          { name: "book_id" },
        ]
      },
      {
        name: "favourite_fk_book_idx",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  });
};
