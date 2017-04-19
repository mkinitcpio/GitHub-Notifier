import { Component } from '@angular/core';

import { Repository } from '../models/repository';
import { GitHubUser } from '../models/github-user';

@Component({
    selector: 'main',
    templateUrl: './main.html',
    styles: [
        require('./main.css').toString()
    ]
})
export class MainComponent {

    public repo: Repository;

    constructor() {
        
    }
}