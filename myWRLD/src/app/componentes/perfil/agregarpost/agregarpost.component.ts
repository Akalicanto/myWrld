import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregarpost',
  templateUrl: './agregarpost.component.html',
  styleUrls: ['./agregarpost.component.css']
})
export class AgregarpostComponent implements OnInit {

  postForm: FormGroup;
  profilePic: any;
  username = this.cookieService.get('Username');
  email = this.cookieService.get('Email');
  name = this.cookieService.get("Name");
  id = this.cookieService.get("Id");

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private _publicacionService: PublicacionService, private cookieService: CookieService) {
    this.postForm = this.fb.group({
      msg: ["", Validators.required],
    });

    if (this.cookieService.get('profilePic').includes("https:/")) {
      this.http.get(this.cookieService.get('profilePic'), { responseType: 'blob' }).subscribe(res => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          const imageData = reader.result;
          this.profilePic = imageData;
        };
      });
    } else {
      this.profilePic = this.cookieService.get('profilePic');
    }
  }

  ngOnInit(): void {
  }

  crearPublicacion() {
    const PUBLICACION: Publicacion = {
      email: this.email,
      msg: this.postForm.get("msg")?.value.trim(),
      idUser: this.id,
      parentCode: "parent",
      likes: ""
    }

    this._publicacionService.newPost(PUBLICACION).subscribe(data => {
      this.toastr.success("Publicación creada correctamente", "Nuevo Post");
    }, error => {
      console.log(error);
    })

    var url1 = this.router.url === "/perfil/" + this.username ? "/" : 'perfil/' + this.username;
    var url2 = this.router.url === "/perfil/" + this.username ? 'perfil/' + this.username : "/";

    this.router.navigateByUrl(url1, { skipLocationChange: true }).then(() => {
      this.router.navigate([url2]);
    });

  }
}
