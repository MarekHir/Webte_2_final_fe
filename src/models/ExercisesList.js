import Model from '@/models/Model';
import ExercisesListSection from "@/models/ExercisesListSection";
import Student from "@/models/Student";
import {format} from "date-fns";


export default class ExercisesList extends Model {
    exercises_lists_sections() {
        return this.hasMany(ExercisesListSection);
    }

    get canBeSolved() {
        return (this.initiation == null || this.initiation <= new Date()) &&
            (this.deadline == null || this.deadline >= new Date())
    }

    get createdBy() {
        return this.created_by.fullName;
    }

    get initiationDate() {
        return this.initiation ? format(this.initiation, 'dd.MM.yyyy HH:mm') : null;
    }

    get deadlineDate() {
        return this.deadline ? format(this.deadline, 'dd.MM.yyyy HH:mm') : null;
    }

    constructor(...args) {
        super(...args);

        if (this.initiation != null)
            this.initiation = new Date(this.initiation);
        if (this.deadline != null)
            this.deadline = new Date(this.deadline);
    }

    relations() {
        return {
            exercises_lists_sections: ExercisesListSection,
            created_by: Student,
        }
    }

    resource() {
        return 'exercises-list';
    }
}