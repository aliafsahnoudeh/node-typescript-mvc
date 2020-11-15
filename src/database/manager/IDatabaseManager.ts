interface IDatabaseManager {
    connect: () => void;
    disconnect: () => void;
    database: any;
    connected: boolean;
}

export default IDatabaseManager;
