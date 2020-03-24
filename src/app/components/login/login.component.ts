import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private alertService: AlertService, //todo: - after successfully login, redirect to whole new page with navi bar etc, so that alert wont be needed
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.generateForm();
  }

  generateForm(): FormGroup {
    return this.fb.group({
      login: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.alertService.wait('Login in progress...');

    this.userService.login({
      username: this.login.value,
      password: this.password.value
    })
      .subscribe(data => {
          this.alertService.success(data.token);//todo implement
        },
        error => {
          let msg = 'Login failed - ' + (error.error ? error.error : 'unknown error');
          this.alertService.error(msg);
        });
    this.clearForm();
  }

  clearForm() {
    this.loginForm.reset();
  }

  get login(): AbstractControl {
    return this.loginForm.get('login');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
