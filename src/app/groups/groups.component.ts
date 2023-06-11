import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BoardsService } from "../api/services/boards.service";

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    currentBoardId: any;
    currentBoardData: any;
    boardsData: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private boardsService: BoardsService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            this.currentBoardId = params.get('id');
            if (this.boardsData) {
                this.currentBoardData = this.boardsData.find((board: any) => board.id === this.currentBoardId);
            }
        });

        this.boardsService.getMockData().subscribe((data) => {
            this.boardsData = data.boards;
            this.currentBoardData = this.boardsData?.find((board: any) => board.id === this.currentBoardId);
            console.log(this.currentBoardData);
        });
    }
}
