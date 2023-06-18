import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MockService } from '../api/services/mock.service';
import { faPlus, faPlay, faCheck, faTrash, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Card } from '../api/models/card-dto';
import { CommonService } from '../api/services/common.service';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    protected readonly faPlus = faPlus;
    protected readonly faPlay = faPlay;
    protected readonly faCheck = faCheck;
    protected readonly faTrash = faTrash;
    protected readonly faEllipsisV = faEllipsisV;

    todoForm!: FormGroup<any>;
    currentBoardId: any;
    currentGroupData: any;
    boardsData: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private mockService: MockService,
        private modalService: NgbModal,
        private commonService: CommonService
    ) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            this.currentBoardId = params.get('id');
            this.populateBoardData();
        });
        this.createForm();
    }

    createForm(): void {
        this.todoForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            description: new FormControl("", [Validators.required]),
            dueDate: new FormControl("", [Validators.required])
        });
    }

    get name() {
        return this.todoForm.get('name') as FormControl;
    }

    get description() {
        return this.todoForm.get('description') as FormControl;
    }

    get dueDate() {
        return this.todoForm.get('dueDate') as FormControl;
    }

    populateBoardData(): void {
        this.mockService.GetGroups().subscribe((data) => {
            this.boardsData = data;
            this.currentGroupData = this.boardsData?.find((board: any) => board.id === this.currentBoardId);
        });
    }

    openAddTodoModal(content: any): void {
        this.modalService.open(content, {
            size: 'md',
            centered: true,
            backdrop: 'static',
            keyboard: false
        });
    }

    createTodo(): void {
        if (this.todoForm.invalid) {
            this.markFormGroupAsTouched(this.todoForm);
            return;
        }
        if (this.todoForm.valid) {
            const newTodo: Card = {
                id: this.commonService.generateRandomString(),
                name: this.todoForm.value.name,
                description: this.todoForm.value.description,
                dueDate: this.todoForm.value.dueDate,
                createdDate: new Date(),
                labels: []
            };

            // this is a mock service, so we need to get the data, update it and then send it back
            // in a real world scenario, we would just send the new todo to the backend and it would be saved there
            this.mockService.GetGroup(this.currentGroupData.id).subscribe((data) => {
                data.lists[0].cards.push(newTodo)
                this.mockService.UpdateGroup(this.currentGroupData.id, data).subscribe((data) => {
                    this.populateBoardData();
                    this.modalService.dismissAll();
                });
            });
        }
    }

    // this is a mock service, so we need to get the data, update it and then send it back
    // in a real world scenario, we would just use un update service to the backend and it would change the status of the todo
    startProgress(card: Card): void {
        this.mockService.GetGroup(this.currentGroupData.id).subscribe((data) => {
            data.lists[0].cards = data.lists[0].cards.filter((c: Card) => c.id !== card.id);
            data.lists[1].cards.push(card)
            this.mockService.UpdateGroup(this.currentGroupData.id, data).subscribe((data) => {
                this.populateBoardData();
            });
        });
    }

    // this is a mock service, so we need to get the data, update it and then send it back
    // in a real world scenario, we would just use un update service to the backend and it would change the status of the todo
    completeProgress(card: Card): void {
        this.mockService.GetGroup(this.currentGroupData.id).subscribe((data) => {
            data.lists[1].cards = data.lists[1].cards.filter((c: Card) => c.id !== card.id);
            data.lists[2].cards.push(card)
            this.mockService.UpdateGroup(this.currentGroupData.id, data).subscribe((data) => {
                this.populateBoardData();
            });
        });
    }

    // this is a mock service, so we need to get the data, update it and then send it back
    // in a real world scenario, we would just use un update service to the backend and it would change the status of the todo
    deleteCard(card: Card, listItem: any): void {
        this.mockService.GetGroup(this.currentGroupData.id).subscribe((data) => {
            // @ts-ignore
            data.lists.find((l: any) => l.id === listItem.id)?.cards.splice(data.lists.find((l: any) => l.id === listItem.id)?.cards.findIndex((c: Card) => c.id === card.id));
            this.mockService.UpdateGroup(this.currentGroupData.id, data).subscribe((data) => {
                this.populateBoardData();
            });
        });
    }

    // this is a mock service, so we need to get the data, update it and then send it back
    // in a real world scenario, we would just use un update service to the backend and it would change the status of the todo
    editCard(card: Card, listItemID: number): void {
        this.mockService.GetGroup(this.currentGroupData.id).subscribe((data) => {
            data.lists[listItemID].cards = data.lists[listItemID].cards.filter((c: Card) => c.id !== card.id);
            this.mockService.UpdateGroup(this.currentGroupData.id, data).subscribe((data) => {
                this.populateBoardData();
            });
        });
    }

    markFormGroupAsTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupAsTouched(control);
            }
        });
    }

    expandCard(card: Card): void {
        card.isExpanded = !card.isExpanded;
    }
}
