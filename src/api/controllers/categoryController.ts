// TODO: Controller for the Category model
// 1. Create function to get all categories
// 2. Create function to get a category by id
// 3. Create function to create a category
// 4. Create function to update a category
// 5. Create function to delete a category

import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import CustomError from '../../classes/CustomError';
import {Category} from '../../interfaces/Category';
import categoryModel from '../models/categoryModel';
import DBMessageResponse from '../../interfaces/DBMessageResponse';

const categoryListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryModel.find().select('-__v');
    if (!categories) {
      next(new CustomError('No categories found', 404));
      return;
    }
    res.json(categories);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const categoryGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const category = await categoryModel.findById(req.params.id).select('-__v');
    if (!category) {
      next(new CustomError('No category found', 404));
      return;
    }
    res.json(category);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const categoryPost = async (
  req: Request<{}, {}, Category>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const category = await categoryModel.create(req.body);
    const output: DBMessageResponse = {
      message: 'Category created',
      data: category,
    };
    res.json(output);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const categoryPut = async (
  req: Request<{id: string}, {}, Category>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const category = await categoryModel
      .findByIdAndUpdate(req.params.id, req.body, {new: true})
      .select('-__v');
    if (!category) {
      next(new CustomError('No category found', 404));
      return;
    }
    const output: DBMessageResponse = {
      message: 'Category updated',
      data: category,
    };
    res.json(output);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const categoryDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const category = await categoryModel
      .findByIdAndDelete(req.params.id)
      .select('-__v');
    if (!category) {
      next(new CustomError('No category found', 404));
      return;
    }
    const output: DBMessageResponse = {
      message: 'Category deleted',
      data: category,
    };
    res.json(output);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {
  categoryListGet,
  categoryGet,
  categoryPost,
  categoryPut,
  categoryDelete,
};
