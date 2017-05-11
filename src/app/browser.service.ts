import { Injectable } from '@angular/core';

import * as electron from 'electron';
const openURL = electron.remote.require('openurl');

@Injectable()
export class BrowserService {

    constructor() { }

    public openInBrowser(url: string): void{
        openURL.open(url);
    }
}