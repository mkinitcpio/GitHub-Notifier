import { Component } from '@angular/core';

import { GitGubNotifier } from '../models/github-notifier';
import { Repository } from '../models/repository';
import { Router } from '@angular/router';
import { Commit } from "../models/commit";
import { Application } from "../models/applictation";

@Component({
    selector: 'main',
    templateUrl: './main.html',
    styles: [
        require('./main.css').toString()
    ]
})
export class MainComponent {

    constructor() {}


}