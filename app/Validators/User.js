'use strict'

class User {
  get rules() {
    return {
      email: 'required|unique:users,email',
      username: 'required|unique:users,username',
      password: 'required|min:8',
      role: 'required',
      firstname: 'required',
      lastname: 'required'
      // validation rules
    }
  }
  async fails(errMsg) {
    return this.ctx.response
      .status(500)
      .json({ status: false, message: errMsg[0].message })
  }

  get messages() {
    return {
      'email.required': 'Email is required',
      'username.required': 'Username is required',
      'password.required': 'Password is required',
      'role.required': 'Role is required',
      'email.unique': 'Email is already exist',
      'username.unique': 'Username is already exist',
      'password.min': 'Password must be atleast 8 char'
    }
  }
}

module.exports = User
