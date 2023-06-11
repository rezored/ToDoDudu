import { Component } from '@angular/core';
import { faAdd, faEdit, faFolder } from "@fortawesome/free-solid-svg-icons";
import { BoardsService } from './api/services/boards.service';
import { MockServiceService } from './api/services/mock-service.service';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Group } from './api/models/groups';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    protected readonly faFolder = faFolder;
    protected readonly faEdit = faEdit;
    protected readonly faAdd = faAdd;
    active: any = 1;
    boardsData: any;
    availableBoardsArray: any = [];
    closeResult: string = '';


    constructor(
        private boardsService: BoardsService,
        private mockService: MockServiceService,
        private offcanvasService: NgbOffcanvas
    ) { }

    ngOnInit(): void {
        this.countToDoItemsBuCategory();
    }

    countToDoItemsBuCategory(): void {
        this.mockService.GetIssues().subscribe((data) => {
            this.boardsData = data;
            this.boardsData.forEach((board: any) => {
                this.availableBoardsArray.push({ id: board.id, name: board.name });
            });
        });
    }

    fackData: Group = {
        "id": "d12ws",
        "name": "test",
        "description": "Test string",
        "lists": []
    }

    saveData(): void {
        this.mockService.CreateBug(this.fackData).subscribe((data) => {
            console.log("Create data: ", data);
        });
    }

    getData(): void {
        this.mockService.GetIssues().subscribe((data) => {
            console.log("data", data);
        });
    }

    addNewGroup(content: any): void {
        console.log("content", content);
        let offcanvasRef = this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' });
        offcanvasRef.componentInstance.name = 'World';
        
        
        offcanvasRef.result.then(
            (result) => {
                this.closeResult = `Closed with: ${result}`;
            },
            (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            },
        );
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
