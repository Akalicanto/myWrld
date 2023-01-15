import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {

  @Input() imgPortada:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (this.imgPortada.includes("http:/")) {
      this.http.get(this.imgPortada, { responseType: 'blob' }).subscribe(res => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          const imageData = reader.result;
          this.imgPortada = imageData;
        };
      });
    } else {
      this.imgPortada = "assets/header.jpg"
    }
  }

}
