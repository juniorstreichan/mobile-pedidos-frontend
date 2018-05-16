import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredentialsDTO } from './../models/credentials.dto';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {
    }

    authenticate(cred: CredentialsDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            cred,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

}