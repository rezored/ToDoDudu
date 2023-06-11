import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Group } from '../models/groups';

@Injectable({
    providedIn: 'root'
})
export class MockServiceService {
    baseurl = 'http://localhost:3000';
    constructor(
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.GetIssues();
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    // POST
    CreateBug(data: Group): Observable<Group> {
        return this.http
            .post<Group>(
                this.baseurl + '/bugtracking/',
                JSON.stringify(data),
                this.httpOptions
            )
            .pipe(retry(1), catchError(this.errorHandl));
    }
    // GET
    GetIssue(id: string): Observable<Group> {
        return this.http
            .get<Group>(this.baseurl + '/bugtracking/' + id)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    // GET
    GetIssues(): Observable<Group> {
        return this.http
            .get<Group>(this.baseurl + '/bugtracking')
            .pipe(retry(1), catchError(this.errorHandl));
    }


    // Error handling
    errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}
