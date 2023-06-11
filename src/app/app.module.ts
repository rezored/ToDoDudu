import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgbNav, NgbNavItem, NgbNavOutlet, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GroupsComponent} from './groups/groups.component';
import {AppRoutingModule} from "./app-routing.module";
import { HttpClientModule} from "@angular/common/http";
import { AddEditGroupsComponent } from './add-edit-groups/add-edit-groups.component';

@NgModule({
    declarations: [
        AppComponent,
        GroupsComponent,
        AddEditGroupsComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        RouterOutlet,
        NgbNav,
        NgbNavItem,
        NgbNavOutlet,
        NgbModule,
        FontAwesomeModule,
        AppRoutingModule,
        RouterLink,
        RouterLinkActive
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
