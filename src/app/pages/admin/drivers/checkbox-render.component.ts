import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <input type="checkbox" [(ngModel)]="value" [disabled]="true"/>
  `,
})
export class CheckboxRenderComponent implements ViewCell, OnInit {

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
  }
}
