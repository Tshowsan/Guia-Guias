import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'https://backguia.herokuapp.com/api/';
  
  constructor() { }
}