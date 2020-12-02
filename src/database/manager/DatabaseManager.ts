import util from 'util';
const format = util.format;
import mongo from 'mongodb';
import IDatabaseManager from './IDatabaseManager';
import ILogger from 'services/ILogger';

class DataBaseManager implements IDatabaseManager {

    public get database(): any {
        return this._database;
    }

    public get connected(): boolean {
        return this._connected;
    }

    public static getInstance(config: any, logger: ILogger): DataBaseManager {
        if (!DataBaseManager.instance) {
            DataBaseManager.instance = new DataBaseManager(config, logger);
        }

        return DataBaseManager.instance;
    }
    private static instance: DataBaseManager;

    private _client: any;
    private _database: any;
    private _connected: boolean;
    private readonly _ip: string;
    private readonly _port: number;
    private readonly _dbName: string;
    private readonly _logger;

    private constructor(config: any, logger: ILogger) {
        this._ip = config.ip;
        this._port = config.port;
        this._dbName = config.dbName;
        this._logger = logger;
    }

    public async connect(): Promise<void> {
        try {
            const mongodIP = encodeURIComponent(this._ip);
            const mongodPort = encodeURIComponent(
                this._port
            );

            const mongoDbName = this._dbName;

            const mongoServerUrl = format(
                'mongodb://%s:%s/%s',
                mongodIP,
                mongodPort,
                mongoDbName
            );

            this._client = await mongo.connect(
                mongoServerUrl,
                {
                    useNewUrlParser: true,
                    reconnectTries: 7200,
                    reconnectInterval: 1000,
                });
            this._database = this._client.db(mongoDbName);
            this._connected = true;
            this._logger.info(`database is connected`);
        } catch (error) {
            this._logger.error(error);
            this._connected = false;
            this._client = undefined;
            this._database = undefined;
        }
    }

    public disconnect(): void {
        try {
            if (this._client) {
                this._client.close();
                this.resetFields();
                this._logger.info('disconnected from database');
            }
        } catch (error) {
            this._logger.error(error);
        }
    }

    private resetFields(): void {
        this._connected = false;
        this._client = undefined;
        this._database = undefined;
    }
}

export default DataBaseManager;
