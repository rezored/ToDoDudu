import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { GroupsComponent } from "./groups/groups.component"; // CLI imports router
import { CalendarComponent } from './calendar-component/calendar-component.component';


const routes: Routes = [
    { path: '', component: CalendarComponent },
    { path: 'board/:id', component: GroupsComponent },
    // { path: 'second-component', component: SecondComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
