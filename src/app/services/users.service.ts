import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { myUser } from 'src/app/models/User';
import { Config } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];

  usersUrl = 'https://myuserbackend.herokuapp.com/users';
    constructor(private http: HttpClient) { }

    getUsers() {
      return this.http.get<Config>(this.usersUrl);
  }

   addUsers(user: User): Observable<User>{
     return this.http.post<User>(this.usersUrl, user);
  }

  deleteUser(user: myUser) {
    return this.http.delete(`${this.usersUrl}/${user.id}`);
  }

  patchUser(user: myUser): Observable<{}> {
    return this.http.patch(`${this.usersUrl}/${user.id}`, {name:user.name, email:user.email, phone:user.phone});
  }

}

