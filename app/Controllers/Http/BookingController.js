'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bookings
 */
const Booking = use('App/Models/Booking')
const User = use('App/Models/User')
const Pet = use('App/Models/Pet')
const Setting = use('App/Models/Setting')
class BookingController {
  async index({ request, response, auth }) {
    try {
      //const role = auth.user.role
      if (role == 'Maneger' || 'Employee') {
        const book = await Booking.all()
        return response.status(200).json({ status: false, book })
      }
      erro
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }
  async store({ request, response, auth, user }) {
    try {
      const {
        owner,
        pet,
        start_date,
        end_date,
        note,
        status
      } = await request.all()
      const book = new Booking()
      //const userRole = auth.user.role
      if (user.role == ('Manager' || 'Employee')) {
        book.owner = owner
        book.status = status
      }
      if (user.role == 'Pet Owner') {
        book.owner = {
          user_id: user._id
        }
        book.status = 'Booked'
      }
      const setting = await Setting.all()
      return response.json(setting)
      book.dailyFee = setting.dailyFee
      book.totalFee = book.pet = pet
      book.start_date = start_date
      book.end_date = end_date
      book.note = note

      await book.save()
      return response
        .status(200)
        .json({ status: true, message: 'Successfully book user' })
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }
  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = BookingController
