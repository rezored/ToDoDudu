import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MockService } from '../api/services/mock-service.service';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Card } from '../api/models/card-dto';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    protected readonly faPlus = faPlus;

    todoForm!: FormGroup<any>;
    currentBoardId: any;
    currentBoardData: any;
    boardsData: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private mockService: MockService,
        private modalService: NgbModal
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

    populateBoardData(): void {
        this.mockService.GetIssues().subscribe((data) => {
            this.boardsData = data;
            this.currentBoardData = this.boardsData?.find((board: any) => board.id === this.currentBoardId);
            console.log(this.currentBoardData);

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
        if (this.todoForm.valid) {
            const newTodo: Card = {
                id: Math.random().toString(),
                name: this.todoForm.value.name,
                description: this.todoForm.value.description,
                dueDate: this.todoForm.value.dueDate,
                createdDate: new Date().toISOString(),
                labels: []
            };

            this.mockService.GetIssue(this.currentBoardData.id).subscribe((data) => {
                data.lists[0].cards.push(newTodo)
                this.mockService.UpdateGroup(this.currentBoardData.id, data).subscribe((data) => {
                    this.populateBoardData();
                    this.modalService.dismissAll();
                });
            });
        }
    }

    startProgress(card: Card): void {
        this.mockService.GetIssue(this.currentBoardData.id).subscribe((data) => {
            data.lists[0].cards = data.lists[0].cards.filter((c: Card) => c.id !== card.id);
            data.lists[1].cards.push(card)
            this.mockService.UpdateGroup(this.currentBoardData.id, data).subscribe((data) => {
                this.populateBoardData();
            });
        });
    }

    completeProgress(card: Card): void {
        this.mockService.GetIssue(this.currentBoardData.id).subscribe((data) => {
            data.lists[1].cards = data.lists[1].cards.filter((c: Card) => c.id !== card.id);
            data.lists[2].cards.push(card)
            this.mockService.UpdateGroup(this.currentBoardData.id, data).subscribe((data) => {
                this.populateBoardData();
            });
        });
    }
}
