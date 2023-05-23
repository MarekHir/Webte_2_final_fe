import Model from "@/models/Model";
import ExercisesList from "@/models/ExercisesList";

export default class ExercisesListSection extends Model {

    get maxPoints() {
        return this.exercises_lists?.points;
    }

    get canBeSolved() {
        return this.exercises_lists?.canBeSolved;
    }

    get initiation() {
        return this.exercises_lists?.initiation;
    }

    get deadline() {
        return this.exercises_lists?.deadline;
    }
    relations() {
        return {
            exercises_lists: ExercisesList,
        }
    }
    resource() {
        return 'exercise-lists-sections'
    }
}