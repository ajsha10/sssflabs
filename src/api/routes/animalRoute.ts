import {Router} from 'express';
import {
  animalListGet,
  animalPost,
  animalGet,
  animalPut,
  animalDelete,
} from '../controllers/animalController';

const router = Router();

router.route('/').get(animalListGet).post(animalPost);

router.route('/:id').get(animalGet).put(animalPut).delete(animalDelete);

export default router;
