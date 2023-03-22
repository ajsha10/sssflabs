import {validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import {Species} from '../../interfaces/Species';
import speciesModel from '../models/speciesModel';
import DBMessageResponse from '../../interfaces/DBMessageResponse';
import rectangleBounds from '../../utils/rectangleBounds';
// TODO: Controller for species model

const speciesListget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const species = await speciesModel.find().populate('category');
    if (!species) {
      next(new CustomError('No species found', 404));
      return;
    }
    res.json(species);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const speciesGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(messages, 400);
    }
    const species = await speciesModel
      .findById(req.params.id)
      .populate('category');
    if (!species) {
      next(new CustomError('No species found', 404));
      return;
    }
    res.json(species);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const speciesPost = async (
  req: Request<{}, {}, Species>,
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

    const species = await speciesModel.create(req.body);
    await species.populate('category');

    const output: DBMessageResponse = {
      message: 'Species created',
      data: {
        _id: species._id,
        species_name: species.species_name,
        category: species.category,
      },
    };

    res.json(output);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const speciesPut = async (
  req: Request<{id: string}, {}, Species>,
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

    const species = await speciesModel
      .findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('category');
    if (!species) {
      next(new CustomError('No species found', 404));
      return;
    }
    const output: DBMessageResponse = {
      message: 'Species updated',
      data: species,
    };
    res.json(output);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const speciesDelete = async (
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

    const species = await speciesModel
      .findByIdAndDelete(req.params.id)
      .populate('category');
    if (!species) {
      next(new CustomError('No species found', 404));
      return;
    }
    const output: DBMessageResponse = {
      message: 'Species deleted',
      data: species,
    };
    res.json(output);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const speciesByAreaGet = async (
  req: Request<{}, {}, {}, {topRight: string; bottomLeft: string}>,
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

    const {topRight, bottomLeft} = req.query;
    const [trLat, trLng] = topRight.split(',');
    const [blLat, blLng] = bottomLeft.split(',');
    const bounds = rectangleBounds(
      {lat: trLat, lng: trLng},
      {lat: blLat, lng: blLng}
    );

    const species = await speciesModel.find({
      location: {
        $geoWithin: {
          $geometry: bounds,
        },
      },
    });
    if (!species) {
      next(new CustomError('No species found', 404));
      return;
    }
    res.json(species);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {
  speciesListget,
  speciesGet,
  speciesPost,
  speciesPut,
  speciesDelete,
  speciesByAreaGet,
};
