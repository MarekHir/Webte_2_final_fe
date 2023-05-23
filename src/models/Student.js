import Model from './Model'

export default class Student extends Model {
  get fullName() {
    return this.first_name + ' ' + this.surname;
  }

  resource() {
    return 'students'
  }
}