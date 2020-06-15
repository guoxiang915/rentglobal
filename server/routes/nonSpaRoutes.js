const express = require('express');
const landlordController = require('../controllers/landlord');

const nonSpaRouter = express.Router();

nonSpaRouter.get('/offices/:refId/*', landlordController.getOfficePageByRefCode);
nonSpaRouter.get('/landlord/offices/:officeId/*', landlordController.getOfficePageById);

module.exports = nonSpaRouter;
