import { Component } from '@angular/core';
import { faAdd, faEdit, faFolder, faTrash } from "@fortawesome/free-solid-svg-icons";
import { BoardsService } from '../api/services/boards.service';
import { MockService } from '../api/services/mock-service.service';
import { NgbModal, NgbOffcanvas, NgbOffcanvasRef, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Group } from '../api/models/groups';
import { AddEditGroupsComponent } from './add-edit-groups/add-edit-groups.component';
import { ConfirmDeleteComponent } from '../shared/confirm-delete/confirm-delete.component';

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

    active: any = 1;
    boardsData: any;
    availableBoardsArray: any = [];
    closeResult: string = '';

    constructor(
        private mockService: MockService,
        private offcanvasService: NgbOffcanvas,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this.mockService.GetIssues().subscribe((data) => {
            this.boardsData = data;
        });
    }

    addEditGroup(group?: Group): void {
        let offcanvasRef: NgbOffcanvasRef = this.offcanvasService.open(AddEditGroupsComponent, { ariaLabelledBy: 'offcanvas-add-group' });
        offcanvasRef.componentInstance.groupToBeEdited = group;
        offcanvasRef.componentInstance.action = group ? 'edit' : 'add';

        offcanvasRef.closed.subscribe((response) => {
            if (response === 'success') {
                this.getData();
            }
        });
    }

    deleteGroup(group: Group): void {
        const modalConfirmDelete = this.modalService.open(ConfirmDeleteComponent, {
            size: 'md',
            windowClass: 'modal-confirm-delete',
            backdrop: 'static'
        });
        modalConfirmDelete.result.then(() => {
            this.mockService.DeleteGroup(group.id).subscribe((data) => {
                this.getData();
            });
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
}
