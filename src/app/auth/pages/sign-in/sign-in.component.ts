import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignInService } from '../../services/sign-in.service';
import { FechasService } from '../../../services/fechas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UtilService } from '../../../services/util.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],

})
export class SignInComponent implements OnInit {

  formSignIn: FormGroup;
  constructor(
    private fb: FormBuilder,
    private sign: SignInService,
    private router: Router,
    private utilService: UtilService,
    private fecha: FechasService,
  ) {
    this.formSignIn = this.fb.group({
      // TODO: datos de login
      user: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });

  }

  ngOnInit(): void {
  }
  

  pageRegister(): void {
    this.utilService._loading = true;
    setTimeout(() => {
      this.utilService._loading = false;
    }, 1000);
    // this.router.navigateByUrl('/login/registro-autor');
    // transition(() =>
    //   {
    //     return this.utilService._loading = true;
    //   }, animate("10s 1s"))

  }

  signIn(): void {

    this.fecha.getFechas().subscribe(
      data => {
        if (!data.error) {
          console.log(data.fecha_inicio);
          console.log(data.fecha_fin);
          var fecha: string = data.fecha_inicio;
          const dateBD = new Date();
          let yearBD: string = fecha.substring(0, 4);
          let monthBD: string = fecha.substring(5, 7);
          let dayBD: string = fecha.substring(8, 10);
          
          console.log(Number(yearBD) + "anio bd");
          console.log(monthBD + "anio bd");
          console.log(dayBD + "anio bd");

          var fecha2: string = data.fecha_fin;
          const dateBD2 = new Date(fecha2 + ', 23:59:59');
          let yearBD2: string = fecha2.substring(0, 4);
          let monthBD2: string = fecha2.substring(5, 7);
          let dayBD2: string = fecha2.substring(8, 10);
          
          console.log(dateBD2 + "anio bd2");
          console.log(monthBD2 + "anio bd2");
          console.log(dayBD2 + "anio bd2");
;
          const date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth()+1;
          let day = date.getDay()+15;
          
          console.log(year + "anio");
          console.log(month + "mes");
          console.log(day + "diaaaa");
          
        
          if (year == Number(yearBD) && year <= Number(yearBD2)) {
            if (month >= Number(monthBD) && month <= Number(monthBD2)) {
              if (day >= Number(dayBD) && day <= Number(dayBD2)) {
                

              
            console.log("aymero");
            this.utilService._loading = true;
            this.sign.loginAuth(this.formSignIn.value).subscribe(
              data => {
                if (!data.error) {
                  this.router.navigateByUrl('principal/usuario/registrar-proyecto');
                  localStorage.setItem('autor-data', JSON.stringify(data.data));
                } else {
                  Swal.fire('Advetencia', data.data.message, 'warning');
                }
              },
              err => {
                console.log(err);
              }
            ).add(() => this.utilService._loading = false);
              }else {
                Swal.fire('Advertencia', 'El proyecto aun no se encuentra en las fechas para ser habilitado', 'warning');
              }
          } else {
            Swal.fire('Advertencia', 'El proyecto aun no se encuentra en las fechas para ser habilitado', 'warning');
      } 
          } else {
                Swal.fire('Advertencia', 'El proyecto aun no se encuentra en las fechas para ser habilitado', 'warning');
          } 

                            
        } else {
          Swal.fire('Advetencia', data.data.message, 'warning');
        }
      },
      err => {
        console.log(err);
      }
    );
    
  }
}
