import util from 'util';
const format = util.format;
import mongo from 'mongodb';
import IDatabaseManager from './IDatabaseManager';

class DataBaseManager implements IDatabaseManager {

    public get database(): any {
        return this._database;
    }

    public get connected(): boolean {
        return this._connected;
    }

    public static getInstance(config: any): DataBaseManager {
        if (!DataBaseManager.instance) {
            DataBaseManager.instance = new DataBaseManager(config);
        }

        return DataBaseManager.instance;
    }
    private static instance: DataBaseManager;

    private _client: any;
    private _database: any;
    private _connected: boolean;
    private _ip: string;
    private _port: number;
    private _dbName: string;

    private constructor(config: any) {
        this._ip = config.ip;
        this._port = config.port;
        this._dbName = config.dbName;
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
            console.log(`database is connected`);
        } catch (error) {
            console.error(error);
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
                console.log('disconnected from database');
            }
        } catch (error) {
            console.error(error);
        }
    }

    private resetFields(): void {
        this._connected = false;
        this._client = undefined;
        this._database = undefined;
    }
}

export default DataBaseManager;
