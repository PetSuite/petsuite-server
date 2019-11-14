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
class BookingController {
  async index({ request, response, view }) {}
  async store({ request, response }) {}
  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = BookingController
