import {Component, DoCheck, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements DoCheck{

  // need an HttpClient instance for the API calls
  constructor(private http: HttpClient) {
  }

  // check if the id input value has changed
  // if is has lock in the id and begin the data retrieval process by calling getCountryInfo()
  ngDoCheck(): void {
    if (this.lockedID !== this.id) {
      this.lockedID = this.id;
      this.getCountryInfo();
    }
  }

  // TS variables
  @Input() id: any; // input from map module via parent
  lockedID: any;
  countries: Country[] = []; // stores retrieved api data in the form of Country objects

  // HTML variables
  countryName: any;
  capitalCity: any;
  region: any;
  incomeLevel: any;
  longitude: any;
  latitude: any;

  // checks for a Country data locally before retrieving from the api
  // if a local Country object is found, we set the HTML variables with the appropriate data and call displayInfo()
  // if country data is not found locally we will make an api call
  getCountryInfo() {
    for (const country of this.countries) {
      if (country.id === this.lockedID) {
        this.countryName = country.name;
        this.capitalCity = country.cap;
        this.region = country.reg;
        this.incomeLevel = country.inc;
        this.longitude = country.long;
        this.latitude = country.lat;
        this.displayInfo()
        this.lockedID = ""; // if we don't clear the locked ID we could get an infinite loop in some cases
        return;
      }
    }
    // need to make sure the api doesn't get called on an empty string
    if (this.lockedID.length !== 0) {
      this.apiCall();
    }
  }

  // responsible for injecting the HTML to the page using the HTML variables
  displayInfo() {
    document.getElementById("div").innerHTML =
      "<h3>" + this.countryName + "</h3>\n" +
      "<ul>\n" +
      "  <li><strong>Capital city: </strong>" + this.capitalCity + "</li>\n" +
      "  <li><strong>Region: </strong>" + this.region + "</li>\n" +
      "  <li><strong>Income level: </strong>" + this.incomeLevel + "</li>\n" +
      "  <li><strong>Longitude: </strong>" + this.longitude + "</li>\n" +
      "  <li><strong>Latitude: </strong>" + this.latitude + "</li>\n" +
      "</ul>"
  }

  // if the country data is not found locally we make an API call to WorldBank
  // once we have the data we will instantiate a new Country object and push it to the countries variable
  // lastly, call getCountryInfo to handle retrieval and display of the now local country object
  apiCall() {
    let urlString = "https://api.worldbank.org/v2/country/"
    let countryIdentifier = `${this.lockedID}?format=json`;
    this.http.get(urlString + countryIdentifier).subscribe(data => {
      let goodPartOfTheData = data[1][0]; // isolate the part of the json we are interested in
      let parsed = new Country()
      parsed.id = this.lockedID;
      parsed.name = goodPartOfTheData.name;
      parsed.cap = goodPartOfTheData.capitalCity;
      parsed.reg = goodPartOfTheData.region.value;
      parsed.inc = goodPartOfTheData.incomeLevel.value;
      parsed.long = goodPartOfTheData.longitude;
      parsed.lat = goodPartOfTheData.latitude;
      this.countries.push(parsed);
      this.getCountryInfo(); // this is a call back to the calling function, has the effect of continuous API requests until successful
    })
  }
}

// a class model - only needed in this component so no need to export
class Country {
  id: string;
  name: string;
  cap: string;
  reg: string;
  inc: number;
  long: number;
  lat: number;
}


