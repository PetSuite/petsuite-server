'use strict'
const User = use('App/Models/User')
const Pet = use('App/Models/Pet')
class SearchController {
  async search({ request, response }) {
    const { id, email, name, role, status } = await request.all()
    const user = await User.query()
      .select()
      .fetch()
    return response
      .status(200)
      .json({ status: true, message: 'Users Found', users: user })
  }
  async searchUser({ request, response }) {
    const { id, email, name, role, status } = await request.all()
    const user = await User.where(function() {
      this.where('_id', id)
      this.orWhere('email', email)
    })
      .setHidden(['password'])
      .fetch()
    return response
      .status(200)
      .json({ status: true, message: 'Users Found', users: user })
  }
}

module.exports = SearchController
