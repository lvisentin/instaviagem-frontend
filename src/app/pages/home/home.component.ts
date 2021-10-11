import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { PlacesService } from 'src/app/services/places.service';
import { Filter } from 'src/app/types/filter.model';
import { Place } from 'src/app/types/places.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public filteredPlaces: Place[] = [];
  public orderBy: Array<Filter> = [
    { name: 'Nome', value: 'name' },
    { name: 'Preço', value: 'price' },
    { name: 'Tipo', value: 'type' },
  ];

  private places: Place[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('searchInput') searchInput: ElementRef = {} as ElementRef;

  constructor(
    private readonly placesService: PlacesService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('favoritePlaces') === null) {
      localStorage.setItem('favoritePlaces', JSON.stringify([]));
    }

    this.getPlaces();
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe((debounceTime(150)))
      .pipe(distinctUntilChanged())
      .subscribe((event: any) => {
        this.filterPlaces(event.target?.value);
      })
  }

  public filterPlaces(filterValue: string): void {
    if (!filterValue) { this.filteredPlaces = this.places }
    this.filteredPlaces = this.filteredPlaces.filter((place) => place.name.toLowerCase().includes(filterValue))
  }

  public orderByChange(orderBySelector: string): void {
    if (orderBySelector === 'price') {
      this.filteredPlaces.sort((a, b) => {
        return Number(a.price) - Number(b.price);
      })
    }

    if (orderBySelector === 'name' || orderBySelector === 'type') {
      this.filteredPlaces.sort((a, b) => {
        if (a[orderBySelector] < b[orderBySelector]) { return -1; }
        if (a[orderBySelector] > b[orderBySelector]) { return 1; }
        return 0;
      })
    }
  }

  private getPlaces(): void {
    this.placesService
      .getPlaces()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.places = response;
        this.filteredPlaces = response;
      })
  }
}
