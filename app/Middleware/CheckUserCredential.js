'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const Hash = use('Hash')
class CheckUserCredential {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    const { username, password } = await ctx.request.all()
    const user = await User.findBy('username', username)

    if (user) {
      if (await Hash.verify(password, user.password)) {
        ctx.user = user
        await next()
      }
      return ctx.response
        .status(400)
        .json({ status: false, message: 'Incorrect password' })
    }
    return ctx.response
      .status(404)
      .json({ status: false, message: 'User not exist' })
    // call next to advance the request
  }
}

module.exports = CheckUserCredential
