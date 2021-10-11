import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PlacesListModule } from 'src/app/components/places-list/places-list.module';
import { MaterialModule } from 'src/app/common/material/material.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PlacesListModule,
    MaterialModule,
  ]
})
export class HomeModule { }
