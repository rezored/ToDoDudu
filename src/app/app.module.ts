import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgbNav, NgbNavItem, NgbNavOutlet, NgbModule, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { GroupsComponent } from './groups/groups.component';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AddEditGroupsComponent } from './side-menu/add-edit-groups/add-edit-groups.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ConfirmDeleteComponent } from './shared/confirm-delete/confirm-delete.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar-component/calendar-component.component';

@NgModule({
    declarations: [
        AppComponent,
        GroupsComponent,
        AddEditGroupsComponent,
        SideMenuComponent,
        ConfirmDeleteComponent,
        CalendarComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterOutlet,
        NgbNav,
        NgbNavItem,
        NgbNavOutlet,
        NgbModule,
        FontAwesomeModule,
        AppRoutingModule,
        RouterLink,
        RouterLinkActive,
        NgbDatepickerModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
