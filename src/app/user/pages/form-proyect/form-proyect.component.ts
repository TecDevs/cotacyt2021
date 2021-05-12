import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormProyectService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-proyect',
  templateUrl: './form-proyect.component.html',
  styleUrls: ['./form-proyect.component.scss']
})
export class FormProyectComponent implements OnInit {

  formRegisterProyect: FormGroup;
  formSecondAuthor: FormGroup;
  autors = false;
  constructor(
    private fb: FormBuilder,
    private authService: FormProyectService
    ) 
    
    {
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
    console.log(this.formRegisterProyect.value.id_category);

    switch ( this.formRegisterProyect.value.id_category ) { 

      case 'PETIT':
        window.open("https://drive.google.com/file/d/1U230peNB_6XEXcF2hWIFvonsOWkQp1eO/view?usp=sharing", "_blank");
      break;

      case 'KIDS':
        window.open("https://drive.google.com/file/d/1gZ0RKrFM9euxNFjEohR7z6AAvO9eccYT/view?usp=sharing", "_blank");
      break;

      case 'JUVENIL':
        window.open("https://drive.google.com/file/d/1SezhWNgY64atINHHRBl27R_ue6Etxgxe/view?usp=sharing", "_blank");
      break;

      case 'MEDIA SUPERIOR':
        window.open("https://drive.google.com/file/d/1y6_meM3CgML4ZEsMJrI5ROg6JjGuCTm4/view?usp=sharing", "_blank");
      break;

      case 'SUPERIOR':
        window.open("https://drive.google.com/file/d/16pHHUHS2k46i5PKMNHTacyEi-GxfyJEJ/view?usp=sharing", "_blank");
      break;

      case 'POSGRADO':
        window.open("https://drive.google.com/file/d/1z_E9WPMvSCt82rBr6IANSE2Bkl_fNVgv/view?usp=sharing", "_blank");
      break;

    }
    
    
    // TODO: consume API
    if (this.autors) {
      // modality one author
      this.authService.registerAuth(this.formRegisterProyect.value).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            text: 'Registro exitoso'
          });
        },

        error => {
          Swal.fire({
            icon: 'warning',
            text: 'Registro inconcluso'
          });
        }
      )
    } else {
      // modalityu 2 authors
    }
  }

}
