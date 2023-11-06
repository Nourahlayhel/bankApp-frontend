import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/login.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
  exports: [LoginComponent],
})
export class LoginModule {}
