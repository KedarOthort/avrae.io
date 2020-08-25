import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {UserInfo} from '../schemas/UserInfo';
import {getToken} from '../SecurityHelper';

// api response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

// api options
export function defaultOptions(additionalOptions = {}) {
  return {
    headers: new HttpHeaders({'Authorization': getToken()}),
    ...additionalOptions
  };
}

export function defaultTextOptions(additionalOptions = {}) {
  return {
    responseType: 'text',
    headers: new HttpHeaders({'Authorization': getToken()}),
    ...additionalOptions
  };
}

// user session
export function setUser(user: UserInfo) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): UserInfo {
  if (sessionStorage.getItem('user')) {
    return JSON.parse(sessionStorage.getItem('user'));
  }
  return null;
}

export function removeUser() {
  if (sessionStorage.getItem('user')) {
    sessionStorage.removeItem('user');
  }
}

// error handling
export function defaultErrorHandler(err: HttpErrorResponse): Observable<ApiResponse<any>> {
  console.error(err);
  return of({...err.error, status: err.status} as ApiResponse<any>);
}
