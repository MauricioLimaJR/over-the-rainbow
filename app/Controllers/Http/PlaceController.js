'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Place = use('App/Models/Place')

/**
 * Resourceful controller for interacting with places
 */
class PlaceController {
  /**
   * List places near a location.
   * GET places/?latitude&longitude&distance
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    try {
      const { latitude, longitude, distance } = request.all()

      const places = Place
        .query()
        .nearBy(latitude, longitude, distance)
        .fetch()

      return places
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Create/save a new place.
   * POST places
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['title', 'address', 'latitude', 'longitude'])
      const user_id = auth.user.id

      const checkCoordinates = await Place
        .query()
        .where('latitude', data.latitude)
        .where('longitude', data.longitude)
        .fetch()

      if (checkCoordinates.toJSON().length > 0)
        throw new Error('Place is already saved')

      const place = await Place.create({ ...data, user_id })

      return place
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Display a single place.
   * GET places/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    try {
      const { id } = params

      const place = await Place.find(id)
      await place.load('ratings')

      return place
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Update place details.
   * PUT or PATCH places/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const { title, description } = request.all()
      const { id } = params

      const place = await Place.find(id)
      if ( title) place.title = title
      if (description) place.description = description
      await place.save()

      return place
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Delete a place with id.
   * DELETE places/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      const { id } = params

      const place = await Place.find(id)

      await place.delete()
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }
}

module.exports = PlaceController
