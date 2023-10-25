// address-input.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit {
  address: string = '';
  suggestions: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onAddressInput(): void {
    // Call SmartyStreets API to get address suggestions
    const apiKey = '180593852659415107';
    const url = `https://us-street.api.smartystreets.com/street-address?auth-token=${apiKey}&candidates=10&street=${this.address}`;

    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      this.suggestions = data;
    });
    
  }
}
