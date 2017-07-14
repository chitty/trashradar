import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';

import { DjangoClientService } from './common/django-client';
import { AuthService, AuthGuard } from './common/auth';
import { ComplaintService } from './common/complaint';
import { TrStoreModule } from './common/store/store.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './landing/nav-bar/nav-bar.component';
import { HeaderComponent } from './landing/header/header.component';
import { DetailComponent } from './landing/detail/detail.component';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './landing/about/about.component';
import { LogoComponent} from './common/logo/logo.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'app', loadChildren: 'app/main/main.module#MainModule', canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavBarComponent,
    HeaderComponent,
    DetailComponent,
    AboutComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    Ng2Webstorage,
    TrStoreModule
  ],
  providers: [
    DjangoClientService.provider(),
    AuthService,
    ComplaintService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
