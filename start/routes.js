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
  return { greeting: 'Welcome to Over the Rainbow!' }
})

// User routes
Route.post('/users', 'UserController.store')
Route.get('/users', 'UserController.show').middleware('auth')
Route.put('/users', 'UserController.update').middleware('auth')

// Session routes
Route.post('/sessions', 'SessionController.create')

// Place routes
Route.resource('places', 'PlaceController')
  .apiOnly()
  .middleware('auth')

// Rating routes
Route.resource('ratings', 'RatingController')
  .apiOnly()
  .middleware('auth')
