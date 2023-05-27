import Model from './Model'

export default class User extends Model {
    get fullName() {
        return this.first_name + ' ' + this.surname;
    }

    get roleKey() {
        return `user.role.${this.role}`;
    }

    resource() {
        return 'users'
    }
}