import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UploadDocument } from '../../services/upload-document.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';


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

    if( localStorage.getItem('button') ) {
        this.terminado = true;
    }
    if( localStorage.getItem('buttons-disabled'))
        this.btnDisabled = true;
    
  }

  uploadDocument(file: FileList) {
      this.utilService._loading = true;
      const register_form = this.document.nativeElement.files[0];
      const author_id = JSON.parse(localStorage.getItem('autor-data')).id_autores;


      if( register_form ) {
        const fr: any = new FormData();
        fr.append('register_form', register_form);
        fr.append('author_id', author_id);
  
        this.upload.upload(fr).subscribe(
          data => {
            if( !data.error ) {
              this.downloadPDF();
              Swal.fire({
                icon: 'success',
                text: 'Documento registrado exitosamente!'
              }).then( () => {
                localStorage.setItem('button', 'true')
                this.router.navigateByUrl('login/sesion');
              });
            }
          },
          err => {
              console.log(err);   
          }
        ).add(() => this.utilService._loading = false);

      } else {
        this.utilService._loading = false;
        Swal.fire({
          icon: 'warning',
          text: 'Asegurate de seleccionar un archivo primero',
        });

    }
  }

  downloadPDF() {

    let area = '';
    let fecha: Date =  new Date();
    let hour = fecha.getHours();
    let minutes = fecha.getMinutes();
    
    switch( JSON.parse(localStorage.getItem('info')).id_area ) {
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
        area = 'Ciencias en ingenieria';
      break;
      case '5':
        area = 'Agropecuarias y alimentos';
      break;
      case '6':
        area = 'Diculgación de la ciencia';
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
      case  '0':
        area = 'Biología';
      break;
      case  '1':
        area = 'Computación y software';
      break;
    }

    console.log(JSON.parse(localStorage.getItem('info')).id_area);
    console.log(area);
    
    
    const pdf = new jsPDF('p', 'in', 'letter');
    pdf.addImage('../assets/Acuse.jpg', 'jpg', 0, 0, 8.6, 11).setFontSize(14).setTextColor('#646464');
    pdf.text(hour.toString() + '' + minutes.toString(), 1.2, 2.42).setFontSize(10).setTextColor('#646464');
    pdf.text(JSON.parse(localStorage.getItem('info')).project_name, 0.47, 3.75);
    pdf.text(area, 3.4, 4.5);
    pdf.text(JSON.parse(localStorage.getItem('autor-data')).nombre +' '+ JSON.parse(localStorage.getItem('autor-data')).ape_pat +' '+ JSON.parse(localStorage.getItem('autor-data')).ape_mat, 3.35, 5.5);
    pdf.text(JSON.parse(localStorage.getItem('info')).adviser_name +' '+ JSON.parse(localStorage.getItem('info')).last_name +' '+ JSON.parse(localStorage.getItem('info')).second_last_name, 3.4, 6.7).setFontSize(8);
    pdf.text(fecha.toString() , 0.75, 7.72).setFontSize(10).setTextColor('#646464');
    if( JSON.parse(localStorage.getItem('info-2')).name_author === '' ) {
      pdf.save('acuse proyecto');
    } else {
      pdf.text(JSON.parse(localStorage.getItem('info-2')).name_author + ' ' + JSON.parse(localStorage.getItem('info-2')).last_name + ' ' + JSON.parse(localStorage.getItem('info-2')).second_last_name, 3.35, 5.7);
      pdf.save('acuse proyecto');
    }
    
  }
}
