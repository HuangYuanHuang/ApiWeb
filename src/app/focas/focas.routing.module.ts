import { RouterModule } from "@angular/router";
import { FocasHomeComponent } from "./home/focas-home.component";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: FocasHomeComponent,

            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FocasRoutingModule { }