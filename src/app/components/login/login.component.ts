import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    //todo implement
  }

  clearForm() {

  }

  get login(): AbstractControl {
    return this.loginForm.get('login');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
