import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesListComponent } from './places-list.component';
import { MaterialModule } from 'src/app/common/material/material.module';
import { PlaceDetailsComponent } from '../place-details/place-details.component';

@NgModule({
  declarations: [
    PlacesListComponent,
    PlaceDetailsComponent
  ],
  exports: [
    PlacesListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PlacesListModule { }
