// Angular modules.
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// App environment.
import { environment } from '@env/environment';

// App interfaces.
import { IRequest } from '@app/core';

// App services.
import { AuthService } from '@app/core/services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class RequestService {

  // Http headers.
  public headers: HttpHeaders = this.authService.getHttpHeaders();

  // Constructor method.
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  // Get all requests.
  public getRequests(): Promise<IRequest[]> {

    const promise = new Promise<IRequest[]>((resolve, reject) => {

      this.http.get<IRequest[]>(environment.api.url, { headers: this.headers }).subscribe(
        result => resolve(result),
        error => reject(error)
      );

    });

    return promise;

  }

  // Create new request.
  public createRequest(req: IRequest): Promise<any> {

    const promise = new Promise<any>((resolve, reject) => {

      this.http.post<any>(environment.api.url, req, { headers: this.headers }).subscribe(
        result => resolve(result),
        error => reject(error)
      );

    });

    return promise;

  }

  // Update an existing request.
  public updateRequest(req: IRequest): Promise<any> {

    const promise = new Promise<any>((resolve, reject) => {

      this.http.put<any>(environment.api.url + req._id, req, { headers: this.headers }).subscribe(
        result => resolve(result),
        error => reject(error)
      );

    });

    return promise;

  }

  // Delete an existing request.
  public deleteRequest(id: string): Promise<any> {

    const promise = new Promise<any>((resolve, reject) => {

      this.http.delete<any>(environment.api.url + id, { headers: this.headers }).subscribe(
        result => resolve(result),
        error => reject(error)
      );

    });

    return promise;

  }

}
