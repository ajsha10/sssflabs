import {Point} from 'geojson';
import {Document, Types} from 'mongoose';
import {Category} from './Category';

interface Species extends Document {
  species_name: string;
  category: Types.ObjectId;
  image: string;
  location: Point;
}

interface SpeciesOutput {
  species_name: string;
  category: Types.ObjectId;
}

interface SpeciesTest {
  _id: string;
  species_name: string;
  category: Category;
  image: string;
  location: Point;
}

export {Species, SpeciesOutput, SpeciesTest};
