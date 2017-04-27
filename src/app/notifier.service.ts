import { Injectable } from '@angular/core';
import { Repository } from "./models/repository";

@Injectable()
export class NotifierService {

    constructor() { }

    public notify(repository: Repository): void {
        let title: string = "New commit!";
        let body: Object = {
            body: `New commit in ${repository.name}.`
        }
        
        let myNotification = new Notification(title, body);
    }
}