const express = require('express');
const router = express.Router();
const fundingController = require('../Service/fundingService.js');

router.get('/', (req, res, next) => {
	console.log(' default endpoint - fundingController');
});


router.post('/create', fundingController.createFunding);



router.get('/viewList', fundingController.viewListFunding);


router.get('/view', fundingController.viewFunding);


	
router.post('/update', fundingController.updateFunding);



router.post('/delete', fundingController.deleteFunding);



router.post('/participate', fundingController.participateFunding);

module.exports = router;