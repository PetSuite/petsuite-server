'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User')
const Hash = use('Hash')
const Database = use('Database')
class UserController {
  async index({ request, response, auth }) {
    try {
      const { page } = await request.all()
      const user = await User.query()
        .setHidden(['password', 'created_at'])
        .orderBy('updated_at', 'desc')
        .paginate(page, 10)
      return response.status(200).json({
        status: true,
        users: user.rows,
        page: user.pages
      })
    } catch (err) {
      return response.status(401).json({ status: false, message: err })
    }
  }

  async store({ request, response, auth }) {
    try {
      const { firstname, lastname, email, password, role } = await request.all()

      if (auth.user.role == 'Employee') {
        if (role == 'Manager') {
          return response.status(400).json({
            status: false,
            message: 'You are not authorize to add Manager account'
          })
        }
      }
      if (auth.user.role == 'Pet Owner') {
        if (role == 'Manager' || role == 'Employee') {
          return response.status(400).json({
            status: false,
            message: 'You are not athorized to add Manager or Employee account'
          })
        }
      }
      const user = await User.create({
        firstname,
        lastname,
        email,
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

  async show({ user, response, auth }) {
    try {
      // return response.json(auth.user._id)
      return response.status(200).json({
        status: true,
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role
        }
      })
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }

  async update({ user, response, request }) {
    try {
      const { firstname, lastname, email, role, password } = await request.all()

      if (firstname) {
        user.firstname = firstname
      }
      if (lastname) {
        user.lastname = lastname
      }
      if (email) {
        user.email = email
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
        .json({ status: true, message: 'Successfully updated user' })
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }

  async destroy({ user, request, response }) {
    try {
      await user.delete()
      return response
        .status(200)
        .json({ status: true, message: 'Successfully delete user' })
    } catch (err) {
      return response.status(500).json({ status: false })
    }
  }

  async owner({ request, response }) {
    try {
      const { key } = await request.all()
      //return response.json(owner)

      const list = await User.query()
        .select('email')
        .where({
          $or: [
            { email: new RegExp(key, 'ig') },
            { firstname: new RegExp(key, 'ig') },
            { lastname: new RegExp(key, 'ig') }
          ]
        })
        .fetch()

      // return response.json('test')
      return response.status(200).json({ status: true, owners: list.rows })
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }
}

module.exports = UserController
