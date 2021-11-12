import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  averageSolutionTime: number = 0;
  mathForm = new FormGroup({
    firstNumber: new FormControl(this.randomNumber()),
    secondNumber: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, [MathValidators.addition('answer', 'firstNumber', 'secondNumber')]);  //custom validator

  constructor() { }

  //executed each time one tries to access the value of firstNumber
  get firstNumber() {
    return this.mathForm.value.firstNumber;
  }

  get secondNumber() {
    return this.mathForm.value.secondNumber;
  }

  ngOnInit(): void {
    //statusChanges is an Observable, emits an event('VALID'/'INVALID') every time the form value changes
    this.mathForm.statusChanges
      .pipe(
        filter(statusValue => statusValue === 'VALID'),   //if false, pipe will be stopped
        delay(300),
        scan((acc, value) => {
          return {    //this object is what is fed into the rest of the pipeline
            correctAnswers: acc.correctAnswers + 1,
            startTime: acc.startTime
          }
        }, { correctAnswers: 0, startTime: new Date() })   //this object is the initial value of the accumulator
      )
      .subscribe(({ correctAnswers, startTime }) => {
        this.averageSolutionTime = ((new Date().getTime() - startTime.getTime()) / (correctAnswers * 1000)) - 0.3;
        this.mathForm.setValue({
          firstNumber: this.randomNumber(),
          secondNumber: this.randomNumber(),
          answer: ''
        });
      })
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
