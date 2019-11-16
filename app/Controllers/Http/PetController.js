'use strict'

const Pet = use('App/Models/Pet')
const User = use('App/Models/User')

class PetController {
  async index({ request, response }) {
    try {
      const pet = await Pet.query()
        //.select(['_id', 'name', 'type', 'breed', 'size', 'owner'])
        .setHidden('created_at', 'updated_at')
        .orderBy('updated_at', 'desc')
        .paginate(1, 10)

      return response
        .status(200)
        .json({ status: true, pets: pet.rows, page: pet.pages })
    } catch (err) {
      return response.status(401).json({ status: false, message: err })
    }
  }
  async store({ request, response, auth, user }) {
    try {
      const { name, type, breed, size, owner } = await request.all()
      // const userRole = auth.user.role
      //return response.json(user)
      const pet = new Pet()
      pet.name = name
      pet.type = type
      pet.breed = breed
      pet.size = size
      if (user.role == 'Manager' || 'Employee') {
        // let userOwner = await User.findBy('_id', owner._id)
        pet.owner = owner
      } else {
        pet.owner = user._id
      }
      //return response.json(pet)

      await pet.save()
      return response
        .status(200)
        .json({ status: true, message: 'Successfully registered', pet })
    } catch (err) {
      return response.status(501).json({ status: false, message: err })
    }
  }
  async show({ pet, response }) {
    try {
      const user = await pet.pet().fetch()
      return response.status(200).json({
        status: true,
        pet: pet
      })
    } catch (err) {
      return response.status(500).json({ status: false, message: err })
    }
  }
  async update({ pet, request, response }) {
    try {
      const { name, type, breed, size } = request.all()
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
      //return response.json('teest')
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
