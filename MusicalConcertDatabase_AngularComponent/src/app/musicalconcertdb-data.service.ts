import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Concert } from './musicalconcertdb.component';

@Injectable({
  providedIn: 'root'
})
export class MusicalconcertdbDataService {

  constructor(private http: HttpClient) { }
  
  private apiBaseUrl = 'http://localhost:3000/api/';
  
  public getConcerts(): Promise<Concert[]> {
		const url: string = `${this.apiBaseUrl}concerts`; 
		return this.http 
		.get(url) 
		.toPromise() 
		.then(response => response as Concert[]) 
		.catch(this.handleError); 
  }
  
  private handleError(error: any): Promise<any> { 
	return Promise.reject(error.message || error); 
  }

}
