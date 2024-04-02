module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('wallet_crypto_tokens', {
      wallet_id: {
        type: Sequelize.UUID(36),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'wallets',
          key: 'wallet_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      crypto_token_id: {
        type: Sequelize.UUID(36),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'crypto_tokens',
          key: 'crypto_token_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('wallet_crypto_tokens');
  }
};
