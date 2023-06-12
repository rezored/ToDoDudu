import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'src/app/api/models/groups';
import { ListDTO } from 'src/app/api/models/list-dto';
import { MockService } from 'src/app/api/services/mock-service.service';

@Component({
    selector: 'app-add-edit-groups',
    templateUrl: './add-edit-groups.component.html',
    styleUrls: ['./add-edit-groups.component.scss']
})
export class AddEditGroupsComponent {
    @Input() groupToBeEdited!: Group;
    @Input() action!: string;

    addEditGroups!: FormGroup<any>;

    constructor(
        private mockService: MockService,
        private activeOffcanvas: NgbActiveOffcanvas
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    get name() {
        return this.addEditGroups.get('name') as FormControl;
    }

    get description() {
        return this.addEditGroups.get('name') as FormControl;
    }

    private createForm() {
        this.addEditGroups = new FormGroup({
            name: new FormControl(this.groupToBeEdited?.name, [Validators.required]),
            description: new FormControl(this.groupToBeEdited?.description, [Validators.required]),
        });
    }

    initialListsData: ListDTO[] = [
        {
            "id": "1",
            "name": "To Do",
            "cards": []
        },
        {
            "id": "2",
            "name": "In Progress",
            "cards": []
        },
        {
            "id": "3",
            "name": "Done",
            "cards": []
        }
    ];

    onSubmit() {
        if (this.addEditGroups.valid) {
            let data = this.addEditGroups.value;
            data.lists = this.initialListsData;
            this.mockService.CreateGroup(this.addEditGroups.value).subscribe((data) => {
                this.activeOffcanvas.close('success');
            });
        }
    }

    close() {
        this.activeOffcanvas.close('cancel');
    }
}
