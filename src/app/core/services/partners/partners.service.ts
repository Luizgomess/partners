import { Injectable } from '@angular/core';
import { Partner } from '../../interfaces/partner.interface';
import { BehaviorSubject, Observable, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private partnersCache: any[] | null = null;
  private readonly apiUrl = 'https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners';
  private partnersCacheSubject = new BehaviorSubject<Partner[] | null>(null);
  private filteredPartnerSubject = new BehaviorSubject<string | null>(null);

  partners$ = this.filteredPartnerSubject.asObservable().pipe(
    switchMap(id => {
      if (id) {
        return this.getPartnerById(id);
      } else {
        return this.partnersCacheSubject.asObservable().pipe(
          switchMap(cache => {
            if (cache) {
              return of(cache);
            } else {
              return this.http.get<Partner[]>(this.apiUrl).pipe(
                tap(partners => this.partnersCacheSubject.next(partners))
              );
            }
          })
        );
      }
    }),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  getPartners(): Observable<Partner[]> {
    return this.partners$;
  }

  private getPartnerById(id: string): Observable<Partner[]> {
    return this.http.get<Partner>(`${this.apiUrl}/${id}`).pipe(
      map(partner => [partner])
    )
  }

  createPartner(parner: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, parner).pipe(
      tap(() => this.loadPartners())
    );
  }

  setFilter(id: string | null): void {
    this.filteredPartnerSubject.next(id);
  }

  deletePartner(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadPartners())
    );
  }

  updatePartner(id: string, partner: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, partner).pipe(
      tap(() => this.loadPartners())
    );
  }

  refreshPartners(): void {
    this.loadPartners();
  }

  private loadPartners(): void {
    this.partnersCacheSubject.next(null);
  }
}
