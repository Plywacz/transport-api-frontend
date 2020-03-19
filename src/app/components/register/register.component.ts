import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
   more advanced example https://www.youtube.com/watch?v=3_dFnULt3FA&list=PLC3y8-rFHvwhwL-XH04cHOpJnkgRKykFi&index=21
  */
  private generateFormGroup() {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [''],
      confirmPassword: ['']
    });
  }

  onSubmit(): void {

  }

  clearValues() {
    this.registrationForm.reset();
  }

  get username() {
    return this.registrationForm.get('username');
  }
}
