import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResult, IHero } from '../model/heros.model';

@Injectable({
  providedIn: 'root'
})
export class MarvelHerosService {

  constructor(private http: HttpClient) {}

  get(id: string){
    const queryParams = {
      apikey: 'f58792977ff894aa9698d09d56419178',
    }
    return this.http.get<IApiResult<IHero>>(`https://gateway.marvel.com/v1/public/characters/${id}`, {params: queryParams})
  }
  getAll(params = {}){
    const queryParams = {...params, apikey: 'f58792977ff894aa9698d09d56419178'}
    return this.http.get<IApiResult<IHero>>('https://gateway.marvel.com/v1/public/characters', {params: queryParams})
  }
}
