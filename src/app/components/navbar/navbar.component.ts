import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UploadDocument } from '../../services/upload-document.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { HttpEventType } from '@angular/common/http';
import { Autor } from '../../models/autor.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  @ViewChild('document', {
    read: ElementRef
  }) document: ElementRef;

  terminado = false;
  btnDisabled = false;
  formRegisterProyect: FormGroup;
  autorData: Autor;
  constructor(
    private upload: UploadDocument,
    private fb: FormBuilder,
    private utilService: UtilService,
    private router: Router,

  ) {
    this.formRegisterProyect = this.fb.group({
      register_form: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.autorData = JSON.parse(localStorage.getItem('autor-data'));
    if (localStorage.getItem(`button-${this.autorData.id_autores}`)) {
      this.terminado = true;
    }
    if (localStorage.getItem(`buttons-disabled-${this.autorData.id_autores}`)) {
      this.btnDisabled = true;
    }
  }

  uploadDocument(file: FileList): void {
    this.utilService._loading = true;
    this.utilService.loadingProgress = true;
    const registerForm = this.document.nativeElement.files[0];
    const authorId = this.autorData.id_autores;

    if (registerForm) {
      const fr: any = new FormData();
      fr.append('register_form', registerForm);
      fr.append('author_id', authorId);
      console.log(registerForm.size);
      if(registerForm.size <= 2000000){
        console.log(registerForm.size);
        this.upload.upload(fr).subscribe(
          data => {
            if (data.type === HttpEventType.UploadProgress) {
              const total = data.total;
              this.utilService.progress = Math.round((100 * data.loaded) / total);
            }
            if (data.type === HttpEventType.Response) {
              console.log(data.body);
              const response = data.body;
              if (!response.error) {
                this.downloadPDF();
                Swal.fire({
                  icon: 'success',
                  text: 'Documento registrado exitosamente!'
                }).then(() => {
                  localStorage.setItem(`button-${this.autorData.id_autores}`, 'true');
                  localStorage.removeItem('autor-data');
                  this.router.navigateByUrl('login/sesion');
                });
                localStorage.removeItem('autor-data');
              }
            }
          },
          err => {
            Swal.fire('Ocurrio un error', 'Recuerda que debes subir un archivo de tipo pdf', 'error');
            console.log(err);
          }
        ).add(() => {
          this.utilService._loading = false;
          this.utilService.loadingProgress = false;
        });
      } else {
        this.utilService._loading = false;
        this.utilService.loadingProgress = false;
        Swal.fire({
          icon: 'warning',
          title: 'Limite de archivo excedido',
          text: 'Debe ser un archivo menor a 2MB'
        });
      }
      

    } else {
      this.utilService._loading = false;
      this.utilService.loadingProgress = false;
      Swal.fire({
        icon: 'warning',
        text: 'Asegurate de seleccionar un archivo primero',
      });

    }
  }

  downloadPDF(): void {

    let area = '';
    let category = '';
    const fecha: Date = new Date();
    const hour = fecha.getHours();
    const minutes = fecha.getMinutes();

    switch (JSON.parse(localStorage.getItem(`info-${this.autorData.id_autores}`)).id_area) {
      case '1':
        area = 'Ciencias exactas y naturales';
        break;
      case '2':
        area = 'Medicina y salud';
        break;
      case '3':
        area = 'Ciencias sociales y humanidades';
        break;
      case '4':
        area = 'Ciencias en ingeniería';
        break;
      case '5':
        area = 'Agropecuarias y alimentos';
        break;
      case '6':
        area = 'Divulgación de la ciencia';
        break;
      case '7':
        area = 'Medio ambiente';
        break;
      case '8':
        area = 'Mecatrónica';
        break;
      case '9':
        area = 'Ciencias de los materiales';
        break;
      case '10':
        area = 'Biología';
        break;
      case '11':
        area = 'Computación y software';
        break;
    }

    switch (JSON.parse(localStorage.getItem(`info-${this.autorData.id_autores}`)).id_category) {
      case '1':
        category = 'Petit';
        break;
      case '2':
        category = 'Kids';
        break;
      case '3':
        category = 'Juvenil';
        break;
      case '4':
        category = 'Media Superior';
        break;
      case '5':
        category = 'Superior';
        break;
      case '6':
        category = 'Posgrado';
        break;
    }
    const info = JSON.parse(localStorage.getItem(`info-${this.autorData.id_autores}`));
    const info2 = JSON.parse(localStorage.getItem(`info-2-${this.autorData.id_autores}`));
    const pdf = new jsPDF('p', 'in', 'letter');
    const width = pdf.internal.pageSize.getWidth();

    

    pdf.addImage('../assets/Acuse.jpg', 'jpg', 0, 0, 8.6, 11).setFontSize(14).setTextColor('#646464');
    pdf.text(`${hour.toString()}${minutes.toString()}`, 1.2, 2.42).setFontSize(10).setTextColor('#646464');
    pdf.text(info.project_name, 0.47, 3.75);
    pdf.text(area, width / 2, 4.5, {align: 'center'}).setFont('Poppins','900').setFontSize(11).setTextColor('#646464');
    pdf.text('Categoría', 0.47, 4.29).setFont('normal', '400').setFontSize(10).setTextColor('#646464');
    pdf.text(category, 0.47, 4.5);
    pdf.text(`${this.autorData.nombre} ${this.autorData.ape_pat} ${this.autorData.ape_mat}`, width / 2, 5.5, {align: 'center'});
    pdf.text(`${info.adviser_name} ${info.last_name} ${info.second_last_name}`, width / 2, 6.7, {align: 'center'}).setFontSize(8);
    pdf.text(fecha.toString(), 0.75, 7.72).setFontSize(10).setTextColor('#646464');
    if (info2.name_author === '') {
      pdf.save(`acuse proyecto-${info.project_name}`);
    } else {
      pdf.text(`${info2.name_author} ${info2.last_name} ${info2.second_last_name}`, width / 2, 5.7, {align: 'center'});
      pdf.save(`acuse proyecto-${info.project_name}`);
    }
  }
  closeSession(): void {
    this.utilService._loading = true;
    setTimeout(() => {
      this.utilService._loading = false;
      localStorage.removeItem('autor-data');
      this.router.navigateByUrl('/login/sesion');
    }, 1000);
  }
}
