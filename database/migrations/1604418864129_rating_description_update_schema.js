'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RatingDescriptionUpdateSchema extends Schema {
  up () {
    this.alter('ratings', (table) => {
      table.string('description').alter().nullable()
    })
  }

  down () {
    this.alter('ratings', (table) => {
      table.string('description').alter().notNullable()
    })
  }
}

module.exports = RatingDescriptionUpdateSchema
