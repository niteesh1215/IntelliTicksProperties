import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root',
})
export class PropertiesStore {
  private properties!: Property[];
  private toDeleteIds: string[] = [];

  private _subject = new BehaviorSubject<Property[]>([]);

  properties$: Observable<Property[]> = this._subject.asObservable();

  constructor(
    private apiService: ApiService,
    private notifierService: NotifierService
  ) {
    this.retrieveProperties();
  }

  retrieveProperties() {
    this.apiService.retriveProperties().subscribe({
      next: (properties: Property[]) => {
        this.properties = properties;
        this.reflectChange();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  addProperty(property: Property) {
    this.apiService.addProperty(property).subscribe({
      next: (response: Property[]) => {
        this.properties.push(response[0]);
        this.notifierService.notify('success', 'Added Successfully');
        this.reflectChange();
      },
      error: (e) => {
        console.log(e);
        this.notifierService.notify('error', 'Failed to add');
      },
    });
  }

  toggleSelection(id: string, select: boolean) {
    const index = this.properties.findIndex((p) => p.id === id);
    this.properties[index].isSelected = select;
    if (select) {
      this.toDeleteIds.push(id);
    } else {
      const index = this.toDeleteIds.indexOf(id);
      this.toDeleteIds.splice(index, 1);
    }
  }

  deleteProperty() {
    this.apiService.deleteProperties(this.toDeleteIds).subscribe({
      next: (response) => {
        console.log(response);
        this.properties.forEach((item, index) => {
          const i = this.toDeleteIds.indexOf(item.id!);
          if (i != -1) {
            this.properties.splice(index, 1);
          }
        });
        this.toDeleteIds = [];
        this.notifierService.notify('success', 'Deleted Successfully');
      },
      error: (e) => {
        console.log(e);
        this.notifierService.notify('error', 'Failed to delete');
      },
    });
  }

  private reflectChange() {
    this._subject.next(this.properties);
  }
}
