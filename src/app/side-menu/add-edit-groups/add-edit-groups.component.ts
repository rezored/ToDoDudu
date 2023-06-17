import { Component, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GroupDTO } from 'src/app/api/models/group-dto';
import { ListDTO } from 'src/app/api/models/list-dto';
import { CommonService } from 'src/app/api/services/common.service';
import { MockService } from 'src/app/api/services/mock.service';

@Component({
    selector: 'app-add-edit-groups',
    templateUrl: './add-edit-groups.component.html',
    styleUrls: ['./add-edit-groups.component.scss']
})
export class AddEditGroupsComponent {
    @Input() groupToBeEdited!: GroupDTO;
    @Input() action!: string;

    @Output() reloadGroups!: Function;

    addEditGroups!: FormGroup<any>;
    // this is the prepopulated data for the lists
    // in a real world scenario, this would be fetched from the backend
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

    constructor(
        private mockService: MockService,
        private activeOffcanvas: NgbActiveOffcanvas,
        private commonService: CommonService
    ) { }

    ngOnInit(): void {
        this.createForm();
        this.populateForm();
        if (this.action === 'edit') {
            this.mockService.GetGroup(this.groupToBeEdited.id).subscribe((data) => {
                this.initialListsData = data.lists;
                this.populateForm(this.initialListsData);
            });
        } else {
            this.populateForm(this.initialListsData);
        }
    }

    get name() {
        return this.addEditGroups.get('name') as FormControl;
    }

    get description() {
        return this.addEditGroups.get('description') as FormControl;
    }

    private createForm() {
        this.addEditGroups = new FormGroup({
            name: new FormControl(this.groupToBeEdited?.name, [Validators.required]),
            description: new FormControl(this.groupToBeEdited?.description, [Validators.required]),
            lists: new FormArray([])
        });
    }
    listControls: any;

    populateForm(values?: any) {
        const valueArray = this.addEditGroups.get('lists') as FormArray;
        if (values) {
            valueArray.clear();
            values.forEach((value: any) => {
                valueArray.push(new FormControl(value.name, Validators.required));
            })
        } else {
            this.listControls = valueArray.controls;

        }
    }

    addClaimValue() {
        const valueArray = this.addEditGroups.get('lists') as FormArray;
        valueArray.push(new FormControl(null, [Validators.required]));
    }

    removeClaimValue(index: number) {
        const valueArray = this.addEditGroups.get('lists') as FormArray;
        valueArray.removeAt(index);
    }

    onSubmit() {
        if (this.addEditGroups.valid) {
            let data = this.addEditGroups.value;
            data.lists = data.lists.map((list: any) => {
                return {
                    id: this.commonService.generateRandomString(),
                    name: list,
                    cards: []
                }
            });
            if (this.action === 'edit') {
                this.mockService.UpdateGroup(this.groupToBeEdited.id, data).subscribe((data) => {
                    this.activeOffcanvas.close('success');
                });
                return;
            } else {
                this.mockService.CreateGroup(this.addEditGroups.value).subscribe((data) => {
                    this.activeOffcanvas.close('success');
                });
            }
            this.reloadGroups();
        }
    }

    close() {
        this.activeOffcanvas.close('cancel');
    }
}
