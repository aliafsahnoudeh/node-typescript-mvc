import { expect } from 'chai';
import 'mocha';

import DatabaseManager from '../../src/database/manager/DatabaseManager';
import SampleRepository from '../../src/database/repositories/SampleRepository';
import SampleDbModel from '../../src/database/dbModels/SampleDbModel';

const databaseManager = DatabaseManager.getInstance({
    ip: '127.0.0.1',
    port: '27017',
    dbName: 'test_node-typescript-mvc',
});

describe('Database', () => {
    it('sample insert', async () => {
        await databaseManager.connect();

        const sampleRepository = new SampleRepository(databaseManager);
        await sampleRepository.insert(new SampleDbModel(
            undefined,
            'test_slug',
            1603955806,
            undefined,
            undefined
        ));
        const result = await sampleRepository.getBySlug('test_slug');
        databaseManager.database.collection('sample').drop();
        databaseManager.disconnect();
      expect(result.length).equal(1);
    });
});
