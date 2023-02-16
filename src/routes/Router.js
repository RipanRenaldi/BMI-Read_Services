import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getAllBmi, getBMIById } from '../controller/bmi_r_controller.js';
const router = Router();

router.get('/bmi/', auth, getAllBmi);
router.get(`/bmi/:id`, auth, getBMIById)

export default router;