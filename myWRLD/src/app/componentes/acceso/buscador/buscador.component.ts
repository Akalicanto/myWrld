import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faHome, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  //icons
  faSearch = faSearch;
  faHome = faHome;
  faRightFromBracket = faRightFromBracket;
  faBars = faBars;

  //info
  word = '';
  profilePic: any;
  listUsers: any = [];
  username = this.cookieService.get("Username");
  name = this.cookieService.get("Name");
  following: any;
  followers: any;

  constructor(private _usuarioService: UsuarioService, private cookieService: CookieService, private router: Router, private toastr: ToastrService, private http: HttpClient) {
    if (this.cookieService.get('profilePic').includes("http:/")) {
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
    this.getUsers();
  }

  getUsers() {
    this._usuarioService.getAllUser().subscribe(data => {
      this.listUsers = data;
      data.forEach((user: { username: string; followers: any; following: any; }) => {
        if (user.username == this.username) {
          if (user.followers != "") {
            this.followers = user.followers.toString().split(",");
          } else {
            this.followers = "";
          }
          if (user.following != "") {
            this.following = user.following.toString().split(",");
          } else {
            this.following = "";
          }     
        }
      });
    }, (err) => {
      this.toastr.error(err.error.message, "ERROR");
    });
  }

  change(id: any) {
    let table = document.getElementById(id)!;
    if (this.word != '') {
      table.style.display = "block"
    } else {
      table.style.display = "none"
    }
  }

  showCard() {
    let buscar = (<HTMLInputElement>document.getElementById("search")).value;

    if (buscar != "") {
      document.getElementById("results")!.style.display = "block";
    }
  }

  hideCard() {
    document.getElementById("results")!.style.display = "none";
  }

  cerrarSesion() {
    this.cookieService.delete('Email');
    this.cookieService.delete('Username');
    this.cookieService.delete('Name');
    this.cookieService.delete('Id');
    this.cookieService.delete('Desc');
    this.cookieService.delete('Following');
    this.cookieService.delete('Followers');
    this.cookieService.delete("profilePic");
    this.cookieService.delete("Token");
    this.toastr.success("Nos vemos pronto @" + this.username + "!", "Sesión cerrada");
    this.router.navigate(["/login"]);
  }

  open:boolean = false;
  menu() {
    if (window.innerWidth <= 768) {
      this.open = !this.open;
      document.getElementById("profileMini")!.style.display = this.open === true ? 'block' : 'none';
      document.getElementById("homeMini")!.style.display = this.open === true ? 'block' : 'none';
      document.getElementById("sessionMini")!.style.display = this.open === true ? 'block' : 'none';
    }
  }
}
