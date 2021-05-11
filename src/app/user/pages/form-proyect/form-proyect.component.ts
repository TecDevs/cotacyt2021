import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-proyect',
  templateUrl: './form-proyect.component.html',
  styleUrls: ['./form-proyect.component.scss']
})
export class FormProyectComponent implements OnInit {

  formRegisterProyect: FormGroup;
  formSecondAuthor: FormGroup;
  autors = false;
  constructor(private fb: FormBuilder) {
    this.formRegisterProyect = this.fb.group({
      // TODO: add form parameters
      // proyect data
      project_name: ['', [Validators.maxLength(60), Validators.required]],
      project_description: ['', [Validators.required, Validators.maxLength(1000)]],
      id_sedes: ['', Validators.required],
      id_category: ['', Validators.required],
      url_video: ['', Validators.required],
      id_area: ['', Validators.required],
      id_modality: ['', Validators.required],
      project_image: ['', Validators.required],
      // adviser data
      adviser_name: ['', [Validators.required, Validators.maxLength(30)]],
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
      locality: ['', [Validators.required, , Validators.maxLength(30)]],
      school_institute: ['', [Validators.required, Validators.maxLength(100)]],
      facebook: ['', [Validators.required, Validators.maxLength(50)]],
      twitter: ['', [Validators.required, Validators.maxLength(30)]],
      participation_description: ['', [Validators.required, Validators.maxLength(1000)]],
      image_ine: ['', [Validators.required]],
    });
    this.formSecondAuthor = this.fb.group({
      // Second author data
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
  changeModality(value: any): void {
    console.log(this.autors);
    if (value === '1') {
      this.autors = false;
    } else {
      this.autors = true;
    }
  }
  registerProyect(): void {
    // TODO: consume API
    if (this.autors) {
      // modality one author
    } else {
      // modalityu 2 authors
    }
  }

}
