'use strict';

const { Musician, Band } = require('../models');

const bandMusicians = [
  {
    name: 'The Falling Box',
    musicians: [
      { firstName: 'Adam', lastName: 'Appleby' },
      { firstName: 'Anton', lastName: 'Martinovic' },
      { firstName: 'Wilson', lastName: 'Holt' }
    ]
  },
  {
    name: 'America The Piano',
    musicians: [
      { firstName: 'Marine', lastName: 'Sweet' },
      { firstName: 'Georgette', lastName: 'Kubo' }
    ]
  },
  {
    name: 'Loved Autumn',
    musicians: [
      { firstName: 'Aurora', lastName: 'Hase' }
    ]
  },
  {
    name: 'Playin Sound',
    musicians: [
      { firstName: 'Trenton', lastName: 'Lesley' },
      { firstName: 'Camila', lastName: 'Nenci' }
    ]
  },
  {
    name: 'The King River',
    musicians: [
      { firstName: 'Rosemarie', lastName: 'Affini' },
      { firstName: 'Victoria', lastName: 'Cremonesi' }
    ]
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for(let i=0; i<bandMusicians.length; i++){
      const band = await Band.findOne({where: {name: bandMusicians[i].name}})

      const musicians = bandMusicians[i].musicians

      const musiciansInstances = []

      for(let j=0; j<musicians.length; j++){
        const musician = await Musician.create({
          firstName: musicians[j].firstName,
          lastName: musicians[j].lastName,
          bandId: band.id
        })  
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
    for(let i=0; i<bandMusicians.length; i++){

      const musicians = bandMusicians[i].musicians

      for(let j=0; j<musicians.length; j++){
        const musician = await Musician.findOne({where: {firstName: musicians[j].firstName, lastName: musicians[j].lastName}})

        if(musician){
          musician.destroy()

        }
      }
    }
    
  }
};
