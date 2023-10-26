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
    this.suggestions=[];


    const apiKey = '180593852659415107';
    const url = `https://us-autocomplete-pro.api.smarty.com/lookup?key=${apiKey}&selected=&license=us-autocomplete-pro-cloud&search=${this.address}`;

    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      this.suggestions = data.suggestions || []; // Use data.suggestions if available, or an empty array
    });
    
    
  }
}
