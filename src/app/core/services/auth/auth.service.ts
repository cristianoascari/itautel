// Angular modules.
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App environment.
import { environment } from '@env/environment';

// App models.
import { IUser } from '@app/core';

@Injectable({providedIn: 'root'})
export class AuthService {

  // Constructor method.
  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {}

  // Authenticate user.
  public login(
    email: string,
    pass: string
  ): Promise<IUser> {

    const promise = new Promise<IUser>((resolve) => {

      // Build temp user's data.
      const user: IUser = {
        company: 'Wayne Enterprises',
        email,
        id: 102030,
        name: 'Alfred Pennyworth'
      };

      // Local save.
      // NOTA: Em produção eu salvaria estes dados criptografados.
      localStorage.setItem(environment.localStorage.userData, JSON.stringify(user));

      resolve(user);

    });

    return promise;

  }

  // Get logged user's data.
  public getLoggedUser(): IUser {

    const u: string = localStorage.getItem(environment.localStorage.userData);
    return u ? JSON.parse(u) as IUser : null;

  }

  // Logout user.
  public logout(): Promise<any> {

    const promise = new Promise<any>(resolve => {
      localStorage.removeItem(environment.localStorage.userData);
      resolve(null);
    });
    return promise;

  }// Return default HTTP header.
  public getHttpHeaders(): HttpHeaders {

    let header: HttpHeaders;
    header = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      applicationId: environment.api.applicationId,
      locale: this.translate.currentLang || 'pt-BR'
    });
    return header;

  }

}
