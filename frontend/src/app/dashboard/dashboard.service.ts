import {Injectable} from '@angular/core';
import {UserInfo} from "../schemas/UserInfo";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {defaultOptions} from "./APIHelper";
import {CharacterMeta} from "../schemas/Character";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private userInfoUrl = `${environment.apiURL}/userInfo`;
  private characterMetaUrl = `${environment.apiURL}/characters/meta`;

  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.userInfoUrl, defaultOptions());
  }

  getCharacterMeta(): Observable<CharacterMeta[]> {
    return this.http.get<CharacterMeta[]>(this.characterMetaUrl, defaultOptions());
  }
}
