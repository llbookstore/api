const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bill', {
    bill_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    user_note: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    payment_method: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
      comment: "0 - cod \n1 - banking \n2 - momo"
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
      comment: "0 - pending\n1 - approved\n2 - cancel"
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'account_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'account_id'
      }
    }
  }, {
    sequelize,
    tableName: 'bill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bill_id" },
        ]
      },
      {
        name: "bill_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bill_id" },
        ]
      },
      {
        name: "bill_fk_acc_idx",
        using: "BTREE",
        fields: [
          { name: "admin_id" },
        ]
      },
      {
        name: "fk_bill_user_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
