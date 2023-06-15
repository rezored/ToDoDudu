import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() { }

    generateRandomString(): string {
        return Math.random().toString(36).substring(5);
    }
}
