import ISampleRepository from './ISampleRepository';
import ISampleDbModel from '../dbModels/ISampleDbModel';
import IDatabaseManager from '../manager/IDatabaseManager';

const COLLECTION_NAME = 'sample';

class SampleRepository implements ISampleRepository {

    public getById: (id: object) => ISampleDbModel;
    public update: (id: object, modifiedEntry: ISampleDbModel) => any;
    public deleteById: (id: object) => any;
    private _databaseManager: IDatabaseManager;

    constructor(databaseManager: IDatabaseManager) {
        this._databaseManager = databaseManager;
    }

    public async getBySlug(slug: string): Promise<ISampleDbModel[]> {
        return await this._databaseManager.database
        .collection(COLLECTION_NAME).find(
            { slug: {$regex : `.*${slug}.*`} }
        ).toArray();
    }

    public getAll(): ISampleDbModel[] {
        return [];
    }

    public async insert(newEntry: ISampleDbModel): Promise<any> {
        return await this._databaseManager.database
        .collection(COLLECTION_NAME).insertOne(newEntry);
    }
}

export default SampleRepository;
