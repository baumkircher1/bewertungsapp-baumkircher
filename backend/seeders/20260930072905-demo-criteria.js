'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Criteria', [
      { name: 'Inhalt', maxScore: 10, weight: 1.0, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Präsentationstechnik', maxScore: 10, weight: 1.0, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Technische Umsetzung', maxScore: 10, weight: 1.5, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Criteria', null, {});
  }
};
