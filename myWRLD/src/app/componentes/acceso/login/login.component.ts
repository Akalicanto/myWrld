import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userForm: FormGroup;
  faEye = faEye;
  visible: boolean = true;
  changeType: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService,
    private _usuarioService: UsuarioService, private cookieService: CookieService, private http: HttpClient) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

  }

  ngOnInit(): void {
  }

  iniciarSesion() {
    let email = this.userForm.get("email")?.value.trim();
    let password = this.userForm.get("password")?.value.trim();

    if (email != null && email != "") {
      this._usuarioService.getUser(email, password).subscribe(data => {

        this.cookieService.set('Token', data.token);
        this.cookieService.set('Email', data.email);
        this.cookieService.set('Username', data.username);
        this.cookieService.set('Name', data.name);
        this.cookieService.set('Id', data._id);
        this.cookieService.set('Desc', data.desc);
        this.cookieService.set('Following', data.following);
        this.cookieService.set('Followers', data.followers);

        if (data.profilePath != undefined && data.profilePath != "") {
          this.cookieService.set('profilePic', "http://localhost:4000/" + data.profilePath);
        } else {
          this.cookieService.set('profilePic', "/assets/profile.jpeg");
        }

        if (data.headerPath != undefined && data.headerPath != "") {
          this.cookieService.set('headerPic', "http://localhost:4000/" + data.headerPath);
        } else {
          this.cookieService.set('headerPic', "/assets/header.jpeg");
        }

        this.toastr.success("Bienvenido @" + data.username, "Has iniciado sesión");
        this.router.navigate(["/"]);
      }, (err) => {
        this.toastr.error(err.error.message, "ERROR");
      });
    }
  }

  viewPass() {
    this.faEye = this.visible ? faEyeSlash : faEye;
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
