import { Directive, ElementRef, HostListener } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Optional } from '@angular/core';

@Directive({
  selector: '[appUppercaseText]',
  standalone: true,
})
export class UppercaseText {
  
  constructor(private renderer: Renderer2, private el: ElementRef,@Optional() private control: NgControl) {}

 @HostListener('input', ['$event'])
  onInput(event: Event): void {
  const input = this.el.nativeElement as HTMLInputElement;
  const upperValue = input.value.toUpperCase();
  this.renderer.setProperty(input, 'value', upperValue);
   
  // Update Angular model (Reactive or Template-driven)
    if (this.control?.control) {
      this.control.control.setValue(upperValue, { emitEvent: false });
    }

}

  
  // constructor(private el: ElementRef<HTMLInputElement>) {}

  // @HostListener('input', ['$event'])
  // onInput(event: Event): void {
  //   const input = this.el.nativeElement as HTMLInputElement;
  //   const upperValue = input.value.toUpperCase();
  //   input.value = upperValue;

  //   const inputEvent = new Event('input', { bubbles: true });
  //   input.dispatchEvent(inputEvent);

  // //  if (event.target instanceof HTMLInputElement) {
  // //    event.target.value = upperValue;
  // //   }
  // }
}
