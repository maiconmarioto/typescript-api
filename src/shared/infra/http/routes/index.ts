import { Router } from 'express';

import users from '@modules/users/http/routes/user.routes';

const router = Router();

router.use('/users', users);

export default router;
