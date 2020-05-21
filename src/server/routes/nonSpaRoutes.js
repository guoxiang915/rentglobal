import express from 'express';

import landlordController from '../controllers/landlord';

const nonSpaRouter = express.Router();

nonSpaRouter.get('/offices/:officeId/*', landlordController.getOfficePage);
nonSpaRouter.get('/landlord/offices/:officeId/*', landlordController.getOfficePage);

export default nonSpaRouter;
