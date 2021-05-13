import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormProyectService } from '../../services/form-proyect.service';
import Swal from 'sweetalert2';

import { CampusService } from '../../../services/campus.service';
import { AreasService } from '../../../services/areas.service';
import { CategoryService } from '../../../services/category.service';
import { ModalityService } from '../../../services/modality.service';
import { AreaInterface } from '../../../models/area.model';
import { CampusInterface } from '../../../models/campus.model';
import { ModalityInterface } from '../../../models/modality.model';
import { CategoryInterface } from '../../../models/category.model';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-form-proyect',
  templateUrl: './form-proyect.component.html',
  styleUrls: ['./form-proyect.component.scss']
})

export class FormProyectComponent implements OnInit {

  formRegisterProyect: FormGroup;
  formSecondAuthor: FormGroup;
  autors = false;
  @ViewChild('project_image', {
    read: ElementRef
  }) project_image: ElementRef;

  @ViewChild('image_ine', {
    read: ElementRef
  }) image_ine: ElementRef;

  areas: AreaInterface[];
  campus: CampusInterface[];
  modalities: ModalityInterface[];
  categories: CategoryInterface[];


  constructor(
    private fb: FormBuilder,
    private authService: FormProyectService,
    private campusService: CampusService,
    private areaService: AreasService,
    private categoryService: CategoryService,
    private modalityService: ModalityService,
    private utilService: UtilService,

  ) {

    this.formRegisterProyect = this.fb.group({
      // TODO: add form parameters
      // proyect data
      project_name: ['', [Validators.maxLength(60), Validators.required]],
      project_description: ['', [Validators.required, Validators.maxLength(1000)]],
      id_sedes: ['', Validators.required],
      author_id: [JSON.parse(localStorage.getItem('autor-data')).id_autores],
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
      facebook: ['', [Validators.required, Validators.maxLength(60)]],
      twitter: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  ngOnInit(): void {
    this.utilService._loading = true;
    forkJoin({
      allAreas: this.areaService.getAll(),
      allModalities: this.modalityService.getAll(),
      allCategories: this.categoryService.getAll(),
      allCampus: this.campusService.getAll(),
    }).subscribe(data => {
      if (data.allAreas.error || data.allCampus.error || data.allCategories.error || data.allModalities.error) {
        Swal.fire('Error', 'Ocurrio un error al cargar los datos', 'error');
      } else {
        this.areas = data.allAreas.data;
        this.campus = data.allCampus.data;
        this.modalities = data.allModalities.data;
        this.categories = data.allCategories.data;
      }
    }).add(() => this.utilService._loading = false);
  }

  changeModality(value: any): void {
    if (value === '1') {
      this.autors = false;
    } else {
      this.autors = true;
    }
    console.log(this.autors);
  }

  registerProyect(file: FileList): void {
    console.log(this.formRegisterProyect.value);

    const projectImage = this.project_image.nativeElement.files[0];
    const imageIne = this.image_ine.nativeElement.files[0];
    const fr: any = new FormData();


    fr.append('project_name', this.formRegisterProyect.value.project_name);
    fr.append('project_description', this.formRegisterProyect.value.project_description);
    fr.append('id_sedes', this.formRegisterProyect.value.id_sedes);
    fr.append('id_category', this.formRegisterProyect.value.id_category);
    fr.append('author_id',this.formRegisterProyect.value.author_id);
    fr.append('url_video', this.formRegisterProyect.value.url_video);
    fr.append('id_area', this.formRegisterProyect.value.id_area);
    fr.append('id_modality', this.formRegisterProyect.value.id_modality);
    fr.append('project_name', this.formRegisterProyect.value.project_name);
    fr.append('project_image', projectImage);
    fr.append('adviser_name', this.formRegisterProyect.value.adviser_name);
    fr.append('last_name', this.formRegisterProyect.value.last_name);
    fr.append('second_last_name', this.formRegisterProyect.value.second_last_name);
    fr.append('address', this.formRegisterProyect.value.address);
    fr.append('suburb', this.formRegisterProyect.value.suburb);
    fr.append('postal_code', this.formRegisterProyect.value.postal_code);
    fr.append('curp', this.formRegisterProyect.value.curp);
    fr.append('rfc', this.formRegisterProyect.value.rfc);
    fr.append('phone_contact', this.formRegisterProyect.value.phone_contact);
    fr.append('email', this.formRegisterProyect.value.email);
    fr.append('city', this.formRegisterProyect.value.city);
    fr.append('locality', this.formRegisterProyect.value.locality);
    fr.append('school_institute', this.formRegisterProyect.value.school);
    fr.append('facebook', this.formRegisterProyect.value.facebook);
    fr.append('twitter', this.formRegisterProyect.value.project_name);
    fr.append('participation_description', this.formRegisterProyect.value.participation_description);
    fr.append('image_ine', imageIne);

    console.log(fr);

    // TODO: consume API
    if (!this.autors) {
      // modality 2 author
      fr.append('second_author', JSON.stringify(this.formSecondAuthor.value));
      this.authService.registerProjectWithTwoAuthors(fr).subscribe(
        data => {
          console.log(data);
          if( !data.error ) {
            Swal.fire({
              icon: 'success',
              text: 'Registro exitoso'
            });
            this.returnPageDocument(this.formRegisterProyect.value.id_category);
          }
        },
        err => {
          console.log(err);
          
        }
      );

    }
    this.authService.registerProject(fr).subscribe(
      data => {
        if( !data.error ) {
          console.log(data);
          Swal.fire({
            icon: 'success',
            text: 'Registro exitoso'
          });
          this.returnPageDocument(this.formRegisterProyect.value.id_category);
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          icon: 'warning',
          text: 'Registro inconcluso'
        });
      }
    );
  }


  returnPageDocument(id: string) {
    switch (id) {
      case '1':
        window.open('https://drive.google.com/file/d/1U230peNB_6XEXcF2hWIFvonsOWkQp1eO/view?usp=sharing', '_blank');
        break;
      case '2':
        window.open('https://drive.google.com/file/d/1gZ0RKrFM9euxNFjEohR7z6AAvO9eccYT/view?usp=sharing', '_blank');
        break;
      case '3':
        window.open('https://drive.google.com/file/d/1SezhWNgY64atINHHRBl27R_ue6Etxgxe/view?usp=sharing', '_blank');
        break;
      case '4':
        window.open('https://drive.google.com/file/d/1y6_meM3CgML4ZEsMJrI5ROg6JjGuCTm4/view?usp=sharing', '_blank');
        break;
      case '5':
        window.open('https://drive.google.com/file/d/16pHHUHS2k46i5PKMNHTacyEi-GxfyJEJ/view?usp=sharing', '_blank');
        break;
      case '6':
        window.open('https://drive.google.com/file/d/1z_E9WPMvSCt82rBr6IANSE2Bkl_fNVgv/view?usp=sharing', '_blank');
        break;
    }
  }

}
