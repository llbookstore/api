import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { account, accountId } from './account';
import type { bill_detail, bill_detailId } from './bill_detail';
import type { book, bookId } from './book';

export interface billAttributes {
  bill_id: number;
  user_name?: string;
  phone?: string;
  address?: string;
  user_note?: string;
  payment_method?: number;
  total_price?: number;
  created_at?: number;
  status?: number;
  user_id?: number;
  handle_history?: string;
  is_paid?: number;
  paid_time?: number;
}

export type billPk = "bill_id";
export type billId = bill[billPk];
export type billCreationAttributes = Optional<billAttributes, billPk>;

export class bill extends Model<billAttributes, billCreationAttributes> implements billAttributes {
  bill_id!: number;
  user_name?: string;
  phone?: string;
  address?: string;
  user_note?: string;
  payment_method?: number;
  total_price?: number;
  created_at?: number;
  status?: number;
  user_id?: number;
  handle_history?: string;
  is_paid?: number;
  paid_time?: number;

  // bill belongsTo account via user_id
  user!: account;
  getUser!: Sequelize.BelongsToGetAssociationMixin<account>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<account, accountId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<account>;
  // bill hasMany bill_detail via bill_id
  bill_details!: bill_detail[];
  getBill_details!: Sequelize.HasManyGetAssociationsMixin<bill_detail>;
  setBill_details!: Sequelize.HasManySetAssociationsMixin<bill_detail, bill_detailId>;
  addBill_detail!: Sequelize.HasManyAddAssociationMixin<bill_detail, bill_detailId>;
  addBill_details!: Sequelize.HasManyAddAssociationsMixin<bill_detail, bill_detailId>;
  createBill_detail!: Sequelize.HasManyCreateAssociationMixin<bill_detail>;
  removeBill_detail!: Sequelize.HasManyRemoveAssociationMixin<bill_detail, bill_detailId>;
  removeBill_details!: Sequelize.HasManyRemoveAssociationsMixin<bill_detail, bill_detailId>;
  hasBill_detail!: Sequelize.HasManyHasAssociationMixin<bill_detail, bill_detailId>;
  hasBill_details!: Sequelize.HasManyHasAssociationsMixin<bill_detail, bill_detailId>;
  countBill_details!: Sequelize.HasManyCountAssociationsMixin;
  // bill belongsToMany book via bill_id and book_id
  books!: book[];
  getBooks!: Sequelize.BelongsToManyGetAssociationsMixin<book>;
  setBooks!: Sequelize.BelongsToManySetAssociationsMixin<book, bookId>;
  addBook!: Sequelize.BelongsToManyAddAssociationMixin<book, bookId>;
  addBooks!: Sequelize.BelongsToManyAddAssociationsMixin<book, bookId>;
  createBook!: Sequelize.BelongsToManyCreateAssociationMixin<book>;
  removeBook!: Sequelize.BelongsToManyRemoveAssociationMixin<book, bookId>;
  removeBooks!: Sequelize.BelongsToManyRemoveAssociationsMixin<book, bookId>;
  hasBook!: Sequelize.BelongsToManyHasAssociationMixin<book, bookId>;
  hasBooks!: Sequelize.BelongsToManyHasAssociationsMixin<book, bookId>;
  countBooks!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof bill {
    bill.init({
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
        allowNull: true,
        validate: {
          is: {
            args: /^[0]{1}[1235789]{1}[0-9]{8}$/i,
            msg: 'invalid phone number'
          }
        }
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
        comment: "0 - cod \\n1 - banking \\n2 - visa"
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
        comment: "0-  pending Chờ xử lý\n1-  accepted Đã xác nhận đơn hàng\n2 - transport Đang vận chuyển\n3 - success Giao hàng thành công\n-1 - cancel Đã hủy",
        validate: {
          isInt: {
            msg: 'status must be a number (0-2)'
          },
          checkStatus(status: number) {
            if (status < -2 || status > 4)
              throw new Error('status is invalid!');
          }
        }

      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'account',
          key: 'account_id'
        }
      },
      handle_history: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      is_paid: {
        type: DataTypes.TINYINT,
        allowNull: true
      },
      paid_time: {
        type: DataTypes.INTEGER,
        allowNull: true
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
          name: "fk_bill_user_idx",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
      ]
    });
    return bill;
  }
}
