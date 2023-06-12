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
import { LoaderComponent } from './shared/loader/loader.component';
import { FormControlErrorHandlerComponent } from './shared/form-control-error-handler/form-control-error-handler.component';
import { ConfirmDeleteComponent } from './shared/confirm-delete/confirm-delete.component';

@NgModule({
    declarations: [
        AppComponent,
        GroupsComponent,
        AddEditGroupsComponent,
        SideMenuComponent,
        LoaderComponent,
        FormControlErrorHandlerComponent,
        ConfirmDeleteComponent
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
        NgbDatepickerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
