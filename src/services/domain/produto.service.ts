import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProdutoService {
  constructor(public http: HttpClient) {}

  findByCategoria(categoria_id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id}`);
  }
}
