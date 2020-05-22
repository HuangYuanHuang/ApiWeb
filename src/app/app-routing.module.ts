import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

const routes: Routes = [
  { path: '', redirectTo: '/laser/process', pathMatch: 'full' },
  // {
  //   path: 'focas',
  //   loadChildren: () => import('./focas/focas.module').then(m => m.FocasModule), 
  //   data: { preload: true }
  // },
  {
    path: 'laser',
    loadChildren: () => import('./laser-config/laser-config.module').then(m => m.LaserConfigModule),
    data: { preload: true }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
