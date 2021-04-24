import {Component, Input, OnInit} from '@angular/core';
import {IApiItem, IShowcaseItem} from '../../model/types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item: IShowcaseItem;

  @Input() priceByBonus: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }


}
