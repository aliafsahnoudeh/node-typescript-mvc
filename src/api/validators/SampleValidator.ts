import IValidator from './IValidator';
import ValidationError from './ValidationError';

class SampleValidator implements IValidator<any> {
    public validate(slug: any): any {
        // more validation
        if (!slug) {
            throw new ValidationError({
                title: 'slug required',
            });
        }

        if (slug.length < 4) {
            throw new ValidationError({
                title: 'slug illigal length',
            });
        }
    }
}

export default SampleValidator;
