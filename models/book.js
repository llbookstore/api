const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book', {
    book_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'author',
        key: 'author_id'
      }
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        checkNameLength(name) {
          if(name.length < 2)
            throw new Error('name must have more than 2 characters!')
        }
      }
    },
    cover_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'pages must be a integer'
        },
        checkPositive(item){
          if(item <0) throw new Error('pages must is Positive Integer')
        }
      }
    },
    dimension: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "kg",
      validate: {
        isInt: {
          msg: 'weight must be a number'
        },
        checkPositive(item){
          if(item <0) throw new Error('weight must is Positive Integer')
        }
      }
    },
    published_date: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    publisher: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    format: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "audio- text"
    },
    book_translator: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: 'quantity must be a number'
        },
        checkPositive(item){
          if(item <0) throw new Error('quantity must is Positive Integer')
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'price must be a number'
        },
        checkPositive(item){
          if(item <0) throw new Error('quantity must is Positive Integer')
        }
      }
    },
    had_bought: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sale',
        key: 'sale_id'
      }
    },
    // status: {
    //   type: DataTypes.TINYINT,
    //   allowNull: true,
    //   comment: "0 - sắp có\n1 - không bán\n2 - dừng sản xuất\n",
    //   validate: {
    //     isInt: {
    //       msg: 'status must be a number'
    //     },
    //     checkPositive(item){
    //       if(item <0) throw new Error('status must is Positive Integer')
    //     }
    //   }
    
    // },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(45),
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
    active: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
  publishing_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'publishing_house',
        key: 'publishing_id'
      }
    }
  }, {
    sequelize,
    tableName: 'book',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "book_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "book_fk_author_idx",
        using: "BTREE",
        fields: [
          { name: "author_id" },
        ]
      },
      {
        name: "book_fk_sale_idx",
        using: "BTREE",
        fields: [
          { name: "sale_id" },
        ]
      },
{
        name: "book_fk_publishing_idx",
        using: "BTREE",
        fields: [
          { name: "publishing_id" },
        ]
      },
    ]
  });
};
