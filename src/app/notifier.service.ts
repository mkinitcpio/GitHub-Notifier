import { Injectable } from '@angular/core';
import { Repository } from "./models/repository";

@Injectable()
export class NotifierService {

    constructor() { }

    public notify(repositoryName: string): void {
        let title: string = "New commit!";
        let body: Object = {
            body: `New commit in ${repositoryName}.`
        }
        
        let myNotification = new Notification(title, body);
    }
}