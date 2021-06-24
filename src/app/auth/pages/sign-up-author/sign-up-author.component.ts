import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpAuthorService } from '../../services/sign-up-author.service';
import Swal from 'sweetalert2';
import { UtilService } from '../../../services/util.service';
import { Router } from '@angular/router';
import { RegexService } from '../../../services/regex.service';

@Component({
  selector: 'app-sign-up-author',
  templateUrl: './sign-up-author.component.html',
  styleUrls: ['./sign-up-author.component.scss']
})
export class SignUpAuthorComponent implements OnInit {

  formAuthor: FormGroup;
  constructor(
    private fb: FormBuilder,
    private signAuth: SignUpAuthorService,
    private utilService: UtilService,
    private router: Router,
    private regexService: RegexService
  ) {
    this.formAuthor = this.fb.group({
      // author data
      user_name: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      name_author: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(20)]],
      second_last_name: ['', [Validators.required, Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.maxLength(80)]],
      suburb: ['', [Validators.required, Validators.maxLength(80)]],
      postal_code: ['', [Validators.required, Validators.pattern(this.regexService.regexPostalCode())]],
      curp: ['', [Validators.required, Validators.pattern(this.regexService.regexCURP())]],
      rfc: ['', [Validators.required, Validators.pattern(this.regexService.regexRFC())]],
      phone_contact: ['', [Validators.required, Validators.pattern(this.regexService.regexPhone())]],
      email: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      locality: ['', [Validators.required, Validators.maxLength(30)]],
      school: ['', [Validators.required, Validators.maxLength(100)]],
      facebook: ['', [Validators.maxLength(60)]],
      twitter: ['', [Validators.maxLength(30)]],
    });
  }

  ngOnInit(): void {
  }
  registerAuthor(): void {
    this.utilService._loading = true;
    this.signAuth.registerAuth(this.formAuthor.value).subscribe(
      data => {
        if (!data.error) {
          Swal.fire('Exito', 'Se registro correctamente', 'success').then(() => {
            this.router.navigateByUrl('login/sesion');
          });
        } else {
          Swal.fire('Advertencia', 'Usuario duplicado, intenta con otro', 'warning');
        }
      },
      err => {
        console.log(err);
      }
    ).add(() => this.utilService._loading = false);
  }
  curpUpperCase(): void {
    this.formAuthor.get('curp').setValue(this.formAuthor.get('curp').value.toUpperCase());
  }
  rfcUpperCase(): void {
    this.formAuthor.get('rfc').setValue(this.formAuthor.get('rfc').value.toUpperCase());
  }

}
