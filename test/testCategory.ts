/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import {Category} from '../src/interfaces/Category';
import DBMessageResponse from '../src/interfaces/DBMessageResponse';
// TODO: Add tests for the following:
// 1. Get all categories
// 2. Get category by id
// 3. Post category
// 4. Put category
// 5. Delete category

const getCategories = (url: string | Function): Promise<Category[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/categories')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const categories: Category[] = response.body;
          categories.forEach((category) => {
            expect(category._id).not.toBe('');
            expect(category.category_name).not.toBe('');
          });
          resolve(categories);
        }
      });
  });
};

const getCategory = (url: string | Function, id: string): Promise<Category> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/categories/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const category: Category = response.body;
          expect(category._id).not.toBe('');
          expect(category.category_name).not.toBe('');
          resolve(category);
        }
      });
  });
};

const postCategory = (
  url: string | Function,
  category_name: string
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/categories')
      .send({category_name})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          const data = message.data as Category;
          expect(message.message).not.toBe('');
          expect(data._id).not.toBe('');
          expect(data.category_name).toBe(category_name);
          resolve(message);
        }
      });
  });
};

const putCategory = (
  url: string | Function,
  id: string,
  category_name: string
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/v1/categories/${id}`)
      .send({category_name})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          const data = message.data as Category;
          expect(message.message).not.toBe('');
          expect(data._id).not.toBe('');
          expect(data.category_name).toBe(category_name);
          resolve(message);
        }
      });
  });
};

const deleteCategory = (
  url: string | Function,
  id: string
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/categories/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          const data = message.data as Category;
          expect(message.message).not.toBe('');
          expect(data._id).not.toBe('');
          expect(data.category_name).not.toBe('');
          resolve(message);
        }
      });
  });
};

export {getCategories, getCategory, postCategory, putCategory};
