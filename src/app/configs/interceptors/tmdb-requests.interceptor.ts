import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor,
 HttpRequest
} from '@angular/common/http';


import {environment} from "../../../environments/environment.development";
import {catchError, finalize, Observable, retry, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {LoadingService} from "../../core/services/loading.service";

const options = {
  // method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: environment.api.tmdb.authorization
  }
};

@Injectable()
export class TmdbRequestsInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (req.url.includes(environment.api.tmdb.baseUrl)) {
      this.loadingService.show();
      const tokenizedTmdbReq = req.clone({
        setHeaders: options.headers
      });

      return next.handle(tokenizedTmdbReq).pipe(
        finalize(() => this.loadingService.hide()),
        retry(3),
        catchError((err: HttpErrorResponse) => {
          console.log("User is redirected/ shown an error etc ...")
          return throwError(() => err.message);
        })
      );
    }
    return next.handle(req).pipe()
  }

}
