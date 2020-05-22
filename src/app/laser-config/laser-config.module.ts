import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LaserHomeComponent } from './home/laser-home.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { LaserRoutingModule } from './laser-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { LaserProcessComponent } from './laser-process/laser-process.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LaserOperationComponent } from './laser-operation/laser-operation.component';
import { LaserLayoutComponent } from './laser-layout/laser-layout.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [
    LaserHomeComponent,
    LaserProcessComponent,
    LaserOperationComponent,
    LaserLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    LaserRoutingModule,
    NzTabsModule,
    NzTableModule,
    NzSelectModule,
    NzPopconfirmModule,
    DragDropModule,
    NzTagModule,
    NzCardModule,
    NzModalModule,
    NzPageHeaderModule,
    NzDividerModule
  ]
})

export class LaserConfigModule {

}
