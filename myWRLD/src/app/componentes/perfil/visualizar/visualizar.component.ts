import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {

  profilePic = "/assets/profilePic/diana.png";
  @Input() res: any;
  @Input() imgCont: any;
  @Input() username: any;
  @Input() name: any;
  @Input() msg: any;
  @Input() id: any;
  @Input() email: any;
  @Input() sonNumber: any;
  myUsername = this.cookieService.get('Username');
  myId = this.cookieService.get("Id");
  myEmail = this.cookieService.get("Email");
  dataPost: any = [];
  idURL = this.router.url.split("/message/").pop()!;
  MSG = this.cookieService.get("MSG");

  constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _publicacionService: PublicacionService, private cookieService: CookieService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    await this.mostrarPublicacion();
  }

  async mostrarPublicacion() {

    this.id = this.MSG.split("|")[0];
    this.email = this.MSG.split("|")[1];
    this.res = this.MSG.split("|")[2];

    await this._publicacionService.getPost(this.email, "parent").subscribe((data) => {
      data.forEach((msg: any) => {
        if (msg.parentCode == this.id) {
          msg.myLikeIsHere = msg.likes.indexOf(this.myId) == -1 ? false : true;
          this.dataPost = this.dataPost.concat(msg);
        }
      });
    }, error => {
      console.log(error);
    });

    await this._usuarioService.getAllUser().subscribe(data => {
      data.forEach((user: {
        profilePath: string; _id: any; username: any; name: any;
      }) => {
        this.dataPost.forEach((myUSER: {
          profilePath: string; idUser: any; username: any; name: any;
        }) => {
          if (user._id == myUSER.idUser) {
            if (user.profilePath != "" && user.profilePath != undefined) {
              myUSER.profilePath = "http://localhost:4000/" + user.profilePath;
            } else {
              myUSER.profilePath = "/assets/profile.jpeg";
            }
            myUSER.username = user.username;
            myUSER.name = user.name;
          }
        });
      });
      this.dataPost.sort((a: { sonNumber: number; }, b: { sonNumber: number; }) => b.sonNumber - a.sonNumber)
    }, (err) => {
      this.toastr.error(err.error.message, "ERROR");
    });

  }
}
