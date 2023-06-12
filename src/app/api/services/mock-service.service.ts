import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Group } from '../models/groups';

@Injectable({
    providedIn: 'root'
})
export class MockService {
    baseurl = 'http://localhost:3000';

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.GetIssues();
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    // POST
    CreateGroup(data: Group): Observable<Group> {
        return this.http
            .post<Group>(
                this.baseurl + '/groups/',
                JSON.stringify(data),
                this.httpOptions
            )
            .pipe(retry(1), catchError(this.errorHandl));
    }
    // GET
    GetIssue(id: string): Observable<Group> {
        return this.http
            .get<Group>(this.baseurl + '/groups/' + id)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    // GET
    GetIssues(): Observable<Group> {
        return this.http
            .get<Group>(this.baseurl + '/groups')
            .pipe(retry(1), catchError(this.errorHandl));
    }

    // PUT
    UpdateGroup(id: string, data: Group): Observable<Group> {
        return this.http
            .put<Group>(
                this.baseurl + '/groups/' + id,
                JSON.stringify(data),
                this.httpOptions
            )
            .pipe(retry(1), catchError(this.errorHandl));
    }

    // DELETE
    DeleteGroup(id: string) {
        return this.http
            .delete<Group>(this.baseurl + '/groups/' + id, this.httpOptions)
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
