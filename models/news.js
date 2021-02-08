const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('news', {
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
};
