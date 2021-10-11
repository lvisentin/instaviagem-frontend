import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Place } from '../types/places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private readonly API_URL = environment.API_URL;

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getPlaces(): Observable<any> {
    return this.httpClient
      .get(`${this.API_URL}/instaviagem-challenge`)
      .pipe(catchError((err) => err));
  }

}
