import {validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import DBMessageResponse from '../../interfaces/DBMessageResponse';
import {Animal} from '../../interfaces/Animal';
import animalModel from '../models/animalModel';

const animalListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animals = await animalModel.find().populate({
      path: 'species',
      populate: {path: 'category'},
    });
    if (!animals) {
      next(new CustomError('No animals found', 404));
      return;
    }
    res.json(animals);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const animalGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const animal = await animalModel.findById(req.params.id).populate({
      path: 'species',
      populate: {path: 'category'},
    });
    if (!animal) {
      next(new CustomError('No animal found', 404));
      return;
    }
    res.json(animal);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const animalPost = async (
  req: Request<{}, {}, Animal>,
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

    const animal = await animalModel.create(req.body);
    await animal.populate({
      path: 'species',
      populate: {path: 'category'},
    });
    const output: DBMessageResponse = {
      message: 'Animal created',
      data: animal,
    };
    res.json(output);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const animalPut = async (
  req: Request<{id: string}, {}, Animal>,
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

    const animal = await animalModel
      .findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate({
        path: 'species',
        populate: {path: 'category'},
      });
    if (!animal) {
      next(new CustomError('No animal found', 404));
      return;
    }
    const output: DBMessageResponse = {
      message: 'Animal updated',
      data: animal,
    };
    res.json(output);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const animalDelete = async (
  req: Request<{id: string}>,
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

    const animal = await animalModel.findByIdAndDelete(req.params.id).populate({
      path: 'species',
      populate: {path: 'category'},
    });
    if (!animal) {
      next(new CustomError('No animal found', 404));
      return;
    }
    const output: DBMessageResponse = {
      message: 'Animal deleted',
      data: animal,
    };
    res.json(output);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {animalListGet, animalGet, animalPost, animalPut, animalDelete};
