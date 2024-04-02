const {v4: uuidv4} = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_balances', {
      balance_id: {
        type: Sequelize.UUID(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
      },
      user_id: {
        type: Sequelize.UUID(36),
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      money_point: {
        type: Sequelize.DOUBLE(),
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        }
      },
      money_token: {
        type: Sequelize.DOUBLE(),
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        }
      },
      money_usd: {
        type: Sequelize.DOUBLE(),
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        }
      },
      str_money_point: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "0.00"
      },
      str_money_token: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "0.00"
      },
      str_money_usd: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "0.00"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('user_balances');
  }
};
