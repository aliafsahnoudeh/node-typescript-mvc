interface IRepository<T> {
    getAll: (skip: number, limit: number) => Promise<T[]>;
    getById: (id: object) => T;
    insert: (newEntry: T) => any;
    update: (id: object, modifiedEntry: T) => any;
    deleteById: (id: object) => any;
}

export default IRepository;
