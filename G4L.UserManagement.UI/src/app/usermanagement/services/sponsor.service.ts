import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class SponsorService {
    
        constructor(private http: HttpClient) { }
    
        getAllSponsors(): Observable<any> {
            return this.http.get(`${environment.apiUrl}/sponsor`);
        }
    
        getSponsorById(id: any): Observable<any> {
            return this.http.get(`${environment.apiUrl}/sponsor/${id}`);
        }
    
        addSponsor(path: string, body: any): Observable<any> {
            return this.http.post(`${environment.apiUrl}/sponsor`, body);
        }
    
        updateSponsor(path: string, body: any) {
            return this.http.put(`${environment.apiUrl}/sponsor`, body);
        }
    
        deleteSponsor(id: any) {
            return this.http.delete(`${environment.apiUrl}/sponsor?id=${id}`);
        }
    }