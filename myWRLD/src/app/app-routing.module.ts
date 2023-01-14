import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/acceso/login/login.component';
import { RegisterComponent } from './componentes/acceso/register/register.component';
import { VerPerfilComponent } from './componentes/perfil/verPerfil/verPerfil.component';
import { EditarComponent } from './componentes/editar/editar/editar.component';
import { UserGuardGuard } from './guard/user-guard.guard';
import { UserInitGuardGuard } from './guard/user-init-guard.guard';
import { PrincipalComponent } from './componentes/acceso/principal/principal.component';
import { ListfollowComponent } from './componentes/perfil/listfollow/listfollow.component';
import { VisualizarComponent } from './componentes/perfil/visualizar/visualizar.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent, canActivate: [UserGuardGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UserInitGuardGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UserInitGuardGuard] },
  { path: 'perfil/:username', component: VerPerfilComponent, canActivate: [UserGuardGuard] },
  { path: 'edit/:username', component: EditarComponent, canActivate: [UserGuardGuard]  },
  { path: 'followers/:username', component: ListfollowComponent, canActivate: [UserGuardGuard]  },
  { path: 'following/:username', component: ListfollowComponent, canActivate: [UserGuardGuard]  },
  { path: 'message/:id', component: VisualizarComponent, canActivate: [UserGuardGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }