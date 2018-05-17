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

export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        console.log('Passou pelo interceptor');
        return next.handle(req).catch((error, caught) => {
            let errorObj = error;

            if (errorObj.error) errorObj = errorObj.error;

            if (!errorObj.status) errorObj = JSON.parse(errorObj);

            console.log('Erro detectado pelo Interceptor');
            console.log(errorObj);
            return Observable.throw(errorObj);
        }) as any;

    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};