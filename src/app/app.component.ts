import {Component} from '@angular/core';
import {faAdd, faEdit, faFolder} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    active: any = 1;

    saveData(): void {
        const data = {name: 'John', age: 30};
        localStorage.setItem('myData', JSON.stringify(data));
    }

    getData(): void {
        const storedData = localStorage.getItem('myData');
        if (storedData) {
            const data = JSON.parse(storedData);
            console.log(data);
        }
    }

    protected readonly faFolder = faFolder;
    protected readonly faEdit = faEdit;
    protected readonly faAdd = faAdd;
}
