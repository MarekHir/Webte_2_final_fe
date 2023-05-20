import Model from './Model'

export default class Exercise extends Model {

    get name() {
        return this.exercises_lists_sections?.exercises_lists?.name + ' - ' + this.exercises_lists_sections?.section_title;
    }

    resource() {
        return 'exercises'
    }
}