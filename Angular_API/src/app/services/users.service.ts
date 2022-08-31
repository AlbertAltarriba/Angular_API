import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL:string = "https://peticiones.online/api/users";
  constructor(private httpClient: HttpClient) { }

  getAll(id:number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseURL}?page=${id}`))
  }

  getById(id:number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseURL}/${id}`))
  }

  create(user:User): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json",
      })
    }
    return lastValueFrom(this.httpClient.post<User>(this.baseURL, user, httpOptions))
  }

  update(user:User): Promise<any>{
    return lastValueFrom(this.httpClient.put<User>(`${this.baseURL}/${user.id}`, user))
  }

  delete(id:number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseURL}/${id}`))
  }
}
