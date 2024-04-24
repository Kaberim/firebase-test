import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  email: string;
  name: string;
  picture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSubject.asObservable();

  constructor() { }

  login(userData: User) {
    this.userSubject.next(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getUserData(): User | null {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}
