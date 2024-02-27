import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.css']
})
export class SectionTitleComponent {
  @Input() title: string = '';
  @Input() showTools: boolean = false;
  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();

  onEditClick() {
    this.editClicked.emit();
  }

  onDeleteClick() {
    this.deleteClicked.emit();
  }
}
