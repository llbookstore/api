const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('account', {
    account_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    account_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "account_name_UNIQUE",
      validate: {
        notNull: {
          msg: 'you missed username'
        }
      }
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'you missed password'
        }
      }
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "email_UNIQUE",
      validate: {
        isEmail: true
      }
    },
    birth_date: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      comment: "0 - MAN\\\\\\\\n1 - Woman",
      validate: {
        isInt: {
          msg: 'gender must be a number (0-1)'
        },
        checkStatus(status) {
          if (status < 0 || status > 1)
            throw new Error('gender is invalid!');
        }
      }
    },
    type: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: "0 - common user\\n1 - admin\\n2 - writer\\n3 - approver",
      validate: {
        isInt: {
          msg: 'type must be a number'
        },
        checkStatus(status) {
          if (status < 0 || status > 1)

            throw new Error('type is invalid!');
        }
      }
    },
    active: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
      comment: "0 - inactive\\n1 - active",
      validate: {
        isInt: {
          msg: 'active must be a number (0-1)'
        },
        checkStatus(status) {
          if (status < 0 || status > 1)
            throw new Error('gender is invalid!');
        }
      }
    },
    verify: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
      comment: "0: is not verify\\n1: verified",
      validate: {
        isInt: {
          msg: 'verify must be a number (0-1)'
        },
        checkStatus(status) {
          if (status < 0 || status > 1)
            throw new Error('verify is invalid!');
        }
      }
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
            msg: 'created_at must be a number (0-1)'
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
            msg: 'updated_at must be a number (0-1)'
        }
      }
    },
    updated_by: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "account_id" },
        ]
      },
      {
        name: "account_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "account_id" },
        ]
      },
      {
        name: "account_name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "account_name" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
