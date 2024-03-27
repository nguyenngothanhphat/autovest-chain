const {v4: uuidv4} = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.UUID(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4(),
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      fullname: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      phone_number: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true
      },
      country_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'countries',
          key: 'code'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      },
      invest: {
        type: Sequelize.INTEGER(),
        allowNull: true,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
        type: Sequelize.DATE,
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};
