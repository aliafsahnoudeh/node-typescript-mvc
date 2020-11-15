interface IRepository<T> {
    getAll: () => T[];
    getById: (id: object) => T;
    insert: (newEntry: T) => any;
    update: (id: object, modifiedEntry: T) => any;
    deleteById: (id: object) => any;
}

export default IRepository;
