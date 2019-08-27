var express = require('express');
var router = express.Router();


const positionController = require('../controllers/position')
const authMiddleware = require('../middlewares/auth')
const fileMiddleware =require('../middlewares/fileupload')

router.get('/list',authMiddleware.auth,positionController.list)
router.post('/save',authMiddleware.auth, fileMiddleware,positionController.save)
router.post('/findone',authMiddleware.auth,positionController.findone)
router.patch('/patch',authMiddleware.auth,fileMiddleware,positionController.patch)
router.delete('/delete',authMiddleware.auth,positionController.delete)
router.post('/search',authMiddleware.auth,positionController.search)


module.exports = router