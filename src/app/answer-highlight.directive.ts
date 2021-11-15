import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, filter } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {

  constructor(
    private el: ElementRef,   //by dependency injection, gives a ref to the element the directive is applied to
    private controlName: NgControl    //gives ref to a FormControlName object, which has a copy of the content of the FormControl of the element to which the directive is applied
  ) { }

  //if answer is correct, the input box will have a green background
  ngOnInit() {
    this.controlName.control?.parent?.valueChanges
      .pipe(
        map(({ firstNumber, secondNumber, answer }) => (firstNumber + secondNumber === parseInt(answer))),
      )
      .subscribe((value) => {
        if (value === true) {
          this.el.nativeElement.classList.add('correct');
        } else {
          this.el.nativeElement.classList.remove('correct');
        }
      });
  }
}
