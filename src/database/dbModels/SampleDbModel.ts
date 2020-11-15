import ISampleDbModel from './ISampleDbModel';

class SampleDbModel implements ISampleDbModel {
    public readonly persistedAt: number;
    public readonly updatedAt: number;
    private slug: string;
    private timestamp: number;
    private _id: any;

    constructor(_id: object,
                slug: string,
                timestamp: number,
                persistedAt: number,
                updatedAt: number) {
        if (_id) { this._id = _id; }
        this.slug = slug;
        this.timestamp = timestamp;
        this.persistedAt = persistedAt;
        this.updatedAt = updatedAt;
    }

    public get Slug(): string {
        return this.slug;
    }

    public get Timestamp(): number {
        return this.timestamp;
    }

    public get id(): object {
        return this._id;
    }
}

export default SampleDbModel;
