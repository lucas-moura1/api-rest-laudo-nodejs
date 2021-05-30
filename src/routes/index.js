import express from 'express'
import { SampleController } from '../controllers/sampleController'
import { UserController } from '../controllers/userController'
import { UserAuthenticationController } from '../controllers/authenticationController'
import { auth } from '../middlewares/auth'

const route = express.Router()

const sampleController = new SampleController()
const userController = new UserController()
const userAuthenticationController = new UserAuthenticationController()

route.get('/', (req, res) => {
    res.json({ status: 'UP' })
})

route.get('/auth', userAuthenticationController.authentication)

route.post('/amostra', auth, sampleController.createSample)
route.get('/amostra', auth, sampleController.getAllSamples)
route.get('/amostra/:id', auth, sampleController.getSampleById)
route.delete('/amostra/:id', auth, sampleController.deleteSampleById)

route.post('/usuario', auth, userController.createUser)
route.get('/usuario', auth, userController.getAllUsers)
route.get('/usuario/:id', auth, userController.getUserById)
route.put('/usuario/:id', auth, userController.updateUser)
route.delete('/usuario/:id', auth, userController.deleteUserById)

export { route }
