const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    comment_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    acc_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'account_id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'book',
        key: 'book_id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_first_comment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      comment: "0 - false\n1 - true"
    },
    parent_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
      {
        name: "comment_fk_book_idx",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "comment_fk_account_idx",
        using: "BTREE",
        fields: [
          { name: "acc_id" },
        ]
      },
    ]
  });
};
