'use strict';
const {v4: uuidv4} = require('uuid');
const crypto = require('crypto');

const hashPassword = (challenge) => {
  console.log(process.env.SECRET_KEY, process.env.ALGORITHM)
  return crypto
    .createHmac(process.env.ALGORITHM, process.env.SECRET_KEY)
    .update(challenge)
    .digest("base64");
}

let adminId
module.exports = {
  async up (queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      adminId = uuidv4();
      const adminUser = {
        user_id: adminId,
        fullname: 'Admin',
        email: 'thanhphat19@gmail.com',
        phone_number: '0000000000',
        role: 'ADMIN',
        email: 'thanhphat19@gmail.com',
        is_active: true,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      const hashedPassword = hashPassword('VhQg8KZFB3SUvzeU')

      await queryInterface.bulkInsert('users', [
        adminUser
      ], {
        transaction
      })

      await queryInterface.bulkInsert('identities', [
        {
          user_id: adminUser.user_id,
          username: 'admin',
          password: hashedPassword,
          created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
      ], {
        transaction
      })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface) {
    if (!adminId) return;
    await queryInterface.bulkDelete("users", {
      user_id: adminId
    }, {
      truncate: true,
      cascade: true
    });
  }
};