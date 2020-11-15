import ISampleDbModel from '../dbModels/ISampleDbModel';
import IRepository from './IRepository';

interface ISampleRepository extends IRepository<ISampleDbModel> {
    getBySlug: (slug: string) => Promise<ISampleDbModel[]>;
}

export default ISampleRepository;
