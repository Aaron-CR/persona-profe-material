import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  success(title: string, text: string): Promise<SweetAlertResult> {
    return Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    }).fire(title, text, 'success');
  }

  delete(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      confirmButtonText: 'Sí, bórralo!',
      confirmButtonColor: '#3F51B5',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#F44336'
    });
  }

}
