import config from './config';
import RestServer from './services/RestServer';
import DatabaseManager from './database/manager/DatabaseManager';
import SampleValidator from './api/validators/SampleValidator';
import SampleRepository from './database/repositories/SampleRepository';
import SampleController from './api/controllers/SampleController';
import SampleRoutes from './api/routes/SampleRoutes';

import IocContainer from './services/IocContainer';
const iocContainer = new IocContainer();

iocContainer.service('DatabaseManager', c => DatabaseManager.getInstance(
    {
        ip: config.MONGOD_IP,
        port: config.MONGOD_PORT,
        dbName: config.MONGOD_DB,
    }
));

iocContainer.service('SampleValidator', c => new SampleValidator());
iocContainer.service('SampleRepository', c => new SampleRepository(c.DatabaseManager));
iocContainer.service('SampleController', c => new SampleController(c.SampleRepository, c.SampleValidator));
iocContainer.service('SampleRoutes', c => new SampleRoutes(c.SampleController));
iocContainer.service('RestServer', c => new RestServer(config.SERVER_PORT, config.SERVER_HOST, c.SampleRoutes));

iocContainer.get('DatabaseManager').connect();
iocContainer.get('RestServer').start();
