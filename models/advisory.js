const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('advisory', {
    advisory_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    user_note: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
      comment: "0 - cancel\n1 - pending\n2 - approved"
    },
    handle_history: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "array object\n{\n  id: ' ',\n  admin_name: ' ',\n  status: ' ',\n  admin_note: ' ',\n}..."
    }
  }, {
    sequelize,
    tableName: 'advisory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "advisory_id" },
        ]
      },
      {
        name: "advisory_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "advisory_id" },
        ]
      },
    ]
  });
};
