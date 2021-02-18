const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
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
          msg: 'please enter username'
        },
        len: {
          args: [6],
          msg: 'username must have at least 6 characters'
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
          msg: 'please enter password'
        }
      }
    },
    phone: {
      type: DataTypes.STRING(45),
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
      allowNull: true,
      validate: {
        isInt: {
          msg: 'birth_date must be a integer'
        },
        len: {
          args: [7],
          msg: '[birth_date] min: 7 digits'
        }
      }
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
          if (status < 0)

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
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: "phone_UNIQUE",
      validate: {
        is: {
          args: /^[0]{1}[1235789]{1}[0-9]{8}$/i,
          msg: 'invalid phone number'
        }
      }
    },
    avatar: {
      type: DataTypes.STRING(500),
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
      {
        name: "phone_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
    ]
  });
};
