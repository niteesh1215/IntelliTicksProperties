import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PropertiesStore } from 'src/app/datastore/properties.store';
import { Property } from 'src/app/models/property.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  selectedProperties: Property[] = [];

  addPropertyForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    size: ['', [Validators.required]],
  });

  constructor(
    public propertiesStore: PropertiesStore,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  get f() {
    return this.addPropertyForm.controls;
  }

  ngOnInit(): void {}

  openModal(content: any) {
    this.modalService.open(content);
  }

  addNewProperty(): void {
    if (!this.addPropertyForm.valid) return;
    const propertyData = this.addPropertyForm.value;
    this.addPropertyForm.reset();
    this.propertiesStore.addProperty({
      name: propertyData.name,
      description: propertyData.description,
      size: propertyData.size,
    });
    this.modalService.dismissAll();
  }

  selectionChange(event: any, id: string): void {
    this.propertiesStore.toggleSelection(id, event.target.checked);
  }

  delete(): void {
    this.propertiesStore.deleteProperty();
  }
}
