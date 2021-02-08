const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    odering: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_first_layer: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
      comment: " 0 - false\\n 1 - true"
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
};
