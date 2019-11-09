'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.group(() => {
  Route.post('login', 'AuthController.login')
}).prefix('api')

Route.group(() => {
  Route.resource('users', 'UserController')
    .validator(new Map([[['store'], ['User']]]))
    .middleware(
      new Map([
        [['show', 'destroy', 'update'], ['findUser', 'auth:jwt']],
        [['index'], ['auth:jwt']]
      ])
    )
}).prefix('api')

Route.group(() => {
  Route.resource('pets', 'PetController')
})
