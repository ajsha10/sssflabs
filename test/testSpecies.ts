/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import {SpeciesTest} from '../src/interfaces/Species';
import DBMessageResponse from '../src/interfaces/DBMessageResponse';

// TODO: Add tests for the following:
// 1. Get all species
// 2. Get species by id
// 3. Post species
// 4. Put species
// 5. Delete species
// 6. Get all species from bounding box

const getAllSpecies = async (
  url: string | Function
): Promise<SpeciesTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/species')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const species: SpeciesTest[] = response.body;
          species.forEach((specie) => {
            expect(specie._id).not.toBe('');
            expect(specie.species_name).not.toBe('');
            expect(specie.category._id).not.toBe('');
            expect(specie.category.category_name).not.toBe('');
            expect(specie.image).not.toBe('');
            expect(specie.location.type).toBe('Point');
            expect(specie.location.coordinates).not.toBe([]);
          });
          resolve(species);
        }
      });
  });
};
