import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {forbiddenNameValidator} from '../../shared/name.validator';
import {passwordValidator} from '../../shared/password.validator';
import {AlertService} from '../../services/alert/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private alertService: AlertService,
              private router: Router) {
    //prevents accessing registration form if logged in
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }

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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    }, {validator: passwordValidator});
  }

  onSubmit(): void {
    this.alertService.clear(); // ensure there are no alerts

    this.alertService.wait('Registration in progress');

    this.userService.register(this.username.value, this.password.value)
      .subscribe(
        data => { //todo try to BOLD data.username (try sending message in paragraph -> <p></p>)
          this.alertService.success('Hi ' + data.username + ' your account has been created successfully,\n now you can login to app');
        },
        error => {
          const msg = 'Registration failed: ' + error.error.message || error.error.statusText;
          this.alertService.error(msg);
        }
      );
    this.clearForm();
  }

  clearForm() {
    this.registrationForm.reset();
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }
}
