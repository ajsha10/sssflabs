// TODO: route for categories

import {Router} from 'express';
import {
  categoryGet,
  categoryListGet,
  categoryPost,
  categoryPut,
  categoryDelete,
} from '../controllers/categoryController';

const router = Router();

router.route('/').get(categoryListGet).post(categoryPost);

router.route('/:id').get(categoryGet).put(categoryPut).delete(categoryDelete);

export default router;
