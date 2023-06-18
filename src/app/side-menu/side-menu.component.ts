import { Component } from '@angular/core';
import {
    faAdd, 
    faEdit, 
    faFolder, 
    faTrash, 
    faList, 
    faClipboardList,
    faClipboard,
    faClipboardCheck,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { MockService } from '../api/services/mock.service';
import { NgbModal, NgbOffcanvas, NgbOffcanvasRef, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GroupDTO } from '../api/models/group-dto';
import { AddEditGroupsComponent } from './add-edit-groups/add-edit-groups.component';
import { ConfirmDeleteComponent } from '../shared/confirm-delete/confirm-delete.component';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
    protected readonly faFolder = faFolder;
    protected readonly faEdit = faEdit;
    protected readonly faAdd = faAdd;
    protected readonly faTrash = faTrash;
    protected readonly faList = faList;
    protected readonly faClipboardList = faClipboardList;
    protected readonly faClipboard = faClipboard;
    protected readonly faClipboardCheck = faClipboardCheck;
    protected readonly faTriangleExclamation = faTriangleExclamation;

    boardsData: GroupDTO[] = [];
    closeResult: string = '';
    // the following should be a property of an object
    // but for the sake of simplicity, I will leave it like this
    allCards: number = 0;
    toDoCards: number = 0;
    inProgressCards: number = 0;
    doneCards: number = 0;
    soonToExpireCards: number = 0;

    constructor(
        private mockService: MockService,
        private offcanvasService: NgbOffcanvas,
        private modalService: NgbModal,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getData();
        this.populateBadgesInfo();
    }

    getData(): void {
        this.mockService.GetGroups().subscribe((data) => {
            this.boardsData = data;
        });
    }

    addEditGroup(group?: GroupDTO): void {
        let offcanvasRef: NgbOffcanvasRef = this.offcanvasService.open(AddEditGroupsComponent, { ariaLabelledBy: 'offcanvas-add-group' });
        offcanvasRef.componentInstance.groupToBeEdited = group;
        offcanvasRef.componentInstance.action = group ? 'edit' : 'add';

        offcanvasRef.closed.subscribe((response) => {
            if (response === 'success') {
                this.getData();
                this.router.navigate(['/']);
            }
        });
    }

    deleteGroup(group: GroupDTO): void {
        const modalConfirmDelete = this.modalService.open(ConfirmDeleteComponent, {
            size: 'md',
            windowClass: 'modal-confirm-delete',
            backdrop: 'static'
        });
        modalConfirmDelete.result.then((result) => {
            if (result === 'confirm') {
                this.mockService.DeleteGroup(group.id).subscribe((data) => {
                    this.getData();
                });
            }
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === OffcanvasDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on the backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    populateBadgesInfo(): void {
        this.mockService.GetGroups().subscribe((data) => {
            let allGroups = data;

            // in real world scenario, this should be done in the backend
            // and the data would be sorted by some time slice (for example, by day, month, year, etc.)
            allGroups.forEach(group => {
                group.lists.forEach(list => {
                    // this is a very bad practice
                    // in real world scenario, this should be done in the backend
                    list.cards.forEach(card => {
                        let cardDate = new Date(card.dueDate);
                        let today = new Date();
                        let threeDaysFromNow = new Date();
                        threeDaysFromNow.setDate(today.getDate() + 3);
                  
                        if (cardDate >= today && cardDate <= threeDaysFromNow) {
                          this.soonToExpireCards++;
                        }
                    });

                    // this is a very bad practice
                    // in real world scenario, this should be done in the backend
                    switch (list.name) {
                        case "To Do":
                            this.toDoCards += list.cards.length;
                            break;
                        case "In Progress":
                            this.inProgressCards += list.cards.length;
                            break;
                        case "Done":
                            this.doneCards += list.cards.length;
                            break;
                    }
                    this.allCards += list.cards.length;

                })
            });
        })
    }
}
