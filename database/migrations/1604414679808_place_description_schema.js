'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlaceDescriptionSchema extends Schema {
  up () {
    this.alter('places', (table) => {
      table.string('description')
    })
  }

  down () {
    this.table('places', (table) => {
      table.dropColumn('description')
    })
  }
}

module.exports = PlaceDescriptionSchema
