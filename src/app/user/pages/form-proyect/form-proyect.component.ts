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
import { RegexService } from '../../../services/regex.service';
import jsPDF from 'jspdf';
import { HttpEventType } from '@angular/common/http';
import { LevelEnglishService } from '../../../services/level-english.service';
import { Autor } from '../../../models/autor.model';
import { ProyectDataModel } from '../../../models/projectData.model';

@Component({
  selector: 'app-form-proyect',
  templateUrl: './form-proyect.component.html',
  styleUrls: ['./form-proyect.component.scss']
})

export class FormProyectComponent implements OnInit {

  formRegisterProyect: FormGroup;
  formSecondAuthor: FormGroup;
  autors = false;
  terminado = false;
  autorData: Autor;
  proyectData: any;
  @ViewChild('project_image', {
    read: ElementRef
  }) projectImage: ElementRef;

  @ViewChild('image_ine', {
    read: ElementRef
  }) imageIne: ElementRef;

  areas: AreaInterface[];
  campus: CampusInterface[];
  modalities: ModalityInterface[];
  categories: CategoryInterface[];
  levelsEnglish: any;
  constructor(
    private fb: FormBuilder,
    private formProyectService: FormProyectService,
    private campusService: CampusService,
    private areaService: AreasService,
    private categoryService: CategoryService,
    private modalityService: ModalityService,
    private utilService: UtilService,
    private regexService: RegexService,
    private levelEnglishService: LevelEnglishService
  ) {
    this.autorData = JSON.parse(localStorage.getItem('autor-data'));
    this.buildFormsAndChargeDataIfExist();
  }

  ngOnInit(): void {
    this.levelsEnglish = this.levelEnglishService.getLevelsEnglish();
    setTimeout(() => {
      this.utilService._loading = true;
    });
    if (localStorage.getItem(`autor-terminate-${this.autorData.id_autores}`)) {
      this.terminado = true;
    }
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
  buildFormsAndChargeDataIfExist(): void {
    this.formRegisterProyect = this.fb.group({
      project_id: ['-1'],
      project_name: ['', [Validators.maxLength(60), Validators.required]],
      project_description: ['', [Validators.required, Validators.maxLength(1000)]],
      id_sedes: ['1', Validators.required],
      author_id: [this.autorData.id_autores],
      id_category: ['1', Validators.required],
      url_video: ['', Validators.required],
      id_area: ['1', Validators.required],
      id_modality: ['1', Validators.required],
      project_image: ['', Validators.required],
      adviser_name: ['', [Validators.required, Validators.maxLength(30)]],
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
      locality: ['', [Validators.required, , Validators.maxLength(30)]],
      school_institute: ['', [Validators.required, Validators.maxLength(100)]],
      facebook: ['', [Validators.maxLength(50)]],
      twitter: ['', [Validators.maxLength(30)]],
      participation_description: ['', [Validators.required, Validators.maxLength(1000)]],
      image_ine: ['', [Validators.required]],
    });
    this.formSecondAuthor = this.fb.group({
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
      levelEnglish: ['', [Validators.required]],
      facebook: ['', [Validators.maxLength(60)]],
      twitter: ['', [Validators.maxLength(30)]],
    });
    this.formProyectService.chargeDataFormProject(this.autorData.id_autores)
      .subscribe(data => {
        console.log(data);
        this.proyectData = data.data;
      }, err => console.log(err)).add(() => {
        if (this.proyectData.id_proyectos) {
          this.formRegisterProyect.patchValue({
            project_id: [this.proyectData.id_proyectos],
            project_name: [this.proyectData.nombre_proyecto],
            project_description: [this.proyectData.descripcion_proyecto],
            id_sedes: [this.proyectData.id_sedes],
            author_id: [this.autorData.id_autores],
            id_category: [this.proyectData.id_categorias],
            url_video: [this.proyectData.url_proyecto],
            id_area: [this.proyectData.id_areas],
            id_modality: [this.proyectData.id_modalidades],
            project_image: [''],
            adviser_name: [this.proyectData.nombre_asesor],
            last_name: [this.proyectData.ape_pat_asesor],
            second_last_name: [this.proyectData.ape_mat_asesor],
            address: [this.proyectData.domicilio_asesor],
            suburb: [this.proyectData.colonia_asesor],
            postal_code: [this.proyectData.cp_asesor],
            curp: [this.proyectData.curp_asesor],
            rfc: [this.proyectData.rfc_asesor],
            phone_contact: [this.proyectData.telefono_asesor],
            email: [this.proyectData.email_asesor],
            city: [this.proyectData.municipio_asesor],
            locality: [this.proyectData.localidad_asesor],
            school_institute: [this.proyectData.escuela_asesor],
            facebook: [this.proyectData.facebook_asesor],
            twitter: [this.proyectData.twitter_asesor],
            participation_description: [this.proyectData.descripcion_asesor],
            image_ine: [''],
          });
          if (this.proyectData.id_modalidades === '2') {
            this.autors = true;
            if (this.proyectData.segundo_autor !== false) {
              this.formSecondAuthor.patchValue({
                name_author: [this.proyectData.segundo_autor.nombre_segundo_autor],
                last_name: [this.proyectData.segundo_autor.ape_pat_segundo_autor],
                second_last_name: [this.proyectData.segundo_autor.ape_mat_segundo_autor],
                address: [this.proyectData.segundo_autor.domicilio_segundo_autor],
                suburb: [this.proyectData.segundo_autor.colonia_segundo_autor],
                postal_code: [this.proyectData.segundo_autor.cp_segundo_autor],
                curp: [this.proyectData.segundo_autor.curp_segundo_autor],
                rfc: [this.proyectData.segundo_autor.rfc_segundo_autor],
                phone_contact: [this.proyectData.segundo_autor.telefono_segundo_autor],
                email: [this.proyectData.segundo_autor.email_segundo_autor],
                city: [this.proyectData.segundo_autor.municipio_segundo_autor],
                locality: [this.proyectData.segundo_autor.localidad_segundo_autor],
                school: [this.proyectData.segundo_autor.escuela_segundo_autor],
                levelEnglish: [this.proyectData.segundo_autor.nivel_ingles_segundo_autor],
                facebook: [this.proyectData.segundo_autor.facebook_segundo_autor],
                twitter: [this.proyectData.segundo_autor.twitter_segundo_autor],
              });
            }
          }
        }
      });
  }
  changeModality(value: any): void {
    if (value === '2') {
      this.autors = true;
    } else {
      this.autors = false;
    }
  }
  saveProyectInfo(file: FileList): void {
    this.utilService._loading = true;
    this.utilService.loadingProgress = true;
    const projectImage = this.projectImage.nativeElement.files[0];
    const imageIne = this.imageIne.nativeElement.files[0];
    console.log(this.formRegisterProyect.value);
    const fr: FormData = new FormData();
    fr.append('project_id', this.formRegisterProyect.value.project_id);
    fr.append('project_name', this.formRegisterProyect.value.project_name);
    fr.append('project_description', this.formRegisterProyect.value.project_description);
    fr.append('id_sedes', this.formRegisterProyect.value.id_sedes);
    fr.append('id_category', this.formRegisterProyect.value.id_category);
    fr.append('author_id', this.formRegisterProyect.value.author_id);
    fr.append('url_video', this.formRegisterProyect.value.url_video);
    fr.append('id_area', this.formRegisterProyect.value.id_area);
    fr.append('id_modality', this.formRegisterProyect.value.id_modality);
    fr.append('project_name', this.formRegisterProyect.value.project_name);
    projectImage
      ? fr.append('project_image', projectImage)
      : this.proyectData.id_proyectos !== null
        ? fr.append('project_image', this.proyectData.imagen_proyecto)
        : fr.append('project_image', this.formRegisterProyect.value.project_image);
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
    fr.append('school_institute', this.formRegisterProyect.value.school_institute);
    fr.append('facebook', this.formRegisterProyect.value.facebook);
    fr.append('twitter', this.formRegisterProyect.value.twitter);
    fr.append('participation_description', this.formRegisterProyect.value.participation_description);
    imageIne
      ? fr.append('image_ine', imageIne)
      : this.proyectData.id_proyectos !== null
        ? fr.append('image_ine', this.proyectData.img_ine_asesor)
        : fr.append('image_ine', this.formRegisterProyect.value.image_ine);
    // TODO: consume API
    if (this.autors) {
      for (let data in this.formSecondAuthor.value) {
        fr.append(`second_author[${data}]`, this.formSecondAuthor.value[data]);
      }
      const object = {};
      fr.forEach((value, key) => object[key] = value);
      console.log(object);
      this.formProyectService.registerProjectWithTwoAuthors(fr).subscribe(
        data => {
          if (data.type === HttpEventType.UploadProgress) {
            const total = data.total;
            this.utilService.progress = Math.round((100 * data.loaded) / total);
          }
          if (data.type === HttpEventType.Response) {
            const response = data.body;
            console.log(response);
            if (!response.error) {
              Swal.fire({
                title: 'Exito',
                icon: 'success',
                text: 'Se guardo la información correctamente'
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: response.message
              });
            }
          }
        },
        err => console.log(err)
      ).add(() => {
        this.utilService._loading = false;
        this.utilService.loadingProgress = false;
      });
    } else {
      this.formProyectService.registerProject(fr).subscribe(
        data => {
          if (data.type === HttpEventType.UploadProgress) {
            const total = data.total;
            this.utilService.progress = Math.round((100 * data.loaded) / total);
          }
          if (data.type === HttpEventType.Response) {
            const response = data.body;
            if (!response.error) {
              console.log(response);
              Swal.fire({
                title: 'Exito',
                icon: 'success',
                text: 'Se guardo la información correctamente'
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: response.message
              });
            }
          }
        }, error => console.log(error)
      ).add(() => {
        this.utilService._loading = false;
        this.utilService.loadingProgress = false;
      });
    }
  }
  registerProyect(file: FileList): void {
    this.utilService._loading = true;
    this.utilService.loadingProgress = true;
    const projectImage = this.projectImage.nativeElement.files[0];
    const imageIne = this.imageIne.nativeElement.files[0];
    const fr: FormData = new FormData();
    fr.append('project_name', this.formRegisterProyect.value.project_name);
    fr.append('project_description', this.formRegisterProyect.value.project_description);
    fr.append('id_sedes', this.formRegisterProyect.value.id_sedes);
    fr.append('id_category', this.formRegisterProyect.value.id_category);
    fr.append('author_id', this.formRegisterProyect.value.author_id);
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
    fr.append('school_institute', this.formRegisterProyect.value.school_institute);
    fr.append('facebook', this.formRegisterProyect.value.facebook);
    fr.append('twitter', this.formRegisterProyect.value.project_name);
    fr.append('participation_description', this.formRegisterProyect.value.participation_description);
    fr.append('image_ine', imageIne);
    // TODO: consume API
    if (this.autors) {
      for (let data in this.formSecondAuthor.value) {
        fr.append(`second_author[${data}]`, this.formSecondAuthor.value[data]);
      }
      const object = {};
      fr.forEach((value, key) => object[key] = value);
      this.formProyectService.registerProjectWithTwoAuthors(fr).subscribe(
        data => {
          if (data.type === HttpEventType.UploadProgress) {
            const total = data.total;
            this.utilService.progress = Math.round((100 * data.loaded) / total);
          }
          if (data.type === HttpEventType.Response) {
            const response = data.body;
            if (!response.error) {
              localStorage.setItem(`info-${this.autorData.id_autores}`, JSON.stringify(this.formRegisterProyect.value));
              localStorage.setItem(`info-2-${this.autorData.id_autores}`, JSON.stringify(this.formSecondAuthor.value));
              Swal.fire({
                title: 'Registro exitoso',
                icon: 'success',
                text: 'Solo falta subir el formato de registro (pdf) para concluir el registro'
              }).then(() => {
                this.formRegisterProyect.reset();
                this.formSecondAuthor.reset();
                this.terminado = true;
                localStorage.setItem(`buttons-disabled-${this.autorData.id_autores}`, 'si');
                window.location.reload();
              });
              localStorage.setItem(`autor-terminate-${this.autorData.id_autores}`, 'true');
            } else {
              Swal.fire({
                icon: 'warning',
                text: response.message
              });
            }
          }
        },
        err => console.log(err)
      ).add(() => {
        this.utilService._loading = false;
        this.utilService.loadingProgress = false;
      });
    } else {
      this.formProyectService.registerProject(fr).subscribe(
        data => {
          if (data.type === HttpEventType.UploadProgress) {
            const total = data.total;
            this.utilService.progress = Math.round((100 * data.loaded) / total);
          }
          if (data.type === HttpEventType.Response) {
            const response = data.body;
            if (!response.error) {
              localStorage.setItem(`info-${this.autorData.id_autores}`, JSON.stringify(this.formRegisterProyect.value));
              localStorage.setItem(`info-2-${this.autorData.id_autores}`, JSON.stringify(this.formSecondAuthor.value));
              Swal.fire({
                title: 'Registro exitoso',
                icon: 'success',
                text: 'Solo falta subir el formato de registro para concluir el proceso'
              }).then(() => {
                this.formRegisterProyect.reset();
                this.terminado = true;
                localStorage.setItem(`buttons-disabled-${this.autorData.id_autores}`, 'si');
                window.location.reload();
              });
              localStorage.setItem(`autor-terminate-${this.autorData.id_autores}`, 'true');
            } else {
              Swal.fire({
                icon: 'warning',
                text: response.message
              });
            }
          }
        }, error => console.log(error)
      ).add(() => {
        this.utilService._loading = false;
        this.utilService.loadingProgress = false;
      });
    }
  }
  curpUpperCaseSecondAuthor(): void {
    this.formSecondAuthor.get('curp').setValue(this.formSecondAuthor.get('curp').value.toUpperCase());
  }
  rfcUpperCaseSecondAuthor(): void {
    this.formSecondAuthor.get('rfc').setValue(this.formSecondAuthor.get('rfc').value.toUpperCase());
  }
  curpUpperCaseRegisterProyect(): void {
    this.formRegisterProyect.get('curp').setValue(this.formRegisterProyect.get('curp').value.toUpperCase());
  }
  rfcUpperCaseRegisterProyect(): void {
    this.formRegisterProyect.get('rfc').setValue(this.formRegisterProyect.get('rfc').value.toUpperCase());
  }

  returnPageDocument(value: any): void {
    Swal.fire({
      title: 'Formato de registro',
      icon: 'info',
      text: 'Se abrira otra pagina para que descargue el formato de la categoria',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    }).then(() => {
      switch (value) {
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
    });
  }

}
