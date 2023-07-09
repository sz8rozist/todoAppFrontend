import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDateMask]',
})
export class DateMaskDirective {
  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target as HTMLInputElement;
    let trimmedValue = input.value.replace(/[^0-9]/g, '');

    if (trimmedValue.length > 8) {
      trimmedValue = trimmedValue.substr(0, 8);
    }

    if (trimmedValue.length >= 4) {
      const year = trimmedValue.substr(0, 4);
      const month = trimmedValue.substr(4, 2);
      const day = trimmedValue.substr(6, 2);
      trimmedValue = `${year}-${month}-${day}`;
    }

    input.value = trimmedValue;
  }
}
