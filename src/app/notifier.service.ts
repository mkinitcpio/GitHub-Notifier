import { Injectable } from '@angular/core';
import { Repository } from "./models/repository";

@Injectable()
export class NotifierService {

    constructor() { }

    public notify(): void {
        let title: string = "New commit!";
        let body: Object = {
            body: `You have unread commit!`
        }
        
        let myNotification = new Notification(title, body);
    }
}