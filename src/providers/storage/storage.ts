import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { Events } from 'ionic-angular';

@Injectable()
export class StorageProvider {

    constructor(public storage: Storage, private events: Events) {

    }

    async getRA() {
        let ra = await this.storage.get('ra');
        this.events.publish('storage:ra', ra);
    }

    setRA(ra: string) {
        this.storage.set('ra', ra);
        this.events.publish('storage:ra', ra);
    }

    async getStep() {
        let step = await this.storage.get('step');
        if (!step) {
            this.setStep('login');
            return;
        }
        this.events.publish('storage:step', step);
    }

    setStep(step: string) {
        if (step != 'login' && step != 'siga' && step != 'tabs') {
            throw ('Step inválido');
        }

        this.storage.set('step', step);
        this.events.publish('storage:step', step);
    }

    async getSiga() {
        let siga = await this.storage.get('siga');
        this.events.publish('storage:siga', siga);
    }

    setSiga(siga: string) {
        this.storage.set('siga', siga);
        this.events.publish('storage:siga', siga);
    }

    clear() {
        this.storage.remove('siga');
    }



}
