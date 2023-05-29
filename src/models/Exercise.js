import Model from './Model'
import ExercisesListSection from "@/models/ExercisesListSection";
import ExercisesList from "@/models/ExercisesList";
import Student from "@/models/Student";

export default class Exercise extends Model {

    get name() {
        return this.exercises_lists?.name + ' - ' + this.exercises_lists_sections?.section_title;
    }

    get listName() {
        return this.exercises_lists?.name;
    }

    get section() {
        return this.exercises_lists_sections?.section_title;
    }

    get tastDescription() {
        return this.exercises_lists?.description;
    }

    get task() {
        return this.exercises_lists_sections?.task;
    }

    get listId() {
        return this.exercises_lists?.id;
    }

    get task_picture() {
        let picture_name = this.exercises_lists_sections?.picture_name;
        if (picture_name == null) return null;
        return `${this.baseStorageUrl}/exercises/${this.listId}/${picture_name}`;
    }

    get startDate() {
        return this.exercises_lists?.initiationDate;
    }

    get endDate() {
        return this.exercises_lists?.deadlineDate;
    }

    get maxPoints() {
        return this.exercises_lists?.points;
    }

    get canBeSolved() {
        return this.solved === false && this.exercises_lists?.canBeSolved;
    }

    get createdBy() {
        return this.created_by?.fullName;
    }

    relations() {
        return {
            created_by: Student,
            exercises_lists: ExercisesList,
            exercises_lists_sections: ExercisesListSection,
        }
    }

    resource() {
        return 'exercises'
    }
}