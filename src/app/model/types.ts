export interface IApiItem {
  courseId: string;
  extId: string;
  courseHash: string;
  title: string;
  grade: string;
  genre: string;
  subject: string;
  itunes_id: string;
  progress: number;
  description: string;
  status: string;
  price: number;
  shopUrl: string;
  google_id: string;
  winstore_id: string;
  isNew: boolean;
  priceBonus: number;
  lang: string;
  size: number;
  requireUpdate: boolean;
}

export interface IShowcaseItem extends IApiItem {
  gradeList: string[];
  urlOffer: string;
}

export interface IShowcaseFilter {
  gradeList: string[];
  genre: string[];
  subject: string[];
}

