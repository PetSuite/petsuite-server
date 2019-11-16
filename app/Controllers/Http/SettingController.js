'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with settings
 */
const Setting = use('App/Models/Setting')
class SettingController {
  async index({ request, response, view }) {}
  async store({ request, response, auth }) {
    try {
      const role = auth.user.role
      if (role == 'Manager') {
        const { capacity, daily_fee } = await request.all()
        await Setting.create({ capacity, daily_fee })
        return response
          .status(200)
          .json({ status: true, message: 'Successfully set Setting' })
      } else {
        return response
          .status(400)
          .json({ status: false, message: 'You are not Authorized' })
      }
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }
  async update({ user, request, response }) {
    try {
      if (role == 'Manager') {
        const { capacity, daily_fee } = await request.all()
        await Setting.create({ capacity, daily_fee })
        return response
          .status(200)
          .json({ status: true, message: 'Successfully set Setting' })
      } else {
        return response
          .status(400)
          .json({ status: false, message: 'You are not Authorized' })
      }
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }
}

module.exports = SettingController
