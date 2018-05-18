import { Injectable } from '@angular/core';
import {
    // #region http

    HttpInterceptor,
    HttpHandler,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpResponse,
    HttpProgressEvent,
    HttpUserEvent,
    HTTP_INTERCEPTORS,
    HttpRequest
} from "@angular/common/http";
// #endregion http
import { Observable } from 'rxjs/Rx';
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from './../config/api.config';
import { localUser } from './../models/local_user';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(public storage: StorageService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        console.log('Passou pelo interceptor');
        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0,N) == API_CONFIG.baseUrl;
        if (localUser && requestToAPI) {
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
            return next.handle(authReq);
        } else {
            return next.handle(req);

        }

    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};