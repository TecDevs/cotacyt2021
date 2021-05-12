import { AreaInterface } from './area.model';
import { CategoryInterface } from './category.model';
import { ModalityInterface } from './modality.model';
import { CampusInterface } from './campus.model';
export interface ResponseInterface {
    error: boolean;
    status: number;
    data: AreaInterface | CategoryInterface | ModalityInterface | CampusInterface | any;
}
