import { Component } from '@angular/core';

import { Repository } from '../models/repository';
import { User } from '../models/user';

@Component({
    selector: 'app-main',
    templateUrl: './main.html',
    styles: [
        require('./main.css').toString()
    ]
})
export class MainComponent {

    public repo: Repository;

    constructor() {
        this.repo = Repository.parse({
            fullname: "mkinitcpio/GitGub-Notifier",
            commits: [],
            description: "Test description",
            owner: User.parse({
                name: "mkinitcpio",
                accountUrl: "t.com",
                avatarUrl: "img.jpg",
                email: "test@gmail.com"
            })
        });
    }
}