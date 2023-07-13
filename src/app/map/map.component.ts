import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent{
  @Output() emitter = new EventEmitter<any>()

  getValue() {
      // @ts-ignore
      const currentElement = event.target;
      // @ts-ignore
      const id = currentElement.getAttribute("id")
    if (id != null) {
      this.emitter.emit(id);
    }
  }
}






