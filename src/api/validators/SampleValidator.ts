import ILogger from 'services/ILogger';
import IValidator from './IValidator';
import ValidationError from './ValidationError';

class SampleValidator implements IValidator<any> {
    private readonly _logger: ILogger;

    constructor(logger: ILogger) {
        this._logger = logger;
    }

    public validate(slug: any): any {
        // more validation
        if (!slug) {
            this._logger.warn('slug required');
            throw new ValidationError({
                title: 'slug required',
            });
        }

        if (slug.length < 4) {
            this._logger.warn('slug illigal length');
            throw new ValidationError({
                title: 'slug illigal length',
            });
        }
    }
}

export default SampleValidator;
