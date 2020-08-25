import {Component, Input, OnInit} from '@angular/core';
import {WorkshopAlias, WorkshopBindings, WorkshopSnippet} from '../../../../schemas/Workshop';
import {debrace} from '../../../../shared/DisplayUtils';

@Component({
  selector: 'avr-collectable-display',
  templateUrl: './collectable-display.component.html',
  styleUrls: ['./collectable-display.component.scss']
})
export class CollectableDisplayComponent implements OnInit {
  // exports
  debrace = debrace;

  @Input() collectable: WorkshopAlias | WorkshopSnippet;
  @Input() isAlias: boolean;
  @Input() parentComponent: CollectableDisplayComponent;
  @Input() bindings: WorkshopBindings;
  isOpen = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  // event listeners
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  // helpers
  getBoundName() {
    const bindings = this.isAlias ? this.bindings?.alias_bindings : this.bindings?.snippet_bindings;
    if (this.bindings && bindings.some(b => b.id === this.collectable._id)) {
      return bindings.find(b => b.id === this.collectable._id).name;
    } else {
      return this.collectable.name;
    }
  }

  hasCustomBindings() {
    return this.getBoundName() !== this.collectable.name;
  }

  getSignature() {
    const boundName = this.getBoundName();
    if (this.isAlias) {
      if (this.parentComponent) {
        return `${this.parentComponent.getSignature()} ${boundName}`;
      }
      return `!${boundName}`;
    } else {
      return boundName;
    }
  }

  getUnboundSignature() {
    if (this.isAlias) {
      if (this.parentComponent) {
        return `${this.parentComponent.getSignature()} ${this.collectable.name}`;
      }
      return `!${this.collectable.name}`;
    } else {
      return this.collectable.name;
    }
  }

  getShortDocs() {
    return this.collectable.docs.split('\n')[0];
  }

  canOpen() {
    return this.getShortDocs() !== this.collectable.docs;
  }
}
