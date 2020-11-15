import config from './config';
import RestServer from './services/RestServer';
import DatabaseManager from './database/manager/DatabaseManager';

const databaseManager = DatabaseManager.getInstance(
    {
        ip: config.MONGOD_IP,
        port: config.MONGOD_PORT,
        dbName: config.MONGOD_DB,
    }
);

const restServer = new RestServer(config.SERVER_PORT, config.SERVER_HOST);

databaseManager.connect();
restServer.start();
