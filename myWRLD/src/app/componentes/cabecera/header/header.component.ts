import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logoPath:string;

  constructor() {
    this.logoPath = "/assets/logo1.png";
   }

  ngOnInit(): void {
  }

}
