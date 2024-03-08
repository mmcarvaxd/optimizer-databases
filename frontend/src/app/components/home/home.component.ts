import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import moment from 'moment';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule, CommonModule, HttpClientModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.getPatients();
  }
  http: HttpClient = inject(HttpClient);
  apiUrl = 'http://localhost:4002';
  displayedColumns: string[] = ['name', 'age', 'email', 'cpf', 'birthDate', 'gender'];

  filter: PatientFilter = {
    name: '',
    age: null,
    email: '',
    cpf: '',
    birthDate: null
  }
  patients: Patient[] = [] //: Observable<Patient[]> = this.getPatients();

  getPatients() {
    let queryParams = ''

    if(this.filter.name) queryParams += `&name=${this.filter.name}`
    if(this.filter.age) queryParams += `&age=${this.filter.age}`
    if(this.filter.email) queryParams +=  `&email=${this.filter.email}`
    if(this.filter.cpf) queryParams +=  `&cpf=${this.filter.cpf}`
    if(this.filter.birthDate) queryParams +=  `&birthDate=${moment(this.filter.birthDate).format('YYYY-MM-DD')}`
    if(this.filter.gender) queryParams +=  `&gender=${this.filter.gender}`

    return this.http.get(this.apiUrl + '/patients?' + queryParams).pipe(map((res: any): Patient[] => {
      return res.map((res: any): Patient => {
        return {
          name: res.name_portuguese,
          age: res.age,
          email: res.email,
          cpf: res.cpf,
          birthDate: res.birthDate,
          gender: res.gender
        }
      })
    })).subscribe((res: Patient[]) => {
      this.patients = res;
    })
  }
}

type PatientFilter = {
  name?: string | null
  age?: number | null
  email?: string | null
  cpf?: string | null
  birthDate?: Date | null
  gender?: string | null
}

type Patient = {
  name: string
  age: number
  email: string
  cpf: string
  birthDate: Date
  gender: string
}
