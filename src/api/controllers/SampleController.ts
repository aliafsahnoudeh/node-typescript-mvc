import ISampleRepository from '../../database/repositories/ISampleRepository';
import SampleDbModel from '../../database/dbModels/SampleDbModel';
import ISampleController from './ISampleController';
import HttpStatus from 'http-status-codes';
import IValidator from '../../api/validators/IValidator';
import ValidationError from '../../api/validators/ValidationError';

class SampleController implements ISampleController {
    private readonly _repository: ISampleRepository;
    private readonly _validator: IValidator<any>;

    constructor(repository: ISampleRepository,
                validator: IValidator<any>) {
        this._repository = repository;
        this._validator = validator;
    }

    public async getAll(req: any, res: any): Promise<void> {
        try {
            const query = { ...req.query };
            const skip = parseInt(query.skip,  10);
            const limit = parseInt(query.limit, 10);

            const samples = await
                this._repository.getAll(skip, limit);

            res.status(HttpStatus.OK).json(samples);
        } catch (error) {
            // TODO better error handling with middlewares
            if (error instanceof ValidationError) {
                return res.status(HttpStatus.BAD_REQUEST).json(error);
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            }
        }
    }

    public async getBySlug(req: any, res: any): Promise<void> {
        try {
            const params = { ...req.params };
            this._validator.validate(params);

            const samples = await
                this._repository.getBySlug(params.slug);

            res.status(HttpStatus.OK).json(samples);
        } catch (error) {
            // TODO better error handling with middlewares
            if (error instanceof ValidationError) {
                return res.status(HttpStatus.BAD_REQUEST).json(error);
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            }
        }
    }

    public async create(req: any, res: any): Promise<void> {
        try {
            const params = { ...req.body };

            const result = await
                this._repository.insert(new SampleDbModel(
                    undefined,
                    params.slug,
                    undefined,
                    undefined,
                    undefined
                ));

            res.status(HttpStatus.OK).json(result.insertedId);
        } catch (error) {
            // TODO better error handling with middlewares
            if (error instanceof ValidationError) {
                return res.status(HttpStatus.BAD_REQUEST).json(error);
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            }
        }
    }
}

export default SampleController;
