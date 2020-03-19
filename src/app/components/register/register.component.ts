import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
    this.registrationForm = this.generateFormGroup();
  }

  /*
  more verbose version of this code:
   private generateFormGroup() {
     return new FormGroup({
       username: new FormControl(''),
       password: new FormControl(''),
       confirmPassword: new FormControl('')
     });
   }
  */
  private generateFormGroup() {
      return this.fb.group({
        username: [''],
        password: [''],
        confirmPassword: ['']
      });
  }

  onSubmit(): void {
  }

  clearValues() {
    this.registrationForm.reset();
  }
}
