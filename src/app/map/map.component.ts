import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent{

  // need an emitter to move data to sibling component via parent component
  @Output() emitter = new EventEmitter<any>()

  // called by a mouseover event in HTML. gets the id of the current element
  // if the current element ID is not null we want to send that off to the info component for processing
  getValue() {
      const currentElement = event.target;
      // @ts-ignore
      const id = currentElement.getAttribute("id")
    if (id != null) {
      this.emitter.emit(id); // destination: info.component.ts
    }
  }
}






