import {Model as BaseModel} from 'vue-api-query'
import general from '@/config/general.js';
import {format} from 'date-fns';
import i18n from '@/config/i18n.js';

export default class Model extends BaseModel {
    constructor(...args) {
        super(...args);
        if (this.created_at != null) {
            this.created_at = new Date(this.updated_at);
        }

        if (this.updated_at != null) {
            this.updated_at = new Date(this.updated_at);
        }
    }

    get createdAt() {
        return format(this.created_at, 'dd.MM.yyyy HH:mm');
    }

    get updatedAt() {
        return format(this.updated_at, 'dd.MM.yyyy HH:mm');
    }

    get baseStorageUrl(){
        return `${general.baseURL}/storage`;
    }

    baseURL() {
        return general.baseURL + '/api/' + i18n.global.locale.value;
    }

    // Implement a default request method
    request(config) {
        return this.$http.request(config)
    }
}