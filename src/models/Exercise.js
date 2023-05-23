import Model from './Model'
import ExercisesListSection from "@/models/ExercisesListSection";

export default class Exercise extends Model {

    get name() {
        return this.exercises_lists_sections?.exercises_lists?.name + ' - ' + this.exercises_lists_sections?.section_title;
    }

    get tastDescription() {
        return this.exercises_lists_sections?.exercises_lists?.description;
    }

    get task() {
        return this.exercises_lists_sections?.task;
    }

    get listId() {
        return this.exercises_lists_sections?.exercises_lists?.id;
    }

    get task_picture() {
        let picture_name = this.exercises_lists_sections?.picture_name;
        if(picture_name == null) return null;
        return `${this.baseStorageUrl}/exercises/${this.listId}/${picture_name}`;
    }

    get startDate() {
        return this.exercises_lists_sections?.initiation?.toLocaleString();
    }

    get endDate() {
        return this.exercises_lists_sections?.deadline?.toLocaleString();
    }

    get maxPoints() {
        return this.exercises_lists_sections?.maxPoints;
    }

    get canBeSolved() {
        return this.solved === false && this.exercises_lists_sections?.canBeSolved;
    }

    relations() {
        return {
            exercises_lists_sections: ExercisesListSection,
        }
    }

    resource() {
        return 'exercises'
    }
}