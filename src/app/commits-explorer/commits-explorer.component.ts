import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'commits-explorer',
    templateUrl: 'commits-explorer.html'
})

export class CommitsExplorerComponent implements OnInit {

    @Input()
    repositoryFullName: string;

    constructor() { }

    ngOnInit() { }
}