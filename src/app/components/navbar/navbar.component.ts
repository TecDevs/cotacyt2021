import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UploadDocument } from '../../services/upload-document.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';


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
    
  }

  uploadDocument(file: FileList) {
      this.utilService._loading = true;
      const register_form = this.document.nativeElement.files[0];
      const author_id = JSON.parse(localStorage.getItem('autor-data')).id_autores;

      console.log(author_id);
      console.log(register_form);

      const fr: any = new FormData();
      fr.append('register_form', register_form);
      fr.append('author_id', author_id);

      this.upload.upload(fr).subscribe(
        data => {
          if( !data.error ) {
            Swal.fire({
              icon: 'success',
              text: 'Documento registrado exitosamente!'
            });
          }
          localStorage.setItem('button', 'true')
          localStorage.removeItem('autor-data');
          this.router.navigateByUrl('login/sesion');
        },
        err => {
            console.log(err);
            
        }
      ).add(() => this.utilService._loading = false);

  }

}
