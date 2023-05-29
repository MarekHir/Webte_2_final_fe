export default {
    required: ({linked, named}) =>  `${linked(named('path'))} is required`,
    notType: ({linked, named}) => `${linked(named('path'))} is not a valid ${named('type')} type`,
    string: {
        min: ({linked, named}) => `${linked(named('path'))} must be at least ${named('min')} characters`,
        max: ({linked, named}) => `${linked(named('path'))} may not be greater than ${named('max')} characters`,
        email: ({linked, named}) => `${linked(named('path'))} must be a valid email`,
        minLowercase: ({linked, named}) => `${linked(named('path'))} must contain at least ${named('min')} lowercase characters`,
        minUppercase: ({linked, named}) => `${linked(named('path'))} must contain at least ${named('min')} uppercase characters`,
        minNumbers: ({linked, named}) => `${linked(named('path'))} must contain at least ${named('min')} numbers`,
        minSymbols: ({linked, named}) => `${linked(named('path'))} must contain at least ${named('min')} symbols`,
    },
    number: {
        min: ({linked, named}) => `${linked(named('path'))} must be at least ${named('min')}`,
        max: ({linked, named}) => `${linked(named('path'))} may not be greater than ${named('max')}`,
    },
    array: {
        length: ({linked, named}) => `${linked(named('path'))} must contain exactly ${named('length')} items`,
    }
}