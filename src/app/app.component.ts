import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Interactive World Map';
  id = "";
  // @ts-ignore
  send(id) {
    this.id = id;
  }
}
