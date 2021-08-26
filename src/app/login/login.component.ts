import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });



  constructor(private authService: LoginServiceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getLoggedIn()) {
        const redirectUrl = '/events';
        this.router.navigate([redirectUrl]);
      }
  }

 validateEmail(email : String) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  onSubmit(): void {
    if (this.validateEmail(this.loginForm.value.email) == false)
      return;
    this.authService.login(this.loginForm.value).subscribe(() => {
    if (this.authService.getLoggedIn()) {
        const redirectUrl = '/events';
        this.router.navigate([redirectUrl]);
      }
    });
  }

}
