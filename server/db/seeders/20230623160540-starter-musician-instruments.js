'use strict';

const { Musician, Instrument} = require('../models');

const musicianInstruments = [
  {
    musician: { firstName: 'Adam', lastName: 'Appleby' },
    instruments: [{ type: 'piano' }, { type: 'guitar' }]
  },
  {
    musician: { firstName: 'Anton', lastName: 'Martinovic' },
    instruments: [{ type: 'piano' }, { type: 'bass' }]
  },
  {
    musician: { firstName: 'Wilson', lastName: 'Holt' },
    instruments: [{ type: 'cello' }]
  },
  {
    musician: { firstName: 'Marine', lastName: 'Sweet' },
    instruments: [{ type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Georgette', lastName: 'Kubo' },
    instruments: [{ type: 'drums' }, { type: 'trumpet' }, { type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Aurora', lastName: 'Hase' },
    instruments: [{ type: 'violin' }, { type: 'cello' }]
  },
  {
    musician: { firstName: 'Trenton', lastName: 'Lesley' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Camila', lastName: 'Nenci' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Rosemarie', lastName: 'Affini' },
    instruments: [{ type: 'piano' }, { type: 'violin' }]
  },
  {
    musician: { firstName: 'Victoria', lastName: 'Cremonesi' },
    instruments: [{ type: 'violin' }]
  },
];

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

    for(let i=0; i<musicianInstruments.length; i++){
      const musician = musicianInstruments[i].musician
      const instruments = musicianInstruments[i].instruments

      const musicianInstance = await Musician.findOne({
        where: {firstName: musician.firstName, lastName: musician.lastName}
      })

      const instrumentArray = []

      for(let j=0; j<instruments.length; j++){
        const instrumentInstance = await Instrument.findOne({
          where: {type: instruments[j].type}
        })

        await instrumentInstance.addMusicians([musicianInstance])

        instrumentArray.push(instrumentInstance)
      }

      await musicianInstance.addInstruments(instrumentArray)
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    for(let i=0; i<musicianInstruments.length; i++){
      const musician = musicianInstruments[i].musician
      const instruments = musicianInstruments[i].instruments

      const musicianInstance = await Musician.findOne({
        where: {firstName: musician.firstName, lastName: musician.lastName}
      })

      const instrumentArray = []

      for(let j=0; j<instruments.length; j++){
        const instrumentInstance = await Instrument.findOne({
          where: {type: instruments[j].type}
        })

        await instrumentInstance.removeMusician(musicianInstance)

        instrumentArray.push(instrumentInstance)
      }

      await musicianInstance.removeInstruments(instrumentArray)
    }
  }
};
