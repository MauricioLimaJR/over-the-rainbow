'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Rating = use('App/Models/Rating')

/**
 * Resourceful controller for interacting with ratings
 */
class RatingController {
  /**
   * List all ratings for some place.
   * GET ratings/?place_id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    try {
      const { place_id } = request.all()

      const ratings = Rating
        .query()
        .where('place_id', place_id)
        .fetch()

      return ratings
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Create/save a new rating.
   * POST ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['place_id', 'score', 'description'])
      const user_id = auth.user.id

      const rating = await Rating.create({ ...data, user_id })

      return rating
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Delete a rating with id.
   * DELETE ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      const { id } = params

      const rating = await Rating.find(id)

      await rating.delete()
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }
}

module.exports = RatingController
