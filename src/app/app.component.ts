// src/app/app.component.ts
import {Component, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {AnagramService} from "./services/anagram.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

export interface Anagram {
  name: string;
  position: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    ReactiveFormsModule,
    NgIf,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder,
              private anagramService: AnagramService,
              private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      word: ['', []]
    });
  }

  form: FormGroup;
  title = 'anagram';
  displayedColumns: string[] = ['position', 'name'];
  dataSource: any[] = [];

  enviarPalavra() {
    if (this.form.valid) {
      this.anagramService.getAnagrams(this.form.get('word')?.value)
        .subscribe({
          next: (data: any) => {
            this.carregaDadosAnagramas(data);
          },
          error: (error) => {
            this.showErrorToast(error.error);
            console.log(error);
          }
        });
    }
  }

  private carregaDadosAnagramas(data: any) {
    this.dataSource = data.map((anagram: any, index: number) => {
      return {
        position: index + 1,
        name: anagram
      }
    });
  }

  private showErrorToast(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['alert-toast']
    });
  }
}
