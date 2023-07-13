import {Component, DoCheck, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, DoCheck{


  @Input() id= "";
  countryName: any;
  capital: any;
  region: any;
  incomeLevel: any;
  population: any;
  exchange: any;
  countries:Country[] = [
    {
      id: "au",
      name: "Australia",
      cap: "Some city",
      reg: "Down under",
      inc: 1,
      pop: 2,
      ex: 3,
    },
  ];


  getCountryInfo() {
    // check locally for info
    for (const country of this.countries) {
      if (country.id === this.id) {
        // set class variables
        this.countryName = country.name;
        this.capital = country.cap;
        this.region = country.reg;
        this.incomeLevel = country.inc;
        this.population = country.pop;
        this.exchange = country.ex;
        // console.log(`found: ${this.countryName}`);
        // push the display
        this.displayInfo()
        return;
      }
    }
    console.log(`not found: ${this.id}`);
  }

  displayInfo() {
    document.getElementById("div").innerHTML =
      "<h2>"+this.countryName+"</h2>\n" +
      "<ul>\n" +
      "  <li>"+this.capital+"</li>\n" +
      "  <li>"+this.region+"</li>\n" +
      "  <li>"+this.incomeLevel+"</li>\n" +
      "  <li>"+this.population+"</li>\n" +
      "  <li>"+this.exchange+"</li>\n" +
      "</ul>"
  }

  makeAPICall() {

  }

  ngDoCheck(): void {
    this.getCountryInfo();
  }

  ngOnInit(): void {
  }
}

interface Country {
  id: string;
  name: string;
  cap: string;
  reg: string;
  inc: number;
  pop: number;
  ex: number;
}


