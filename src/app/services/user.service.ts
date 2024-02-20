import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    new User('Omer Kalif', 'omer@gmail.com', '123'),
    new User('New User', 'newUser@gmail.com', '1234'),
  ];
  private apiUrl = 'https://mock-api-endpoint/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // return this.http.get<User[]>(this.apiUrl);
    return of(this.users);
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    // return this.http.get<User>(url);
    const usersFiltered = this.users.filter((user) => user.id === id);
    if (usersFiltered.length < 1) {
      throw new Error(`id ${id} not found`);
    }
    return of(usersFiltered[0]);
  }

  addUser(user: User): Observable<User> {
    // return this.http.post<User>(this.apiUrl, user);
    const usersFiltered = this.users.filter(
      (userTmp) => userTmp.id === user.id
    );
    if (usersFiltered.length < 1) {
      this.users.push(user);
      return of(user);
    }
    throw new Error(`user with the id ${user.id} already exist`);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    // return this.http.put<User>(url, user);
    const usersFiltered = this.users.filter(
      (userTmp) => userTmp.id === user.id
    );
    if (usersFiltered.length < 1) {
      throw new Error(`user with id ${user.id} not found`);
    }
    usersFiltered[0].name = user.name;
    usersFiltered[0].email = user.email;
    usersFiltered[0].password = user.password;
    return of(user);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    // return this.http.delete(url);
    const usersFiltered = this.users.filter((user) => user.id != id);
    if (usersFiltered.length == this.users.length) {
      throw new Error(`user with id ${id} not found`);
    }
    this.users = usersFiltered;
    return of(usersFiltered[0]);
  }
}
