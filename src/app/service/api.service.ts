import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { secret } from '../../environments/secret';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://api.airtable.com/v0/appXNIGmxr3LLbYE9/property';
  headers = {
    Authorization: 'Bearer ' + secret.apiKey,
  };

  constructor(private http: HttpClient) {}

  retriveProperties(): Observable<Property[]> {
    return this.http
      .get<Result>(this.baseUrl, this.getHeaders())
      .pipe(map(this.transformResult));
  }

  addProperty(property: Property): Observable<Property[]> {
    return this.http
      .post<Result>(
        this.baseUrl,
        {
          records: [
            {
              fields: property,
            },
          ],
        },
        this.getHeaders()
      )
      .pipe(map(this.transformResult));
  }

  deleteProperties(ids: string[]) {
    var url = this.baseUrl + '?';
    for (const id of ids) {
      url += 'records[]=' + id + '&';
    }

    return this.http.delete(
      url.substring(0, url.length - 1),
      this.getHeaders()
    );
  }

  private transformResult = (result: Result) => {
    const properties: Array<Property> = [];
    const records: Array<Record> = result.records;
    for (var i = 0; i < records.length; i++) {
      var property = records[i].fields;
      property.id = records[i].id;
      properties.push(records[i].fields);
    }

    return properties;
  };

  private getHeaders() {
    return {
      headers: new HttpHeaders(this.headers),
    };
  }
}

interface Result {
  records: Record[];
}

interface Record {
  id: string;
  fields: Property;
  createdTime: Date;
}
