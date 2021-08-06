import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProducersPage } from './producers.page';

const routes: Routes = [


  {
    path: 'tabs',
    component: ProducersPage,
    children: [
      {
        path: 'all-producers',
        loadChildren: () => import('./all-producers/all-producers.module').then( m => m.AllProducersPageModule)
      },
      {
        path: 'add-new',
        loadChildren: () => import('./add-new/add-new.module').then( m => m.AddNewPageModule)
      },
      {
        path: '',
        redirectTo: '/producers/tabs/all-producers',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/producers/tabs/all-producers',
    pathMatch: 'full'
  },
  /*
  {
    path: '',
    component: ProducersPage
  },
  {
    path: 'all-producers',
    loadChildren: () => import('./all-producers/all-producers.module').then( m => m.AllProducersPageModule)
  },
  {
    path: 'add-new',
    loadChildren: () => import('./add-new/add-new.module').then( m => m.AddNewPageModule)
  }
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProducersPageRoutingModule {}
