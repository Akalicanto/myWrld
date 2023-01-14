import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listfollow',
  templateUrl: './listfollow.component.html',
  styleUrls: ['./listfollow.component.css']
})
export class ListfollowComponent implements OnInit {

  @Input() imgInfo:any;
  @Input() username:any;
  @Input() name:any;
  @Input() following:any;
  @Input() followers:any;
  @Input() askFollowing:any;
  

  listUsers:any = [];
  user = this.router.url.split("/").pop();
  myUser = this._cookieService.get("Username");
  myEmail = this._cookieService.get("Email");

  constructor(private _cookieService: CookieService, private _usuarioService: UsuarioService, private toastr: ToastrService,
    private router: Router) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    if (this.router.url.includes("followers")) {
      document.getElementById("change")!.querySelectorAll("div")[0].style.backgroundColor = "#eee0a8";
      document.getElementById("change")!.querySelectorAll("div")[0].style.borderRight = "1px solid black";
    } else {
      document.getElementById("change")!.querySelectorAll("div")[1].style.backgroundColor = "#eee0a8";
      document.getElementById("change")!.querySelectorAll("div")[1].style.borderLeft = "1px solid black";
    }

    if(this.user == this.myUser){
      this.getList();
    } else {
      this.datosUsuarios();
    }
  }

  getList(){
    let list:any;
    
    if(this.router.url == "/followers/"+this.user){
      list = this._cookieService.get("Followers").split(",");
    } else if(this.router.url == "/following/"+this.user){
      list = this._cookieService.get("Following").split(",");
    }

    this._usuarioService.getAllUser().subscribe(data => {
      data.forEach((user: { _id: any; }) => {
        list.forEach((id: any) => {
          if (user._id == id) {
            this.listUsers.push(user);
          }
        });
      });
    }, (err) => {
      this.toastr.error(err.error.message,"ERROR");
    });

  }

  async datosUsuarios() {
    let list:any;

    await this._usuarioService.getAllUser().subscribe(data => {
      let cont = data.length;
      data.forEach((user: { username: any; _id: any; following:any; followers:any; }) => {
        if (user.username == this.user) {
          cont = 0;
          if(this.router.url == "/followers/"+this.user){
            list = user.followers;
          } else if(this.router.url == "/following/"+this.user){
            list = user.following;
          }
        }
      });
      if(cont == data.length){
        this.toastr.error("Este usuario NO existe","ERROR");
        this.router.navigate(["/"]);
      }
    }, (err) => {
      this.toastr.error(err.error.message,"ERROR");
    });

    await this._usuarioService.getAllUser().subscribe(data => {      
      data.forEach((user: { _id: any; }) => {
        list.forEach((id: any) => {
          if (user._id == id) {
            this.listUsers.push(user);            
          }
        });
      });
    }, (err) => {
      this.toastr.error(err.error.message,"ERROR");
    });

  }

}
