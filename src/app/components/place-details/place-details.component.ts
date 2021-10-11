import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaceDetailsDialogData } from 'src/app/types/placedetails.model';
import { Place } from 'src/app/types/places.model';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent {
  private favoritePlaces: Place[] = this.getLocalFavoritePlaces();

  get isFavoritePlace(): boolean {
    const hasInArray = this.getLocalFavoritePlaces().filter((place) => place._id === this.data.place._id)

    return hasInArray.length > 0 ? true : false;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PlaceDetailsDialogData,
  ) { }

  public handleFavoritePlace(): void {
    const placeIndex = this.favoritePlaces
      .findIndex((place) => this.data.place._id === place._id);

    placeIndex === -1
      ? this.favoritePlaces.push(this.data.place)
      : this.favoritePlaces.splice(placeIndex, 1);

    this.storeFavoritePlaces();
  }

  private storeFavoritePlaces(): void {
    localStorage.setItem('favoritePlaces', JSON.stringify(this.favoritePlaces));
  }

  private getLocalFavoritePlaces(): Place[] {
    return JSON.parse(localStorage.getItem('favoritePlaces') || '{}');
  }

}
