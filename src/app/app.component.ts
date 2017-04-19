import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.html',
    styles: [
        require('./app.css').toString()
        ]
})

export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}