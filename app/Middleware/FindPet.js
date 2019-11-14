'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pet = use('App/Models/Pet')
class FindPet {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    // call next to advance the request
    const pet = await Pet.find(ctx.params.id)
    if (!user) {
      return ctx.response
        .status(404)
        .json({ status: false, message: 'Pet not found' })
    }
    ctx.pet = pet
    await next()
  }
}

module.exports = FindPet
