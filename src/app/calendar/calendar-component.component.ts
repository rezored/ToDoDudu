import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    startOfDay,
    subDays,
    isSameDay,
    isSameMonth,
    parseISO
} from 'date-fns';
import { Subject } from 'rxjs';
import {
    CalendarEvent,
    CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { MockService } from '../api/services/mock.service';
import { GroupDTO } from '../api/models/group-dto';

const colors: Record<string, EventColor> = {
    green: {
        primary: '#148a2b',
        secondary: '#ace7b8',
    },
    blue: {
        primary: '#3a80c8',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#ffd34e',
        secondary: '#FDF1BA',
    },
};

@Component({
    selector: 'app-calendar-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './calendar-component.component.html',
    styleUrls: ['./calendar-component.component.scss']
})
export class CalendarComponent {
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    events: CalendarEvent[] = [];
    refresh = new Subject<void>();
    start: Date = subDays(startOfDay(new Date()), 1);
    end: Date = new Date();
    activeDayIsOpen: boolean = true;

    constructor(
        private mockService: MockService
    ) { }

    setColorByTask(listName: string): EventColor {
        switch (listName) {
            case 'To Do':
                return colors['blue'];
            case 'In Progress':
                return colors['yellow'];
            case 'Done':
                return colors['green'];
            default:
                return colors['blue'];
        }
    }

    ngOnInit() {
        this.mockService.GetGroups().subscribe((data: GroupDTO[]) => {
            let boardsData: GroupDTO[] = data;
            boardsData.map((board: any) => {
                board.lists.forEach((list: any) => {
                    list.cards.forEach((card: any) => {
                        this.events.push({
                            start: parseISO(card.createdDate),
                            end: parseISO(card.dueDate),
                            title: `${list.name} - ${card.name}`,
                            color: this.setColorByTask(list.name),
                            allDay: true,
                            resizable: {
                                beforeStart: true,
                                afterEnd: true,
                            },
                            draggable: true,
                        });
                    });
                });
            });
            this.refresh.next();
        });

    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }
}
