import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {IApiItem, IShowcaseFilter, IShowcaseItem} from '../../model/types';
import {DatabaseService} from '../../services/database.service';
import {SubSet} from '../../services/subset';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  @ViewChild('searchBox', {static: true}) searchBox: ElementRef;
  private subs = new SubSet();
  items: IShowcaseItem[];
  filteredItems: IShowcaseItem[];
  filtersData: IShowcaseFilter;
  currentFilters = {
    gradeList: null,
    subject: null,
    genre: null,
  };
  search = '';
  priceByBonus = false;
  loading: string | null;


  constructor(
    private databaseService: DatabaseService,
  ) {
  }

  ngOnInit(): void {
    this.subs.add = this.databaseService.loading.subscribe(
      data => {
        this.loading = data;
        console.log(this.loading);
      }
    );
    this.subs.add = this.databaseService.items.pipe(filter(data => !!data)).subscribe({
      next: data => {
        this.items = data;
        this.filteredItems = [...this.items];
      }
    });
    this.subs.add = this.databaseService.filtersData.subscribe({
      next: data => {
        data.genre.unshift('Все жанры');
        data.subject.unshift('Все предметы');
        data.gradeList.unshift('Все классы');
        this.filtersData = data;
        console.log(this.filtersData);
      }
    });
    this.initSearch();
  }

  initSearch() {
    fromEvent(this.searchBox.nativeElement, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      // filter(v => v.length > 2),
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe((value) => {
      this.search = value;
    });
  }

  applySearch(searchEl: HTMLInputElement) {
    this.search = searchEl.value;
  }

  applyFilters() {
    this.filteredItems = this.items.filter(item => {
      if (this.currentFilters.genre && item.genre !== this.currentFilters.genre) {
        return false;
      }
      if (this.currentFilters.subject && item.subject !== this.currentFilters.subject) {
        return false;
      }
      if (this.currentFilters.gradeList) {
        if (!item.gradeList.includes(this.currentFilters.gradeList)) {
          return false;
        }
      }
      return true;
    });
  }

  onSelectionChange(event: { value: any; index: number }, field: string): void {
    if (event.index === 0) {
      this.currentFilters[field] = null;
    } else {
      this.currentFilters[field] = event.value;
    }
    this.applyFilters();
  }

  onPriceByChange(e: any) {
    this.priceByBonus = !!e.target.checked;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
