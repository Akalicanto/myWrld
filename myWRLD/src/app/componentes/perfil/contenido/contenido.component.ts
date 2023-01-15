import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faTrash, faHeartBroken, faComment, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { Publicacion } from 'src/app/models/publicacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  comentarForm: FormGroup;
  faStar = faHeart;
  faTrash = faTrash;
  faComment = faComment;
  faArrowRight = faAngleRight
  @Input() imgCont: any;
  @Input() username: any;
  @Input() name: any;
  @Input() msg: any;
  @Input() id: any;
  @Input() email: any;
  @Input() sonNumber: any;
  @Input() likes: any;
  @Input() ILIKEIT: any;
  @Input() date: any;
  myUsername = this.cookieService.get('Username');
  myId = this.cookieService.get("Id");
  myEmail = this.cookieService.get("Email");
  dataPost: any = [];
  fav: boolean = false;

  constructor(private http: HttpClient, private _publicacionService: PublicacionService, private toastr: ToastrService,
    private router: Router, private cookieService: CookieService, private fb: FormBuilder) {
    this.comentarForm = this.fb.group({
      comentario: ["", Validators.required]
    });    
  }

  ngOnInit(): void {
    if (this.imgCont.includes("http:/")) {
      this.http.get(this.imgCont, { responseType: 'blob' }).subscribe(res => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          const imageData = reader.result;
          this.imgCont = imageData;
        };
      });
    }

    if (this.ILIKEIT) {
      this.fav = !this.fav;
      this.faStar = faHeartBroken;
    }
    this.date = this.date.split("T")[0]
    var xd = document.getElementsByTagName('textarea');
    var index = this.router.url == "/perfil/" + this.myUsername ? 2 : 1;

    if (this.router.url.includes("/perfil/")) {
      var one = document.getElementsByTagName('textarea')[0];

      one!.style.height = 10 + "px";
      one!.style.height = (one!.scrollHeight + 25) + "px";
      one!.style.overflow = 'hidden';
    }

    for (index; index < xd.length; index++) {
      let el = xd[index];
      el!.style.height = 10 + "px";
      el!.style.height = (el!.scrollHeight + 25) + "px";
      el!.style.overflow = 'hidden';
    }
  }

  borrarPublicacion() {
    if (confirm("Está apunto de eliminar una Publicación, ¿Está seguro?")) {
      this._publicacionService.deletePost(this.id).subscribe(data => {
        this.toastr.success("Eliminada con exito", "Publicación eliminada");

        if (this.router.url === "/perfil/" + this.username) {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['perfil/' + this.username])
          });
        } else {
          this.router.navigateByUrl('/perfil/' + this.username, { skipLocationChange: true }).then(() => {
            this.router.navigate(['/'])
          });
        }
      });
    }
  }

  comentar() {
    const PUBLICACION: Publicacion = {
      email: this.myEmail,
      msg: this.comentarForm.get("comentario")?.value.trim(),
      idUser: this.myId,
      parentCode: this.id,
      likes: ""
    }

    this._publicacionService.newPost(PUBLICACION).subscribe(data => {
      this.toastr.success("Comentario creado correctamente", "Has comentado a " + this.name);

      var url1 = this.router.url === "/perfil/" + this.username ? "/" : 'perfil/' + this.username;
      var url2 = this.router.url === "/perfil/" + this.username ? 'perfil/' + this.username : "/";

      this.router.navigateByUrl(url1, { skipLocationChange: true }).then(() => {
        this.router.navigate([url2]);
      });
    }, error => {
      console.log(error);
    });

  }

  send() {
    this.cookieService.set("MSG", this.id + "|" + this.email + "|" + this.username)
    this.router.navigate(["/message/" + this.id]);
  }

  favPost() {

    this.fav = !this.fav;
    this.faStar = this.fav ? faHeartBroken : faHeart;
    this.likes = this.fav ? this.likes += 1 : this.likes -= 1;

    var PUBLICACION: Publicacion = {
      email: "",
      msg: "",
      idUser: "",
      parentCode: "",
      likes: this.myId,
    }

    this._publicacionService.editPost(this.id, PUBLICACION).subscribe();
  }
}
