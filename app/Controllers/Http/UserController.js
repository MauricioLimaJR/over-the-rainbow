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

  /**
   * Update user attributes
   * @param {Object} request - ?firstname, ?lastname, ?email, ?password
   */
  async update({ request }) {
    const data = request.only(['firstname', 'lastname', 'email', 'password'])
    const { id } = request.all()

    try {
      const user = await User.find(id)

      // if (data.email) {
      //   const emailInUse = await User.findBy('email', data.email)
      //   if (emailInUse && emailInUse.id !== id)
      //     throw new Error('email is already used')
      // }

      // Verify each valid user property and update it
      Object.keys(data).forEach(prop => {
        if (data[prop] && user[prop] !== data[prop]) {
          user[prop] = data[prop]
        }
      })

      await user.save()
      return true
    } catch (err) {
      return err
    }
  }
}

module.exports = UserController
