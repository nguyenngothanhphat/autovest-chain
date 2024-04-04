const { Op } = require('sequelize');
const {v4: uuidv4} = require('uuid');
let countryIds;
module.exports = {
  async up (queryInterface) {
    const countries = [
      {
        country_id: uuidv4(),
        code: 'VN',
        name: 'Việt Nam',
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      {
        country_id: uuidv4(),
        code: 'US',
        name: 'United States',
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      }
    ];
    countryIds = countries.map((country) => country.country_id);
    await queryInterface.bulkInsert('countries', countries)
  },

  async down (queryInterface) {
    if (!countryIds.length) return;
    await queryInterface.bulkDelete("countries", {
      country_id: { [Op.in]: countryIds }
    }, {
      truncate: true,
      cascade: true
    });
  }
};
