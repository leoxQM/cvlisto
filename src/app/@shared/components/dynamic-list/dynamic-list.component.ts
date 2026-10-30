import { Component, ContentChild, input, output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dynamic-list',
  imports: [CommonModule, ButtonModule],
  templateUrl: './dynamic-list.component.html',
  styleUrl: './dynamic-list.component.css'
})
export class DynamicListComponent<T extends { id: string }> {

  title = input.required<string>();
  items = input.required<T[]>();

  onAdd = output<void>();
  onRemove = output<string>();

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{ $implicit: T }>;
}
