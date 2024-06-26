const {v4: uuidv4} = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('wallets', {
      wallet_id: {
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
      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      private_key: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mnemonic: {
        type: Sequelize.STRING(255),
        allowNull: false
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
    await queryInterface.dropTable('wallets');
  }
};
