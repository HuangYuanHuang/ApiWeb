import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-focas-connect',
  templateUrl: './focas-connect.component.html',
  styleUrls: ['./focas-connect.component.css']
})
export class FocasConnectComponent implements OnInit {
  validateForm: FormGroup;
  @Output('connectCnc') connectCnc = new EventEmitter<any>();
  private ip: string = "192.168.21.169";
  private port: number = 8193;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.connectCnc?.emit({ Ip: this.ip, Port: this.port });
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      ip: [null, [Validators.required]],
      port: [null, [Validators.required]],
      remember: [true]
    });
  }

}
