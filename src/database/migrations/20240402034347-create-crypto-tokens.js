const {v4: uuidv4} = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('crypto_tokens', {
      crypto_token_id: {
        type: Sequelize.UUID(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
      },
      symbol: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT(),
        allowNull: true
      },
      memo: {
        type: Sequelize.STRING(255),
        allowNull: true
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
