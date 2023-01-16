import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  username = this.cookieService.get('Username');
  email = this.cookieService.get('Email');
  name = this.cookieService.get("Name");
  following = this.cookieService.get("Following").split(",");
  dataPost:any = [];
  usernameF = "";
  nameF = "";
  myID = this.cookieService.get("Id");

  constructor(private toastr: ToastrService, private _publicacionService: PublicacionService, private cookieService: CookieService, private _usuariosService: UsuarioService) {

  }

  ngOnInit(): void {
    this.llamarPublicaciones();   
  }

  async llamarPublicaciones() {

    await this._publicacionService.getPost(this.email, "empty").subscribe((data) => {
      
      data.forEach((msg: any) => {
        msg.profilePath = this.cookieService.get("profilePic");
        msg.username = this.username;
        msg.name = this.name;
        msg.myLikeIsHere = msg.likes.indexOf(this.myID) == -1 ? false : true;
        this.dataPost = this.dataPost.concat(msg);
      });

    });

    if(this.following.length > 0) {        

      await this.following.forEach(id => {

        this._usuariosService.getAllUser().subscribe(data => {
          data.forEach((user:any) => {
            
            if (user._id == id) {              
              this._publicacionService.getAllPost(id).subscribe(data => {
                data.forEach((msg: any) => {
                  if (user.profilePath != "" && user.profilePath != undefined) {
                    msg.profilePath = "https://35.181.90.121:4000/" + user.profilePath;
                  }  else {
                    msg.profilePath = "/assets/profile.jpeg";
                  }
                  msg.username = user.username;
                  msg.name = user.name;
                  msg.myLikeIsHere = msg.likes.indexOf(this.myID) == -1 ? false : true;
                  
                  this.dataPost = this.dataPost.concat(msg);
                  this.dataPost.sort((a: { _id: string; },b: { _id: string; }) => a._id < b._id ? 1 : -1);
                  
                });       
              });
            }

          });
        }, (err) => {
          this.toastr.error(err.error.message,"ERROR");
        });
        
      });
      
    }    
    
  }
}
