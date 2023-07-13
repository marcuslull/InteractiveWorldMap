import {Component, DoCheck, Input} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements DoCheck{
  ngDoCheck(): void {

    if (this.lastID !== this.id) {
      this.lastID = this.id;
      this.lockedID = this.id;
      this.getCountryInfo();
    }
  }

  @Input() id: any;
  lastID: any;
  lockedID: any;
  countryName: any;
  capitalCity: any;
  region: any;
  incomeLevel: any;
  longitude: any;
  latitude: any;

  countries: Country[] = [];

  getCountryInfo() {
    // check locally for info

    console.log(`Length of countries: ${this.countries.length}`)
    for (const country of this.countries) {
      console.log(country);
      console.log(`LockedID: ${this.lockedID}. Country.id: ${country.id}`);
      if (country.id === this.lockedID) {
        // set class variables
        this.countryName = country.name;
        this.capitalCity = country.cap;
        this.region = country.reg;
        this.incomeLevel = country.inc;
        this.longitude = country.long;
        this.latitude = country.lat;
        // push the display
        this.displayInfo()
        this.lockedID = "";
        return;
      }
    }
    if (this.id.length !== 0) {
      console.log(`not found in the local array, calling api: ${this.id}.`);
      this.apiCall();
    }
  }

  displayInfo() {
    document.getElementById("div").innerHTML =
      "<h2>" + this.countryName + "</h2>\n" +
      "<ul>\n" +
      "  <li>" + this.capitalCity + "</li>\n" +
      "  <li>" + this.region + "</li>\n" +
      "  <li>" + this.incomeLevel + "</li>\n" +
      "  <li>" + this.longitude + "</li>\n" +
      "  <li>" + this.latitude + "</li>\n" +
      "</ul>"
  }

  async apiCall() {
    let urlString = "https://api.worldbank.org/v2/country/"
    let countryIdentifier = `${this.id}?format=json`;
    const response = await fetch(urlString + countryIdentifier);
    if (response.ok) {
      console.log("Hit the OK part of the if")
      let data = await response.json();
      let goodPartOfTheData = data[1][0];
      console.log(`good part of the data: ${goodPartOfTheData.name}`);

      let parsed = new Country()
      parsed.id = this.id;
      parsed.name = goodPartOfTheData.name;
      parsed.cap = goodPartOfTheData.capitalCity;
      parsed.reg = goodPartOfTheData.region.value;
      parsed.inc = goodPartOfTheData.incomeLevel.value;
      parsed.long = goodPartOfTheData.longitude;
      parsed.lat = goodPartOfTheData.latitude;
      this.countries.push(parsed);

      this.getCountryInfo();
    } else {
      console.log("Hit the else part of the if")
      console.log(response.status)
    }
  }
}

class Country {
  id: string;
  name: string;
  cap: string;
  reg: string;
  inc: number;
  long: number;
  lat: number;

}


