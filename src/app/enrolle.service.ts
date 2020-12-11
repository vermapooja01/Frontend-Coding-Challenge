import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class EnrolleService {
    constructor(private httpclient: HttpClient) { }

    getEnrolleList(): Observable<any> {
        return this.httpclient.get(environment.enrolleurl + "/enrollees");
    }
    getEnrolle(enrolleData: any): Observable<any> {
        return this.httpclient.get(environment.enrolleurl + "/enrollees/" + enrolleData.id);
    }
    updateEnrolle(enrolleData: any): Observable<any> {
        return this.httpclient.put(environment.enrolleurl + "/enrollees/" + enrolleData.id, enrolleData);
    }
}