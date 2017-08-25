import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', children: [
      { path: '', component: LoginComponent },
      { path: 'reset_password', component: ResetPasswordComponent },
      { path: 'sign_up', component: SignUpComponent },
    ]
  }
];

@NgModule({
  bootstrap: [ LoginComponent ],
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class AuthModule {}
