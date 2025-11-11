import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
})
export class InputComponent {
  @Input() placeholder = '';
}
