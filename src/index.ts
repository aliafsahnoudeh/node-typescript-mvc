import config from './config';
import RestServer from './services/RestServer';
import Logger from './services/Logger';
import DatabaseManager from './database/manager/DatabaseManager';
import SampleValidator from './api/validators/SampleValidator';
import SampleRepository from './database/repositories/SampleRepository';
import SampleController from './api/controllers/SampleController';
import SampleRoutes from './api/routes/SampleRoutes';

import IocContainer from './services/IocContainer';
const iocContainer = new IocContainer();

iocContainer.service('Logger', c => new Logger());

iocContainer.service('DatabaseManager', c => DatabaseManager.getInstance(
    {
        ip: config.MONGOD_IP,
        port: config.MONGOD_PORT,
        dbName: config.MONGOD_DB,
    },
    c.Logger
));

iocContainer.service('SampleValidator', c => new SampleValidator(c.Logger));
iocContainer.service('SampleRepository', c => new SampleRepository(c.DatabaseManager, c.Logger));
iocContainer.service('SampleController', c => new SampleController(c.SampleRepository, c.SampleValidator, c.Logger));
iocContainer.service('SampleRoutes', c => new SampleRoutes(c.SampleController, c.Logger));
iocContainer.service('RestServer', c => new RestServer(config.SERVER_PORT, config.SERVER_HOST, c.SampleRoutes, c.Logger));

iocContainer.get('DatabaseManager').connect();
iocContainer.get('RestServer').start();
