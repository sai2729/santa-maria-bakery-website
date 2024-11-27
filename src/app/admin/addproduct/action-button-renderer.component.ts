import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-button-renderer',
  template: `
    <button class="btn btn-danger btn-sm" (click)="onDelete()">Delete</button>
  `,
})
export class ActionButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  // Called by AG Grid to initialize the component
  agInit(params: any): void {
    this.params = params;
  }

  // Refresh the component (not typically required here)
  refresh(params: any): boolean {
    return false;
  }

  // Emit the delete action
  onDelete(): void {
    if (this.params && this.params.onDelete) {
      this.params.onDelete(this.params.data);
    }
  }
}