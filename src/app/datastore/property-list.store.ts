import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertiesStore {

  private properties: Property[] = [{
    id: '1',
    name: "3bhk vlla",
    description: "Very Nice property",
    size: "200 sqft"
  }, {
    id: '2',
    name: "1bhk vlla",
    description: "Very Nice property",
    size: "200 sqft"
  }, {
    id: '3',
    name: "2bhk vlla",
    description: "Very Nice property",
    size: "200 sqft"
  }, {
    id: '4',
    name: "4bhk vlla",
    description: "Very Nice property",
    size: "200 sqft"
  }];

  private _subject = new BehaviorSubject<Property[]>([]);

  properties$: Observable<Property[]> = this._subject.asObservable();



  isLoading: boolean = false;



  constructor() {
    this._subject.next(this.properties);
  }

  addProperty(property: Property) {
    let index = 0;
    if (this.properties.length !== 0) {
      index = parseInt(this.properties[this.properties.length - 1].id) + 1;
    }
    property.id = index.toString();
    this.properties.push(property);
    this._subject.next(this.properties);
  }

  toggleSelection(id: String, isSelected: boolean) {
    const index = this.properties.findIndex(p => p.id === id);
    this.properties[index].isSelected = isSelected;
    this._subject.next(this.properties)
  }

  deleteProperty(): boolean {
    var deletionFlag = false;
    this.properties.forEach((item, index) => {
      if (item.isSelected) { this.properties.splice(index, 1); deletionFlag = true; }
    });
    this._subject.next(this.properties);
    return deletionFlag;
  }
}
