import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPrettyprint]'
})
export class PrettyprintDirective {

  constructor() { 
    console.log(' class PrettyprintDirective');

  }
//  constructor(elr:ElementRef){      console.log(' class PrettyprintDirective');    //elr.nativeElement.style.background='red';}
}
