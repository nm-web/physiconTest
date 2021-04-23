import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';



@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() set options(options: string[]) {
    this.optionsWithIndex = options.map((value, index) => ({value, index}));
    this.selectedOption = this.optionsWithIndex[0];
  }
  @Output() selectionChange = new EventEmitter<{ value: any; index: number }>();
  optionsWithIndex: { value: any; index: number }[];
  selectedOption: { value: any; index: number };

  constructor() { }

  ngOnInit(): void {

  }


}
