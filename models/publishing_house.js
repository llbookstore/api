const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publishing_house', {
    publishing_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: 'created_at must be a number'
        },
        len: {
          args: [7],
          msg: '[created_at] min: 7 digits'
        }
      }
    },
    created_by: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: 'updated_at must be a number'
        },
        len: {
          args: [7],
          msg: '[updated_at] min: 7 digits'
        }
      }
    },
    updated_by: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    active: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'publishing_house',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "publishing_id" },
        ]
      },
    ]
  });
};
