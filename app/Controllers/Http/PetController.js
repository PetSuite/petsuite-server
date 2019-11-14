'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pets
 */
const Pet = use('App/Models/Pet')
class PetController {
  async index({ request, response, view }) {
    try {
      const pet = await Pet.query()
        .select([
          '_id',
          'name',
          'type',
          'breed',
          'size',
          'weight',
          'color',
          'status'
        ])
        .orderBy('updated_at', 'desc')
        .fetch()

      return response.status(200).json({ status: true, users: user })
    } catch (err) {
      return response.status(401).json({ status: false, message: err })
    }
  }
  async store({ request, response, auth }) {
    try {
      const { name, type, breed, size, status, owner } = await request.all()

      const pet = await Pet.create({
        name,
        type,
        breed,
        size,
        owner = auth.user.email
      })
      return response
        .status(200)
        .json({ status: true, message: 'Successfully registered' })
    } catch {
      return response.status(501).json({ status: false, message: err })
    }
  }
  async show({ pet, response }) {
    try {
      return response.status(200).json({
        status: true,
        pet: pet
      })
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }
  s
  async update({ pet, request, response }) {
    try {
      const { name, type, breed, size, weight, color } = request.all()
      if (name) {
        pet.name = name
      }
      if (type) {
        pet.type = type
      }
      if (breed) {
        pet.breed = breed
      }
      if (size) {
        pet.size = breed
      }
      if (weight) {
        pet.weight = weight
      }
      if (color) {
        pet.color = color
      }
      await pet.save()
      return response
        .status(200)
        .json({ status: true, message: 'Successfylly update pet' })
    } catch (err) {
      return response.status(501).json({ status: false, message: err })
    }
  }
  async destroy({ pet, request, response }) {
    try {
      await pet.delete()
      return response
        .status(200)
        .json({ status: true, message: 'Successfully remove pet' })
    } catch (err) {
      return response.status(501).json({ status: false, message: err })
    }
  }
}

module.exports = PetController
