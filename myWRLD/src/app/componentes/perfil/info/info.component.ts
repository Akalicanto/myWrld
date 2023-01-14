import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Input() imgInfo:any;
  @Input() username:any;
  @Input() name:any;
  @Input() desc:any;
  @Input() id:any;
  @Input() following:any;
  @Input() followers:any;

  email = this.cookieService.get('Email');
  @Input() askFollowing:any;
  
  myUsername = this.cookieService.get('Username');
  myId = this.cookieService.get('Id');

  constructor(private cookieService: CookieService, private _usuarioService: UsuarioService, private toastr: ToastrService,
    private router: Router) {}

  ngOnInit(): void {}

  newFollow(){

    const USUARIO: Usuario = {
      username: "",
      email: this.email,
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

    this._usuarioService.editUser(this.email, USUARIO).subscribe(data => {
      this.cookieService.delete('Following');
      this.cookieService.set('Following', data.following);      

      this.toastr.success("Has seguido a @" + this.username + "!", "Genial!");
      this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
        this.router.navigate(['perfil/'+this.username])
        });
    }, (err) => {
      this.toastr.error(err.error.message,"ERROR");
    });

  }

  deleteFollow(){

    const USUARIO: Usuario = {
      username: "",
      email: this.email,
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

    this._usuarioService.editUser(this.email, USUARIO).subscribe(data => {
      this.cookieService.delete('Following');
      this.cookieService.set('Following', data.following);      

      this.toastr.success("Has dejado de seguir a @" + this.username + "!", "Lastima!");
      this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
        this.router.navigate(['perfil/'+this.username])
        });
    }, (err) => {
      this.toastr.error(err.error.message,"ERROR");
    });

  }
}
