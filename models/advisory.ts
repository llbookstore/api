import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface advisoryAttributes {
  advisory_id: number;
  username?: string;
  address?: string;
  phone?: string;
  user_note?: string;
  created_at?: number;
  status?: number;
  handle_history?: string;
}

export type advisoryPk = "advisory_id";
export type advisoryId = advisory[advisoryPk];
export type advisoryCreationAttributes = Optional<advisoryAttributes, advisoryPk>;

export class advisory extends Model<advisoryAttributes, advisoryCreationAttributes> implements advisoryAttributes {
  advisory_id!: number;
  username?: string;
  address?: string;
  phone?: string;
  user_note?: string;
  created_at?: number;
  status?: number;
  handle_history?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof advisory {
    advisory.init({
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
      allowNull: true,
      validate: {
        is: {
          args: /^[0]{1}[1235789]{1}[0-9]{8}$/i,
          msg: 'invalid phone number'
        }
      }
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
      comment: "0 - cancel\n1 - pending\n2 - approved",
      validate: {
        isInt: {
          msg: 'status must be a number'
        },
        checkStatus(status: number) {
          if (status < 0)

            throw new Error('status is invalid!');
        }
      }
    },
    handle_history: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "array object\\n{\\n  id: ' ',\\n  admin_name: ' ',\\n  status: ' ',\\n  admin_note: ' ',\\n}..."
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
  return advisory;
  }
}
