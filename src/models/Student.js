import Exercise from "@/models/Exercise";
import User from "@/models/User";

export default class Student extends User {
    exercises() {
        return this.hasMany(Exercise);
    }

    resource() {
        return 'students'
    }
}