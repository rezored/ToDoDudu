import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BoardsService {
    jsonUrl = "assets/mock-data/mock.json";

    constructor(
        private httpClient: HttpClient) {
    }

    getMockData() : Observable<any> {
        return this.httpClient.get<any>(this.jsonUrl);
    }
}
