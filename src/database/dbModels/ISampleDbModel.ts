import IBaseModel from './IBaseModel';

interface ISampleDbModel extends IBaseModel {
    Slug: string;
    Timestamp: number;
}

export default ISampleDbModel;
