import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-author',
  templateUrl: './sign-up-author.component.html',
  styleUrls: ['./sign-up-author.component.scss']
})
export class SignUpAuthorComponent implements OnInit {

  formAuthor: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formAuthor = this.fb.group({
      // author data
      user_name: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      name_author: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(20)]],
      second_last_name: ['', [Validators.required, Validators.maxLength(20)]],
      address: ['', [Validators.required], Validators.maxLength(80)],
      suburb: ['', [Validators.required], Validators.maxLength(80)],
      postal_code: ['', [Validators.required], Validators.maxLength(5)],
      curp: ['', [Validators.required, Validators.maxLength(18)]],
      rfc: ['', [Validators.required, Validators.maxLength(13)]],
      phone_contact: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      locality: ['', [Validators.required, Validators.maxLength(30)]],
      school: ['', [Validators.required, Validators.maxLength(100)]],
      facebook: ['', [Validators.required, Validators.maxLength(60)]],
      twitter: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  ngOnInit(): void {
  }
  registerAuthor(): void {
    // TODO: consume api
    console.log(this.formAuthor.value);
  }

}
