import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../models/usuario";

@Injectable({
    providedIn: "root"
})
export class UsuarioService {

  url = "https://www.mywrld.click:4000/api/usuarios/";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(this.url + email);
  }

  newUser(usuario: Usuario): Observable<any> {
    return this.http.post(this.url, usuario);
  }

  getAllUser(): Observable<any> {
    return this.http.get(this.url);
  }

  getUser(email: string, password: string): Observable<any> {
    return this.http.get(this.url + email + "/" + password);
  }

  editUser(email: string, usuario: Usuario): Observable<any> {
    return this.http.put(this.url + email, usuario);
  }

}
