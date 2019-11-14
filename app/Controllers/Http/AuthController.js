'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
class AuthController {
  async login({ request, response, auth }) {
    try {
      const { email, password } = await request.all()

      let user = await User.findBy('email', email)
      if (user) {
        if (await Hash.verify(password, user.password)) {
          const token = await auth.attempt(email, password)

          return response.status(200).json({
            status: true,
            message: 'Successfully login',
            user: {
              id: user._id,
              email: user.email,
              username: user.username,
              role: user.role
            },
            token: token.token
          })
        }
        return response
          .status(400)
          .json({ status: false, message: 'Incorrect password' })
      }
      return response
        .status(404)
        .json({ status: false, message: 'User not exist' })

      // const token = await auth.generate(user)
      // return response
      //   .status(200)
      //   .json({ status: false, message: 'Successfully login' })
    } catch (err) {
      return response.status(400).json({ status: false, message: err })
    }
  }
}

module.exports = AuthController
