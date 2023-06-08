import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BoardsService} from "../api/services/boards.service";

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
        if (this.activatedRoute.snapshot.paramMap.has('id')) {
            this.currentBoardId = this.activatedRoute.snapshot.paramMap.get('id');
        }
        this.boardsService.getMockData().subscribe((data) => {
            this.boardsData = data.boards;
            this.currentBoardData = this.boardsData.find((board: any) => board.id === this.currentBoardId);
            console.log(this.currentBoardData);
        });
    }
}
