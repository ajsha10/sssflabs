import {Point} from 'geojson';
/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import {Species, SpeciesOutput, SpeciesTest} from '../src/interfaces/Species';
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
            expect(specie.category!._id).not.toBe('');
            expect(specie.category!.category_name).not.toBe('');
            expect(specie.image).not.toBe('');
            expect(specie.location!.type).toBe('Point');
            expect(specie.location!.coordinates).not.toBe([]);
          });
          resolve(species);
        }
      });
  });
};

const getSpecies = async (
  url: string | Function,
  id: string
): Promise<SpeciesTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/species/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const specie: SpeciesTest = response.body;
          expect(specie._id).not.toBe('');
          expect(specie.species_name).not.toBe('');
          expect(specie.category!._id).not.toBe('');
          expect(specie.category!.category_name).not.toBe('');
          expect(specie.image).not.toBe('');
          expect(specie.location!.type).toBe('Point');
          expect(specie.location!.coordinates).not.toBe([]);
          resolve(specie);
        }
      });
  });
};

const postSpecies = async (
  url: string | Function,
  species_name: string,
  category: string,
  location: Point
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/species')
      .send({species_name, category, location})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          const data = message.data as SpeciesOutput;
          expect(message.message).not.toBe('');
          expect(data.species_name).toBe(species_name);
          expect(data.category._id).toBe(category);
          resolve(message);
        }
      });
  });
};

const putSpecies = async (
  url: string | Function,
  id: string,
  species_name: string
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/v1/species/${id}`)
      .send({species_name})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          const data = message.data as Species;
          expect(message.message).not.toBe('');
          expect(data.species_name).toBe(species_name);
          resolve(message);
        }
      });
  });
};

const deleteSpecies = async (
  url: string | Function,
  id: string
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/species/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          const data = message.data as Species;
          expect(message.message).not.toBe('');
          expect(data._id).toBe(id);
          resolve(message);
        }
      });
  });
};

const getSpeciesFromArea = async (
  url: string | Function,
  area: {
    topRight: string;
    bottomLeft: string;
  }
): Promise<SpeciesTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(
        `/api/v1/species/location?topRight=${area.topRight}&bottomLeft=${area.bottomLeft}`
      )
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const species: SpeciesTest[] = response.body;
          species.forEach((specie) => {
            expect(specie._id).not.toBe('');
            expect(specie.species_name).not.toBe('');
            expect(specie.category!._id).not.toBe('');
            expect(specie.category!.category_name).not.toBe('');
            expect(specie.image).not.toBe('');
            expect(specie.location!.type).toBe('Point');
            expect(specie.location!.coordinates).not.toBe([]);
          });
          resolve(species);
        }
      });
  });
};

export {
  getAllSpecies,
  getSpecies,
  postSpecies,
  putSpecies,
  deleteSpecies,
  getSpeciesFromArea,
};
