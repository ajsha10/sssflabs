// TODO: route for species
import {Router} from 'express';
import {
  speciesListget,
  speciesPost,
  speciesGet,
  speciesPut,
  speciesDelete,
  speciesByAreaGet,
} from '../controllers/speciesController';

const router = Router();

router.route('/').get(speciesListget).post(speciesPost);

router.route('/:id').get(speciesGet).put(speciesPut).delete(speciesDelete);

router.route('/location').get(speciesByAreaGet);

export default router;
