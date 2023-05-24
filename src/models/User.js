import Model from './Model'

export default class User extends Model {
    get fullName() {
        return this.first_name + ' ' + this.surname;
    }

    resource() {
        return 'users'
    }
}