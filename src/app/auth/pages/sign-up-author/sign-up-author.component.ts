import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpAuthorService } from '../../services/sign-up-author.service';
import Swal from 'sweetalert2';
import { UtilService } from '../../../services/util.service';
import { Router } from '@angular/router';

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
      postal_code: ['', [Validators.required, Validators.maxLength(5)]],
      curp: ['', [Validators.required, Validators.maxLength(18)]],
      rfc: ['', [Validators.required, Validators.maxLength(13)]],
      phone_contact: ['', [Validators.required, Validators.maxLength(10)]],
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
    console.log(this.formAuthor.value);
    this.utilService._loading = true;
    // TODO: consume api
    this.signAuth.registerAuth(this.formAuthor.value).subscribe(
      data => {
        console.log(data);
        if (!data.error) {
          Swal.fire('Exito', 'Se registro correctamente', 'success').then(() => {
            this.router.navigateByUrl('auth/sign-in');
          });
        } else {
          Swal.fire('Advertencia', data.data.message, 'warning');
        }
      },
      err => {
        console.log(err);
      }
    ).add(() => this.utilService._loading = false);
  }

}
