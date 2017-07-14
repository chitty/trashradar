import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../../environments/environment';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ComplaintComponent } from './complaint/complaint.component';

import { UserService } from '../common/user';

export const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  bootstrap: [ HomeComponent ],
  declarations: [
    HomeComponent,
    MenuComponent,
    ComplaintComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsAPIKey,
      libraries: ['places'],
    }),
  ],
  providers: [
    UserService,
  ],
  entryComponents: [
    ComplaintComponent,
  ]
})
export class MainModule {}
