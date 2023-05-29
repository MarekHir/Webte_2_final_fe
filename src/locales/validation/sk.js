export default {
    required: ({linked, named}) =>  `${linked(named('path'))} je povinné`,
    notType: ({linked, named}) => `${linked(named('path'))} nie je platný typ ${named('type')}`,
    string: {
        min: ({linked, named}) => `${linked(named('path'))} musí obsahovať aspoň ${named('min')} znakov`,
        max: ({linked, named}) => `${linked(named('path'))} nemôže obsahovať viac ako ${named('max')} znakov`,
        email: ({linked, named}) => `${linked(named('path'))} musí byť platná emailová adresa`,
        minLowercase: ({linked, named}) => `${linked(named('path'))} musí obsahovať aspoň ${named('min')} malé písmená`,
        minUppercase: ({linked, named}) => `${linked(named('path'))} musí obsahovať aspoň ${named('min')} veľké písmená`,
        minNumbers: ({linked, named}) => `${linked(named('path'))} musí obsahovať aspoň ${named('min')} čísla`,
        minSymbols: ({linked, named}) => `${linked(named('path'))} musí obsahovať aspoň ${named('min')} symboly`,
    },
    number: {
        min: ({linked, named}) => `${linked(named('path'))} musí byť aspoň ${named('min')}`,
        max: ({linked, named}) => `${linked(named('path'))} nemôže byť väčší ako ${named('max')}`,
    },
    array: {
        length: ({linked, named}) => `${linked(named('path'))} musí obsahovať presne ${named('length')} položiek`,
    }
}