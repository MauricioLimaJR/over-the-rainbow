'use strict'

const User = use('App/Models/User')

class SessionController {
  async create ({ request, response, auth }) {
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)

      const user = await User.findBy('email', email)

      return response.json({ user, token })
    } catch (error) {
      return response.json({ message: 'You first need to register!!'})
    }
  }
}

module.exports = SessionController
