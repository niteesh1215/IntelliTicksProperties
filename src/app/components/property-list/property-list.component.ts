import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PropertiesStore } from 'src/app/datastore/property-list.store';
import { Property } from 'src/app/models/property.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  selectedProperties: Property[] = [];

  addPropertyForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    size: ['', [Validators.required]]
  });

  constructor(public propertiesStore: PropertiesStore, private formBuilder: FormBuilder, private modalService: NgbModal, private notifierService: NotifierService) {

  }

  get f() { return this.addPropertyForm.controls; }

  ngOnInit(): void {
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  addNewProperty(): void {
    if (!this.addPropertyForm.valid) return;
    const propertyData = this.addPropertyForm.value;
    this.addPropertyForm.reset();
    this.propertiesStore.addProperty({
      id: '',
      name: propertyData.name,
      description: propertyData.description,
      size: propertyData.size
    });
    this.notifierService.notify('success', 'Added Successfully');
    this.modalService.dismissAll();
  }

  selectionChange(event: any, id: string): void {
    console.log(event.target.checked);
    this.propertiesStore.toggleSelection(id, event.target.checked);
  }

  delete(): void {
    const deletionFlag = this.propertiesStore.deleteProperty();

    if (deletionFlag)
      this.notifierService.notify('success', 'Deleted Successfully');
  }
}
