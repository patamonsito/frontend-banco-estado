import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('@modules/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'transferir',
    loadChildren: () => import('@modules/transferir/transferir.module').then(m => m.TransferirModule)
  },
  {
    path: 'cartola',
    loadChildren: () => import('@modules/cartola/cartola.module').then(m => m.CartolaModule)
  },
  {
    path: '**',
    redirectTo: '/inicio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
