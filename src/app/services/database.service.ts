import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {delay} from 'rxjs/operators';
import {IApiItem, IShowcaseFilter, IShowcaseItem} from '../model/types';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  items = new BehaviorSubject<IShowcaseItem[] | null>(null);
  filtersData = new BehaviorSubject<IShowcaseFilter>({
    genre: [],
    subject: [],
    gradeList: []
  });
  loading = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
  ) {
    this.loadData();
  }

  loadData(): void {
    this.loading.next('Подождите, идет загрузка данных');
    this.http.post('https://krapipl.imumk.ru:8443/api/mobilev1/update', {data: ''})
      .subscribe({
        next: (data: any) => {
          const items = data.items;
          console.log('items:', items);
          this.processData(items);
          this.loading.next(null);
        },
        error: (err) => {
          this.items.next(null);
          this.loading.next('Произошла ошибка, обновите страницу');
        }
      });
  }

  processData(items: IApiItem[]): void {
    const showcaseItems = items.map(el => this.convertItem(el));
    this.filtersData.next(this.createFiltersData(showcaseItems));
    this.items.next(showcaseItems);
  }

  convertItem(item: IApiItem): IShowcaseItem {
    return {
      ...item,
      gradeList: item.grade.split(';').filter(el => !!el),
      urlOffer: item.shopUrl.replace('https://multiring.ru/shop/details','https://www.imumk.ru/offer')
    };
  }

  createFiltersData(items: IShowcaseItem[]): IShowcaseFilter {
    const genre = new Set<string>();
    const subject = new Set<string>();
    const grade = new Set<string>();
    items.forEach((el) => {
      genre.add(el.genre);
      subject.add(el.subject);
      el.gradeList.forEach((gr) => grade.add(gr));
    });
    return {
      genre: Array.from(genre).sort(),
      subject: Array.from(subject).sort(),
      gradeList: Array.from(grade).sort((a,b) => +a - +b ),
    }
  }


}
