import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignInService } from '../../services/sign-in.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formSignIn: FormGroup;
  constructor(
    private fb: FormBuilder,
    private sign: SignInService,
    ) {
    this.formSignIn = this.fb.group({
      // TODO: datos de login
      user: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {
  }

  signIn(): void {
    // TODO: consume API
    this.sign.loginAuth( this.formSignIn.value ).subscribe(
      data => {

      },

      err => {
        
      }
    );
    
  }

}
