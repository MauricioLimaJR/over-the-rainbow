'use strict'

const User = use('App/Models/User')

class UserController {
  async create({ request }) {
    const data = request.only(['firstname', 'lastname', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async read({ auth, response }) {
    try {
      return await User.find(auth.user.id)
    } catch (err) {
      return response.send({ error: err.message })
    }
  }

  /**
   * Update user attributes
   * @param {Object} request - ?firstname, ?lastname, ?email, ?password
   */
  async update({ request, response }) {
    const data = request.only(['firstname', 'lastname', 'email', 'password'])
    const { id } = request.all()

    try {
      const user = await User.find(id)

      // Verify each valid user property and update it
      Object.keys(data).forEach(prop => {
        if (data[prop] && user[prop] !== data[prop]) {
          user[prop] = data[prop]
        }
      })

      await user.save()
      return true
    } catch (err) {
      if (err.code === '23505')
        return response.status(500).send({ message: 'email ja em uso' })
      return response.status(500).send(err)
    }
  }
}

module.exports = UserController
