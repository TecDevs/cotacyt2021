import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up-author',
  templateUrl: './sign-up-author.component.html',
  styleUrls: ['./sign-up-author.component.scss']
})
export class SignUpAuthorComponent implements OnInit {

  formAuthor: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formAuthor = this.fb.group({
      // todo: datos
    });
  }

  ngOnInit(): void {
  }

}
