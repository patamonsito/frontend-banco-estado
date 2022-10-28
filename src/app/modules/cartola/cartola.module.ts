import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CartolaRoutingModule } from './cartola-routing.module';
import { CartolaPageComponent } from './pages/cartola-page/cartola-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CartolaPageComponent
  ],
  imports: [
    CommonModule,
    CartolaRoutingModule,
    SharedModule
  ]
})
export class CartolaModule { }
