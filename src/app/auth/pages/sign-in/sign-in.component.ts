import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignInService } from '../../services/sign-in.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UtilService } from '../../../services/util.service';

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
    private router: Router,
    private utilService: UtilService,
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
    this.utilService._loading = true;
    this.sign.loginAuth(this.formSignIn.value).subscribe(
      data => {
        if (!data.error) {
          this.router.navigateByUrl('principal/usuario/registrar-proyecto');
          localStorage.setItem('autor-data', JSON.stringify(data.data));
        } else {
          Swal.fire('Advetencia', data.data.message, 'warning');
        }
      },
      err => {
        console.log(err);
      }
    ).add(() => this.utilService._loading = false);
  }
}
