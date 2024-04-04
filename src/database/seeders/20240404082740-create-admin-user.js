'use strict';
const {v4: uuidv4} = require('uuid');
const crypto = require('crypto');
const { ethers } = require('ethers');

const hashPassword = (challenge) => {
  console.log(process.env.SECRET_KEY, process.env.ALGORITHM)
  return crypto
    .createHmac(process.env.ALGORITHM, process.env.SECRET_KEY)
    .update(challenge)
    .digest("base64");
}

const generateRandomCode = () => {
  let code = '';
  for (let i = 0; i < 9; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

let adminId;
let walletId;
let cryptoTokenIds;
module.exports = {
  async up (queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      adminId = uuidv4();
      const adminUser = {
        user_id: adminId,
        fullname: 'Admin',
        code: generateRandomCode(),
        email: 'thanhphat19@gmail.com',
        phone_number: '0000000000',
        role: 'ADMIN',
        country_code: 'VN',
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
      });

      const wallet = ethers.Wallet.createRandom();
      walletId = uuidv4();
      await queryInterface.bulkInsert('wallets', [
        {
          wallet_id: walletId,
          user_id: adminUser.user_id,
          address: wallet.address.toString(),
          mnemonic: wallet.mnemonic?.phrase.toString(),
          private_key: wallet.privateKey.toString(),
          created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
      ], {
        transaction
      });

      await queryInterface.bulkInsert('user_balances', [
        { 
          user_id: adminUser.user_id,
          created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
      ], {
        transaction
      });

      const cryptoTokens = [
        {
          crypto_token_id: uuidv4(),
          symbol: "USDT",
          description: "Send only BEP20 USDT to this deposit address",
          created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        },
        {
          crypto_token_id: uuidv4(),
          symbol: "AIC",
          description: "Send only BEP20 USDT to this deposit address",
          created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
      ]

      cryptoTokenIds = cryptoTokens.map((cryptoToken) => cryptoToken.crypto_token_id);

      await queryInterface.bulkInsert('crypto_tokens', cryptoTokens, {
        transaction
      });

      const walletCryptoTokens = cryptoTokenIds.map((item) => ({
        wallet_id: walletId,
        crypto_token_id: item,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }));

      await queryInterface.bulkInsert('wallet_crypto_tokens', walletCryptoTokens, {
        transaction
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
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