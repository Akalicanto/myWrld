import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Publicacion } from "../models/publicacion";

@Injectable({
    providedIn: "root"
})
export class PublicacionService {

  url = "https://35.181.90.121:4100/api/publicaciones/";
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  newPost(publicacion: Publicacion): Observable<any> {
    return this.http.post(this.url, publicacion);
  }

  getPost(email: string, id: string): Observable<any> {
    return this.http.get(this.url + email + "/" + id);
  }

  getAllPost(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editPost(id: string, publicacion: Publicacion): Observable<any> {
    return this.http.put(this.url + id, publicacion);
  }
}
