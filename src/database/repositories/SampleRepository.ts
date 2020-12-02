import ISampleRepository from './ISampleRepository';
import ISampleDbModel from '../dbModels/ISampleDbModel';
import IDatabaseManager from '../manager/IDatabaseManager';
import ILogger from 'services/ILogger';

const COLLECTION_NAME = 'sample';

class SampleRepository implements ISampleRepository {

    public getById: (id: object) => ISampleDbModel;
    public update: (id: object, modifiedEntry: ISampleDbModel) => any;
    public deleteById: (id: object) => any;
    private _databaseManager: IDatabaseManager;
    private readonly _logger: ILogger;

    constructor(databaseManager: IDatabaseManager, logger: ILogger) {
        this._databaseManager = databaseManager;
        this._logger = logger;
    }

    public async getBySlug(slug: string): Promise<ISampleDbModel[]> {
        this._logger.info('SampleRepository getBySlug');
        return await this._databaseManager.database
        .collection(COLLECTION_NAME).find(
            { slug: {$regex : `.*${slug}.*`} }
        ).toArray();
    }

    public async getAll(skip: number, limit: number): Promise<ISampleDbModel[]> {
        this._logger.info('SampleRepository getAll');
        return await this._databaseManager.database
        .collection(COLLECTION_NAME).find().skip(skip).limit(limit).toArray();
    }

    public async insert(newEntry: ISampleDbModel): Promise<any> {
        this._logger.info('SampleRepository insert');
        return await this._databaseManager.database
        .collection(COLLECTION_NAME).insertOne(newEntry);
    }
}

export default SampleRepository;
