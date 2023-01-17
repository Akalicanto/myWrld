import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-verPerfil',
  templateUrl: './verPerfil.component.html',
  styleUrls: ['./verPerfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  //img
  headerPic: any;
  profilePic: any;
  //data
  username = this.cookieService.get('Username');
  email = this.cookieService.get('Email');
  name = this.cookieService.get("Name");
  id = this.cookieService.get("Id");
  desc = this.cookieService.get("Desc");
  //follow
  following: any;
  followers: any;
  askFollowing = false;
  //MY INFO
  myId = this.cookieService.get("Id");
  myUsername = this.username;
  myFollowing = this.cookieService.get("Following").split(",");
  dataPost: any = [];

  constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _publicacionService: PublicacionService,
    private cookieService: CookieService, private router: Router) {

    if (this.cookieService.get("Following").split(",")[0] == "") {
      this.following = "";
    } else {
      this.following = this.cookieService.get('Following').split(",");
    }

    if (this.cookieService.get("Followers").split(",")[0] == "") {
      this.followers = "";
    } else {
      this.followers = this.cookieService.get('Followers').split(",");
    }
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (this.router.url === "/perfil/" + this.username) {
      this.profilePic = this.cookieService.get("profilePic");
      this.headerPic = this.cookieService.get("headerPic");
      this.llamarPublicaciones();
    } else {
      this.datosUsuarios();
    }

    if (this.router.url.includes("/perfil/")) {
      var one = document.getElementsByTagName('textarea')[0];

      one!.style.height = 10 + "px";
      one!.style.height = (one!.scrollHeight + 25) + "px";
      one!.style.overflow = 'hidden';
    }
  }

  llamarPublicaciones() {
    this._publicacionService.getPost(this.email, "empty").subscribe(data => {
      this.dataPost = data;
      this.dataPost.forEach((msg: {
        myLikeIsHere: boolean; likes: string | any[];
      }) => {
        msg.myLikeIsHere = msg.likes.indexOf(this.myId) == -1 ? false : true;

      });
    }, error => {
      console.log(error);
    })
  }

  async datosUsuarios() {
    this.username = this.router.url.split("/perfil/")[1];

    this._usuarioService.getAllUser().subscribe(data => {
      let cont = data.length;
      data.forEach((user: {
        headerPath: string;
        profilePath: any; username: any; name: any; _id: any; desc: any; email: any; following: any; followers: any;
      }) => {
        if (user.username == this.username) {
          this.name = user.name;
          this.id = user._id;
          this.desc = user.desc;
          this.email = user.email;
          this.following = user.following;
          this.followers = user.followers;
          if (user.profilePath != "" && user.profilePath != undefined) {
            this.profilePic = "https://www.mywrld.click:4000/" + user.profilePath;
          } else {
            this.profilePic = "/assets/profile.jpeg";
          }

          if (user.headerPath != "" && user.headerPath != undefined) {
            this.headerPic = "https://www.mywrld.click:4000/" + user.headerPath;
          } else {
            this.headerPic = "/assets/header.jpg";
          }

          this.myFollowing.forEach((follow: string) => {
            if (follow == this.id) {
              this.askFollowing = true;
            }
          });
          cont = 0;
          this.llamarPublicaciones();
        }
      });

      if (cont == data.length) {
        this.toastr.error("Este usuario NO existe", "ERROR");
        this.router.navigate(["/"]);
      }
    }, (err) => {
      this.toastr.error(err.error.message, "ERROR");
    });

  }

}
