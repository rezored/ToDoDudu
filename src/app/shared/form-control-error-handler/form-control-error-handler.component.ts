import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-error-handler',
  templateUrl: './form-control-error-handler.component.html',
  styleUrls: ['./form-control-error-handler.component.scss']
})
export class FormControlErrorHandlerComponent {
  @Input() control: FormControl | undefined;
  @Input() fieldLabel: string | undefined;

constructor() { }

  ngOnInit() {
  }
}
