import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/shared/models/persona';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from 'src/app/core/services/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormComponent } from '../form/form.component';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public title = 'Tabla de Personas';
  public icon = 'person_add';
  public displayedColumns: string[] = ['nombre', 'apellido', 'dni'];
  public dataSource: MatTableDataSource<Persona> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public personaService: PersonaService,
    public dialogService: DialogService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  onSubmit(object: any) {
    this.dialog.open(FormComponent, { disableClose: true, data: object })
      .afterClosed().subscribe(result => {
        if (result.event === 'Añadir') {
          this.create(result.data);
        } else if (result.event === 'Editar') {
          this.update(result.data);
        }
      });
  }

  onDelete(item: any) {
    this.dialogService.delete().then((result) => {
      if (result.value) {
        this.delete(item.id);
      }
    });
  }

  getAll() {
    this.personaService.getAll().subscribe((result) => {
      this.dataSource.data = result;
      this.notifyTable();
    });
  }

  create(persona: Persona) {
    this.personaService.create(persona).subscribe((result) => {
      this.dataSource.data.push(result);
      this.success('Añadido!', 'Se ha añadido correctamente.');
    });
  }

  update(persona: Persona) {
    this.personaService.update(persona).subscribe(() => {
      this.dataSource.data.filter((value) => {
        if (value.id === persona.id) {
          const index = this.dataSource.data.indexOf(value);
          this.dataSource.data[index] = persona;
        }
      });
      this.success('Actualizado!', 'Se ha actualizado correctamente.');
    });
  }

  delete(id: number) {
    this.personaService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((value) =>
        value.id !== id
      );
      this.success('Eliminado!', 'Se ha eliminado correctamente.');
    });
  }

  success(title: string, text: string) {
    this.dialogService.success(title, text);
    this.notifyTable();
  }

  notifyTable() {
    this.dataSource.data = [...this.dataSource.data];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
