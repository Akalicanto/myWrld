import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  faEye = faEye;
  visible: boolean = true;
  changeType: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _usuarioService: UsuarioService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]]
    });
  }

  ngOnInit(): void {
  }

  crearUsuario() {
    const USUARIO: Usuario = {
      username: this.userForm.get("username")?.value,
      email: this.userForm.get("email")?.value,
      password: this.userForm.get("password")?.value.trim(),
      name: "",
      desc: "",
      following: "",
      followers: "",
      profile: undefined,
      profileName: "",
      header: undefined,
      headerName: ""
    }

    this._usuarioService.newUser(USUARIO).subscribe(data => {
      this.toastr.success("Usuario registrado correctamente", "Registro");
      this.router.navigate(["/login"]);
    }, (err) => {
      this.toastr.error(err.error.message, "ERROR");
      console.log(err)
    });
  }

  viewPass() {
    this.faEye = this.visible ? faEyeSlash : faEye;
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
