'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
class CheckRole {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    try {
      // return ctx.response.status(200).json('test')

      const user = ctx.auth.user
      //return ctx.response.json(user)

      if (user.role == 'Manager' || 'Employee' || 'Pet Owner') {
        ctx.user = user
        await next()
      } else {
        return ctx.response.status(400).json({
          status: true,
          message: 'You are not Authorized to this page'
        })
      }
      // call next to advance the request
    } catch (err) {
      return ctx.response.status(500).json({ status: false, message: err })
    }
  }
}

module.exports = CheckRole
