import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {
    path: 'accounts',
    pathMatch: 'full',
    loadChildren: () =>
      import('./user-accounts/user-accounts.module').then(
        (m) => m.UserAccountsModule
      ),
    canLoad: [AuthenticationGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./login/login/login.module').then((m) => m.LoginModule),
    canLoad: [LoginGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
