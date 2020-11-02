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
      await auth.check()
      return await auth.getUser()
    } catch (error) {
      return response.send('You are not logged in')
    }
  }
}

module.exports = UserController
