'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Players', [
      {
        name: 'Ash Ketchum',
        username: 'thebestthereeverwas',
        password: 'pikachu',
        teamId: 1
      },
      {
        name: 'Gary Oak',
        username: 'oakjr',
        password: 'squirtle',
        teamId: 2
      }, 
      {
        name: 'Brock',
        username: 'rockstar',
        password: 'onix',
        teamId: 1
      },
      {
        name: 'Misty',
        username: 'bubbles',
        password: 'togepi',
        teamId: 1
      }
    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Players', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
