import { expect } from 'chai';
import 'mocha';
import axios from 'axios';

import DatabaseManager from '../../src/database/manager/DatabaseManager';
import SampleRepository from '../../src/database/repositories/SampleRepository';
import SampleDbModel from '../../src/database/dbModels/SampleDbModel';
import RestServer from '../../src/services/RestServer';

// TODO keep test's statics

const databaseManager = DatabaseManager.getInstance({
    ip: '127.0.0.1',
    port: '27017',
    dbName: 'test_node-typescript-mvc',
});

const restServer = new RestServer(4000, '127.0.0.1');

describe('API', () => {
    it('sample getByDate', async () => {
        await databaseManager.connect();
        restServer.start();

        const sampleRepository = new SampleRepository(databaseManager);
        await sampleRepository.insert(new SampleDbModel(
            undefined,
            'slug_test',
            1603955806,
            undefined,
            undefined
        ));
        const response = await axios.get('http://127.0.0.1:4000/api/sample/test');
        databaseManager.database.collection('sample').drop();
        databaseManager.disconnect();
        expect(response.data.length).equal(1);
    });
});
