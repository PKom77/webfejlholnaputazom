import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTicketsComponent } from './my-tickets.component';

const routes: Routes = [{ path: '', component: MyTicketsComponent },
{ path: 'view', loadChildren: () => import('./view/view.module').then(m => m.ViewModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTicketsRoutingModule { }
