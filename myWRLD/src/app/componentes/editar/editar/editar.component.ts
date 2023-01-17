import { Component, OnInit } from '@angular/core';
import { faAngleRight, faPencil, faEdit, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  //formularios
  dataForm: FormGroup;
  usernameForm: FormGroup;
  passwordForm: FormGroup;
  //img
  headerPic: any;
  headerPicName: any;

  profilePic: any;
  profilePicName: any;
  //info
  username = this.cookieService.get('Username');
  email = this.cookieService.get('Email');
  name = this.cookieService.get("Name");
  desc = this.cookieService.get("Desc");
  id = this.cookieService.get("Id");
  followingList: any = this.cookieService.get("Following").split(",");
  followersList: any = this.cookieService.get("Followers").split(",");
  //eye
  visible: boolean = true;
  changeType: boolean = true;
  repeatVisible: boolean = true;
  repeatChangeType: boolean = true;
  //icons
  faEdit = faEdit;
  faEye = faEye;
  RfaEye = faEye;
  faPencil = faPencil;
  faAngleRight = faAngleRight;
  //functions
  change: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService,
    private _usuarioService: UsuarioService, private cookieService: CookieService,
    private _publicacionService: PublicacionService, private http: HttpClient) {
    this.dataForm = this.fb.group({
      name: [this.name, Validators.required],
      desc: [this.desc]
    });

    this.usernameForm = this.fb.group({
      newUsername: ["", Validators.required],
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]],
      repeatNewPassword: ["", Validators.required],
    });

    if (this.cookieService.get("profilePic").includes("https:/")) {
      this.http.get(this.cookieService.get('profilePic'), { responseType: 'blob' }).subscribe(res => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          const imageData = reader.result;
          this.profilePic = imageData;
        };
      });
    } else {
      this.profilePic = "assets/profile.jpeg";
    }

    if (this.cookieService.get("headerPic").includes("https:/")) {
      this.http.get(this.cookieService.get('headerPic'), { responseType: 'blob' }).subscribe(res => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          const imageData = reader.result;
          this.headerPic = imageData;
        };
      });
    } else {
      this.headerPic = "assets/header.jpg"
    }

  }

  ngOnInit(): void {
    if (this.router.url !== "/edit/" + this.username) {
      this.router.navigate(['perfil/' + this.username])
    }
  }

  cambiarUsername() {
    let newUsername = this.usernameForm.get("newUsername")?.value.trim();
    const USUARIO: Usuario = {
      username: newUsername,
      email: this.email,
      password: "",
      name: "",
      desc: "",
      following: "",
      followers: "",
      profile: undefined,
      profileName: "",
      header: undefined,
      headerName: ""
    }

    if (newUsername != null && newUsername != "" && newUsername != this.username) {
      this._usuarioService.editUser(this.email, USUARIO).subscribe(data => {
        this.cookieService.set('Username', data.username);
        this.toastr.success("Bienvenido @" + data.username, "Nombre de Usuario cambiado");
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['edit/' + this.username])
        });
      }, (err) => {
        this.toastr.error(err.error.message, "ERROR");
      });
    } else {
      this.toastr.warning("El usuario nuevo tiene que ser distinto al actual", "Cuidado!");
    }
  }

  cambiarPassword() {
    let newPassword = this.passwordForm.get("newPassword")?.value.trim();
    let repeatNewPassword = this.passwordForm.get("repeatNewPassword")?.value.trim();
    const USUARIO: Usuario = {
      username: "",
      email: this.email,
      password: newPassword,
      name: "",
      desc: "",
      following: "",
      followers: "",
      profile: undefined,
      profileName: "",
      header: undefined,
      headerName: ""
    }

    if (newPassword == repeatNewPassword) {
      if (newPassword != null && newPassword != "") {
        this._usuarioService.editUser(this.email, USUARIO).subscribe(data => {
          this.cookieService.delete("Token");
          this.toastr.success("¡Enhorabuena!", "Contraseña modificada");
          this.router.navigate(["/login"]);
        }, (err) => {
          this.toastr.error(err.error.message, "ERROR");
        });
      }
    } else {
      this.toastr.warning("Las contraseñas tienen que ser iguales", "Cuidado!");
    }
  }

  borrar() {

    if (this.followingList.length > 0) {
      var list: any = [];
      this.followingList.forEach((id: any) => {
        var USUARIO: Usuario = {
          username: "",
          email: this.email,
          password: "",
          name: "",
          desc: "",
          following: id,
          followers: id,
          profile: undefined,
          profileName: "",
          header: undefined,
          headerName: ""
        }
        list.push(USUARIO);
      });

      list.forEach((user: Usuario) => {
        this._usuarioService.editUser(this.email, user).subscribe();
      });
    }


  }

  async eliminarCuenta() {
    if (confirm("Está apunto de eliminar su cuenta, ¿Está seguro?")) {

      await this.borrar();

      var userData = await this._usuarioService.getAllUser().toPromise();

      if (this.followersList.length > 0) {

        this.followersList.forEach((id: any) => {

          userData.forEach((user: { _id: any; email: string; }) => {

            if (user._id == id) {

              var USUARIO: Usuario = {
                username: "",
                email: user.email,
                password: "",
                name: "",
                desc: "",
                following: this.id,
                followers: this.id,
                profile: undefined,
                profileName: "",
                header: undefined,
                headerName: ""
              }

              this._usuarioService.editUser(user.email, USUARIO).subscribe();

            }

          });

        });

      }

      await this._publicacionService.getPost(this.email, "empty").subscribe(data => {
        this._publicacionService.deletePost(data._id).subscribe();
      });

      this.cookieService.delete("Token");

      this._usuarioService.deleteUser(this.email).subscribe(data => {
        this.toastr.success("Esperamos verte pronto.", "Cuenta eliminada");
        this.router.navigate(["/register"]);
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

  repeatViewPass() {
    this.RfaEye = this.repeatVisible ? faEyeSlash : faEye;
    this.repeatVisible = !this.repeatVisible;
    this.repeatChangeType = !this.repeatChangeType;
  }

  getFile($event: any) {
    var pic = $event.target.files[0];

    if (pic.size < 1000000) {
      this.profilePicName = "profile/" + this.email + "-" + pic.name;

      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = () => {
        this.profilePic = reader.result;
      };
    } else {
      this.toastr.error("El archivo es demasiado grande", "ERROR");
    }
  }

  getHeader($event: any) {
    var pic = $event.target.files[0];

    if (pic.size < 1000000) {
      this.headerPicName = "header/" + this.email + "-" + pic.name;

      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = () => {
        this.headerPic = reader.result;
      };
    } else {
      this.toastr.error("El archivo es demasiado grande", "ERROR");
    }
  }

  guardarDatos() {
    let nameData = this.dataForm.get("name")?.value.trim();
    let descData = this.dataForm.get("desc")?.value.trim();

    if (descData == "") {
      descData = "myWrldDescDelete";
    }

    const USUARIO: Usuario = {
      username: "",
      email: this.email,
      password: "",
      name: nameData,
      desc: descData,
      following: "",
      followers: "",
      profile: this.profilePic,
      profileName: this.profilePicName,
      header: this.headerPic,
      headerName: this.headerPicName
    }

    if (nameData != "") {
      this._usuarioService.editUser(this.email, USUARIO).subscribe(data => {
        this.cookieService.set('Name', data.name);
        this.cookieService.set('Desc', data.desc);

        if (data.profilePath != undefined) {
          this.cookieService.set('profilePic', "https://www.mywrld.click:4000/" + data.profilePath);
        }

        if (data.headerPath != undefined) {
          this.cookieService.set('headerPic', "https://www.mywrld.click:4000/" + data.headerPath);
        }

        this.toastr.success("Datos guardados Correctamente", "Correcto");
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['edit/' + this.username])
        });
      }, (err) => {
        this.toastr.error(err.error.message, "ERROR");
      });
    }

  }

}
