const {v4: uuidv4} = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('two_factor_auth', {
      two_fa_auth_id: {
        type: Sequelize.UUID(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4(),
      },
      user_id: {
        type: Sequelize.UUID(36),
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      },
      setup_code: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      is_enable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('two_factor_auth');
  }
};
