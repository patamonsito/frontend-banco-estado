import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransferirRoutingModule } from './transferir-routing.module';
import { TransferirPageComponent } from './pages/transferir-page/transferir-page.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TransferirPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TransferirRoutingModule,
    SharedModule
  ]
})
export class TransferirModule { }
