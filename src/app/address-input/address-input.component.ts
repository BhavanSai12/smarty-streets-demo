import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
})
export class AddressInputComponent implements OnInit {
  address: string = '';
  suggestions: any[] = [];
  selectedSuggestion: any;
onAddressInput: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  search = (text$: Observable<string>): Observable<string[]> =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term) => term.length >= 3),
    switchMap((term) => {
      const apiKey = '180593852659415107';
      const url = `https://us-autocomplete-pro.api.smarty.com/lookup?key=${apiKey}&selected=&license=us-autocomplete-pro-cloud&search=${term}`;

      return this.http.get(url).pipe(
        map((data: any) => data.suggestions || []),
        map((suggestions: any[]) =>
          suggestions.map((suggestion) =>
            `${suggestion.street_line}, ${suggestion.secondary}, ${suggestion.city}, ${suggestion.state}, ${suggestion.zipcode}`
          )
        )
      );
    })
  );



  selectSuggestion(suggestion: any): void {
    this.selectedSuggestion = suggestion;
    this.address = suggestion.street_line;
    this.suggestions = [];
  }
}
