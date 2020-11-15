class ValidationError extends Error {
    public invalidFields: any;

    constructor(invalidFields: any) {
        super();
        this.name = 'ValidationError';
        this.invalidFields = invalidFields;
    }
}

export default ValidationError;
