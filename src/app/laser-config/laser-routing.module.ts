import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LaserHomeComponent } from './home/laser-home.component';
import { LaserOperationComponent } from "./laser-operation/laser-operation.component";
import { LaserLayoutComponent } from "./laser-layout/laser-layout.component";
import { LaserProcessComponent } from "./laser-process/laser-process.component";
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LaserLayoutComponent,
                children: [
                    { path: 'process', component: LaserHomeComponent },
                    {

                        path: 'operation',
                        component: LaserOperationComponent


                    }
                ]

            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class LaserRoutingModule { }