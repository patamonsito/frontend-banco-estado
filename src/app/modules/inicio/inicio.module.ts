import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    InicioPageComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class InicioModule { }
