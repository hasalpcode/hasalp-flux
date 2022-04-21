import { Component, OnInit } from '@angular/core';
import * as xml2js from 'xml2js'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { find } from 'rxjs';




@Component({
  selector: 'app-flux',
  templateUrl: './flux.component.html',
  styleUrls: ['./flux.component.css']
})
export class FluxComponent {
  title = 'read-xml-angular8';  
  public xmlItems: any;  
  constructor(private _http: HttpClient) { this.loadXML(); }  
  loadXML() {  
    this._http.get('/assets/user.xml',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      })  
      .subscribe((data) => {  
        this.parseXML(data)  
          .then((data) => {  
            this.xmlItems = data;  
          });  
      });  
  }  
  parseXML(data:any) {  
    return new Promise(resolve => {  
      var k: string | number,  
        arr:any = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err:any, result:any) {  
        var obj = result.channel;  
        for (k in obj.item) {  
          var elt = obj.item[k];  
          arr.push({  
            title: elt.title[0],  
            description: elt.description[0],
            
             
             
          });  
        }  
        resolve(arr);  
      });  
    });  
  } 
  // pagination
  pages: number = 1;
  dataset: any[] = ['1','2','3','4','5','6','7','8','9','10'];
  
}
