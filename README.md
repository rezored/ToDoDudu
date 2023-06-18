# ToDoDuDu
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

## Development server
Run `json-server --watch database.json` from the backend folder
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# What does work
On the side menu:
- All, To Do, In Progress, Done, and Soon to expire - badges are working with the mock data and show the correct numbers
- groups are working and can be added, edited, and deleted. Within the edit offcanvas you can edit the name, description and the lists 
!!! IMPORTANT !!! - If you open the groups to edit and seva the data, the task within this group will be deleted !!! IMPORTANT !!!
- each group has its own task and by pressing the play button the task will go to In Progress and with the checkmark - in the done section
- if another section is added, the task will be assigned there, as the mock server I use has some restrictions and such functions will take a lot of time and vanilla JS
- each of the cards can be deleted (TODO: Edited)
- new task are added within the group menu from the + Add new ToDo

# What was not done because of mock sever restrictions
- the All, To Do, In Progress, Done, and Soon to expire were going to be buttons that lead to a table with the corresponding task list
- the home calendar - the option to add/edit task 
- task - have a grief - Urgent / Not urgent with a color palette
- overall design :)

# What is comming next
- API
- total components rework to remove the ts and use the API response code 
