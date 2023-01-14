import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms'; 
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "src/app/pipes/search.pipe";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//componentes
import { LoginComponent } from './componentes/acceso/login/login.component';
import { RegisterComponent } from './componentes/acceso/register/register.component';
import { HeaderComponent } from './componentes/cabecera/header/header.component';
import { VerPerfilComponent } from './componentes/perfil/verPerfil/verPerfil.component';
import { PortadaComponent } from './componentes/perfil/portada/portada.component';
import { InfoComponent } from './componentes/perfil/info/info.component';
import { ContenidoComponent } from './componentes/perfil/contenido/contenido.component';
import { EditarComponent } from './componentes/editar/editar/editar.component';
import { AgregarpostComponent } from './componentes/perfil/agregarpost/agregarpost.component';
import { PrincipalComponent } from './componentes/acceso/principal/principal.component';
import { BuscadorComponent } from './componentes/acceso/buscador/buscador.component';
import { ListfollowComponent } from './componentes/perfil/listfollow/listfollow.component';
import { VisualizarComponent } from './componentes/perfil/visualizar/visualizar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    VerPerfilComponent,
    PortadaComponent,
    InfoComponent,
    ContenidoComponent,
    EditarComponent,
    AgregarpostComponent,
    PrincipalComponent,
    BuscadorComponent,
    SearchPipe,
    ListfollowComponent,
    VisualizarComponent
  ],
  exports: [
    BuscadorComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    FormsModule
  ],
  providers: [CookieService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
