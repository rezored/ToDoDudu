import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { GroupDTO } from '../models/group-dto';

@Injectable({
    providedIn: 'root'
})
export class MockService {
    baseurl = 'http://localhost:3000';

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.GetGroups();
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    // POST
    CreateGroup(data: GroupDTO): Observable<GroupDTO> {
        return this.http
            .post<GroupDTO>(
                this.baseurl + '/groups/',
                JSON.stringify(data),
                this.httpOptions
            )
            .pipe(retry(1), catchError(this.errorHandler));
    }
    // GET BY ID
    GetGroup(id: string): Observable<GroupDTO> {
        return this.http
            .get<GroupDTO>(this.baseurl + '/groups/' + id)
            .pipe(retry(1), catchError(this.errorHandler));
    }
    // GET
    GetGroups(): Observable<GroupDTO[]> {
        return this.http
            .get<GroupDTO[]>(this.baseurl + '/groups')
            .pipe(retry(1), catchError(this.errorHandler));
    }

    // PUT
    UpdateGroup(id: string, data: GroupDTO): Observable<GroupDTO> {
        return this.http
            .put<GroupDTO>(
                this.baseurl + '/groups/' + id,
                JSON.stringify(data),
                this.httpOptions
            )
            .pipe(retry(1), catchError(this.errorHandler));
    }

    // DELETE
    DeleteGroup(id: string) {
        return this.http
            .delete<GroupDTO>(this.baseurl + '/groups/' + id, this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandler));
    }

    // Error handling
    errorHandler(outcome: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if (outcome.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = outcome.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${outcome.status}\nMessage: ${outcome.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}
