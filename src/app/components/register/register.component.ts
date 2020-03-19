import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor() {
    this.registrationForm = this.generateFormGroup();
  }

  private generateFormGroup() {
    return new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.registrationForm.value);
  }

  clearValues() {
    this.registrationForm.reset();
  }
}
