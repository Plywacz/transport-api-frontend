import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {AlertService} from '../../services/alert/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private returnUrl: string;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) {
    // redirect to home if already logged in
    //prevents double login etc - bugging app
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.generateForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  generateForm(): FormGroup {
    return this.fb.group({
      login: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.alertService.wait('Login in progress...');

    this.userService.login(
      this.login.value,
      this.password.value
    )
      .subscribe(data => {
          this.router.navigate([this.returnUrl]);
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
