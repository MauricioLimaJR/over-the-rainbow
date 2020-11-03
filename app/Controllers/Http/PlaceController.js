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
   * Create/save a new place.
   * POST places
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const { title, address, latitude, longitude } = request.all()
      const user_id = auth.user.id

      const checkCoordinates = await Place
        .query()
        .where('latitude', latitude)
        .where('longitude', longitude)
        .fetch()

      if (checkCoordinates.toJSON().length > 0)
        throw new Error('Place is already saved')

      const place = new Place()
      place.user_id = user_id
      place.title = title
      place.address = address
      place.latitude = latitude
      place.longitude = longitude

      return await place.save()
    } catch (err) {
      console.log(err.message)
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
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
  }

  /**
   * Show a list of places nearby user current location
   * GET places
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async listByUserLocation ({ request, response }) {
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
  }

  /**
   * Delete a place with id.
   * DELETE places/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, request, response }) {
  }
}

module.exports = PlaceController
