interface IValidator<T> {
    validate: (input: T) => any;
}

export default IValidator;
