import { Injectable } from '@angular/core';
import {
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

import { Observable } from 'rxjs/Rx';
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpSentEvent |
        HttpHeaderResponse |
        HttpProgressEvent |
        HttpResponse<any> |
        HttpUserEvent<any>> {


        return next.handle(req).catch((error, caught) => {
            let errorObj = error;

            if (errorObj.error) errorObj = errorObj.error;

            if (!errorObj.status) errorObj = JSON.parse(errorObj);


            switch (errorObj.status) {

                case 403:
                    this.handle403();
                    break;

            }

            console.log('Erro detectado pelo Interceptor');
            console.log(errorObj);
            return Observable.throw(errorObj);
        }) as any;

    }

    handle403() {
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};