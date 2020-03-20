import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {forbiddenNameValidator} from '../../shared/name.validator';
import {passwordValidator} from '../../shared/password.validator';
import {UserDto} from '../../models/user-dto';

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
      username: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      password: [''],
      confirmPassword: [''],
    }, {validator: passwordValidator});
  }

  onSubmit(): void {
    this.userService.register({
      username: this.registrationForm.get('username').value,
      password: this.registrationForm.get('password').value,
    })
      .subscribe(response => console.log(response),
        error => console.error(error));
  }


  clearValues() {
    this.registrationForm.reset();
  }

  get username() {
    return this.registrationForm.get('username');
  }
}
