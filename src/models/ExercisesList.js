import Model from '@/models/Model';
import ExercisesListSection from "@/models/ExercisesListSection";


export default class ExercisesList extends Model {
    exercises_lists_sections() {
        return this.hasMany(ExercisesListSection);
    }

    get canBeSolved() {
        return (this.initiation == null || this.initiation <= new Date()) &&
            (this.deadline == null || this.deadline >= new Date())
    }

    constructor(...args) {
        super(...args);

        if(this.initiation != null)
            this.initiation = new Date(this.initiation);
        if(this.deadline != null)
            this.deadline = new Date(this.deadline);
    }

    resource() {
        return 'exercises-lists';
    }
}