'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User')
const Hash = use('Hash')
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const user = await User.query()
        .select(['_id', 'email', 'username', 'role'])
        .orderBy('updated_at', 'desc')
        .fetch()

      return response.status(200).json({ status: true, users: user })
    } catch (err) {
      return response.status(401).json({ status: false, message: err })
    }
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const {
        firstname,
        lastname,
        email,
        username,
        password,
        role
      } = await request.all()
      const user = await User.create({
        firstname,
        lastname,
        email,
        username,
        password,
        role
      })
      return response
        .status(200)
        .json({ status: true, message: 'Successfully registered', user })
    } catch (err) {
      return response.status(400).json({ status: false, message: err })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ user, response }) {
    try {
      return response.status(200).json({
        status: true,
        user: { email: user.email, username: user.username, role: user.role }
      })
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ user, response, request }) {
    try {
      const {
        firname,
        lastname,
        email,
        username,
        role,
        password
      } = await request.all()
      if (firstname) {
        user.firstname = firstname
      }
      if (lastname) {
        user.lastname = lastname
      }
      if (email) {
        user.email = email
      }
      if (username) {
        user.username = username
      }
      if (role) {
        user.role = role
      }
      if (password) {
        user.password = await Hash.make(password)
      }
      await user.save()
      return response
        .status(200)
        .json({ status: false, message: 'Successfully updated user' })
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = UserController
