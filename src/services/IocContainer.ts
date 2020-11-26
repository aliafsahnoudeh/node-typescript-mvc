class IocContainer {
    private services;

    constructor() {
        this.services = {};
    }

    public service(name: string, cb: any): IocContainer {
        Object.defineProperty(this, name, {
            get: () => {
                if (!this.services.hasOwnProperty(name)) {
                    this.services[name] = cb(this);
                }

                return this.services[name];
            },
            configurable: true,
            enumerable: true,
        });

        return this;
    }

    public get(name: string): any {
        return this[name];
    }
}

export default IocContainer;
