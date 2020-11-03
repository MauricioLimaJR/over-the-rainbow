'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Place extends Model {
  static scopeNearBy (
    query,
    latitude=-8.064558,
    longitude=-34.873905,
    distance=2
  ) {
    const haversine = `(6371 * acos(cos(radians(${latitude}))
      * cos(radians(latitude))
      * cos(radians(longitude)
      - radians(${longitude}))
      + sin(radians(${latitude}))
      * sin(radians(latitude))))`

    return query
      .select('*', Database.raw(`${haversine} as distance`))
      .whereRaw(`${haversine} < ${distance}`)
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  ratings () {
    return this.hasMany('App/Models/Rating')
  }
}

module.exports = Place
