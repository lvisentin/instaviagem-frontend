import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaceDetailsDialogData } from 'src/app/types/placedetails.model';
import { Place } from 'src/app/types/places.model';
import { PlaceDetailsComponent } from '../place-details/place-details.component';

@Component({
  selector: 'places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent{

  @Input() places: Place[] = [];

  constructor(
    private matDialog: MatDialog
  ) { }

  public handlePlaceClick(place: Place): void {
    this.matDialog.open<PlaceDetailsComponent, PlaceDetailsDialogData>(PlaceDetailsComponent, {
      data: {
        place: place
      }
    });
  }

}
