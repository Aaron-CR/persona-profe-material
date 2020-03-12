import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Persona } from 'src/app/shared/models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends HttpService<Persona> {

  protected url = 'http://localhost:9000/api/v1/persona/';

}
