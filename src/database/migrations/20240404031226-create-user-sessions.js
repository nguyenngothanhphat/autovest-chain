const {v4: uuidv4} = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_sessions', {
      session_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID(36),
        defaultValue: uuidv4(),
      },
      access_token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      is_valid: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_sessions');
  }
};