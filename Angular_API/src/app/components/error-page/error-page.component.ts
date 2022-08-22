
import { Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private elementRef:ElementRef) {};

  public ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/tresEnRaya.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
