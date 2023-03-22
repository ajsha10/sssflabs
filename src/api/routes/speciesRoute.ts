// TODO: route for species
import {Router} from 'express';
import {getWikiImage} from '../../middlewares';
import {
  speciesListget,
  speciesPost,
  speciesGet,
  speciesPut,
  speciesDelete,
  speciesByAreaGet,
} from '../controllers/speciesController';

const router = Router();

router.route('/').get(speciesListget).post(getWikiImage, speciesPost);

router.route('/location').get(speciesByAreaGet);

router.route('/:id').get(speciesGet).put(speciesPut).delete(speciesDelete);

export default router;
