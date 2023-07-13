import {Component, DoCheck, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, DoCheck{
  @Input() id= "";
  ngDoCheck(): void {
    this.refresh();
  }
  ngOnInit(): void {
    this.refresh();
  }
  private refresh() {
    console.log(`info.component.ts ${this.id}`);
  }
}
