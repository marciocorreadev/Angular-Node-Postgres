import { ItemPreco } from './ItemPreco';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PrecificacaoItensService {
  private readonly API = `${environment.API}${environment.BASE_URL}`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(this.API).pipe();
  }

  loadByID(id) {
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  private create(price) {
    return this.http.post(this.API, price).pipe(take(1));
  }

  private update(price) {
    return this.http.put(`${this.API}/${price.id}`, price).pipe(take(1));
  }

  save(price) {
    if (price.id) {
      return this.update(price);
    }
    return this.create(price);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
