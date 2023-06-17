import { Component } from '@angular/core';
import { faAdd, faEdit, faFolder, faTrash, faList } from "@fortawesome/free-solid-svg-icons";
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

    boardsData: GroupDTO[] = [];
    closeResult: string = '';
    // the following should be a property of an object
    // but for the sake of simplicity, I will leave it like this
    allCards: number = 0;
    toDoCards: number = 0;
    inProgressCards: number = 0;
    doneCards: number = 0;
    soonToExpireCards: number = 0;

    badgesObj = [
        {
            name: 'All',
            icon: faList,
            value: this.allCards,
        },
        {
            name: 'To Do',
            icon: faList,
            value: this.toDoCards,
        },
        {
            name: 'In Progress',
            icon: faList,
            value: this.inProgressCards,
        },
        {
            name: 'Done',
            icon: faList,
            value: this.doneCards,
        },
    ]
    updatedBadgesSubject: Subject<any[]> = new Subject<any[]>();

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

            allGroups.forEach(group => {
                group.lists.forEach(list => {
                    // this is a very bad practice
                    // in real world scenario, this should be done in the backend
                    list.cards.forEach(card => {
                        let today = new Date();
                        let dueDate = new Date(card.dueDate);
                        let diff = Math.abs(dueDate.getTime() - today.getTime());
                        let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                        if (diffDays <= 3) {
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
                    console.log(this.badgesObj);
                    
                })
            });
            console.log(this.allCards);
            this.updatedBadgesSubject.next(this.badgesObj);})
    }
}
