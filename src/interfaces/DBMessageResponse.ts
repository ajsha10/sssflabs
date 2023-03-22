import {Animal} from './Animal';
import {Category} from './Category';
import {Species, SpeciesOutput} from './Species';

export default interface MessageResponse {
  message: string;
  data:
    | Category
    | Category[]
    | Species
    | Species[]
    | Animal
    | Animal[]
    | SpeciesOutput;
}
