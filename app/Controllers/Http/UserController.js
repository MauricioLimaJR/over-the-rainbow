'use strict'

const User = use('App/Models/User')

class UserController {
  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['firstname', 'lastname', 'email', 'password'])

      const user = await User.create(data)

      return user
    } catch (err) {
      if (err.code === '23505')
        return response.status(500).send({ error: 'email already in use' })
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ auth, response }) {
    try {
      const user = await User.find(auth.user.id)

      return user
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request - ?firstname, ?lastname, ?email, ?password
   * @param {Response} ctx.response
   */
  async update({ auth, request, response }) {
    try {
      const data = request.only(['firstname', 'lastname', 'email', 'password'])

      const user = await User.find(auth.user.id)
      user.merge(data)
      await user.save()

      return true
    } catch (err) {
      if (err.code === '23505')
        return response.status(500).send({ error: 'email already in use' })
      return response.status(500).send({ error: err.message })
    }
  }
}

module.exports = UserController
