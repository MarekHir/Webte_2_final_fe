import Model from './Model'
import User from "@/models/User";

export default class Instruction extends Model {

    get forTypeKey() {
        return `instructions.for_user_type.${this.for_user_type}`;
    }
    relations() {
        return {
            created_by: User
        };
    }

    resource() {
        return 'instructions'
    }
}