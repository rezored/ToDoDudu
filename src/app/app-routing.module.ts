import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupsComponent} from "./groups/groups.component"; // CLI imports router

const routes: Routes = [
    { path: 'board/:id', component: GroupsComponent },
    // { path: 'second-component', component: SecondComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
