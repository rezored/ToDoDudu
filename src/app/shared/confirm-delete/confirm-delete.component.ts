import { Component } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {
  faExclamationTriangle = faExclamationTriangle;

  constructor(public activeModal: NgbActiveModal) {
  }

  onConfirm(): void {
      this.activeModal.close("success");
  }
  onCancel(): void {
      this.activeModal.close("success");
  }
}
