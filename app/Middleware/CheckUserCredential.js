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
    return ctx.response.json({ status: true, user: ctx.auth.user._id })
    await next()
    // call next to advance the request
  }
}

module.exports = CheckUserCredential
