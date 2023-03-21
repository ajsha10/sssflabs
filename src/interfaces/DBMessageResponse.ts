import {Animal} from './Animal';
import {Category} from './Category';
import {Species} from './Species';

export default interface MessageResponse {
  message: string;
  data: Category | Category[] | Species | Species[] | Animal | Animal[];
}
