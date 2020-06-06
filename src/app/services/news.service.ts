import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { Article } from "../Models/Article";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  apiKey = "c1de374b351e434c98e009f2ddd27ff3";
  urlEverything = "https://newsapi.org/v2/everything";
  urlHeadLines = "https://newsapi.org/v2/top-headlines";
  urlSources = "https://newsapi.org/v2/sources";

  private articleSub = new BehaviorSubject<Article>(null);

  constructor(private http: HttpClient) {}

  getEverythingPaginated10(sourceId: string, pageNumber: number, q?: string) {
    let params = new HttpParams();
    params = params.append("pageSize", "10"); //CONSTANT
    params = params.append("page", `${pageNumber}`);
    params = params.append("sources", sourceId);
    params = params.append("apiKey", this.apiKey);
    if (q) {
      params = params.append("q", q);
    }
    return this.http.get(this.urlEverything, { params: params });
  }

  getSources() {
    let params = new HttpParams();
    params = params.append("apiKey", this.apiKey);
    return this.http.get(this.urlSources, { params: params });
  }

  getHeadlinesPaginated10(
    sourceId: string,
    pageNumber: number,
    q?: string,
    country?: string
  ) {
    let params = new HttpParams();
    params = params.append("pageSize", "10"); //CONSTANT
    params = params.append("page", `${pageNumber}`);
    params = params.append("sources", sourceId);
    params = params.append("apiKey", this.apiKey);
    if (q) {
      params = params.append("q", q);
    }
    if (country) {
      params = params.append("country", country);
    }
    return this.http.get(this.urlHeadLines, { params: params });
  }

  getCountries() {
    return [
      { id: "eg", name: "Egypt" },
      { id: "ae", name: "The United Arab Emirates" },
      { id: "ar", name: "Argentina" },
      { id: "at", name: "Austria" },
      { id: "au", name: "Australia" },
      { id: "be", name: "Belgium" },
      { id: "bg", name: "Bulgaria" },
      { id: "br", name: "Brazil" },
      { id: "ca", name: "Canada" },
      { id: "ch", name: "Switzerland" },
      { id: "cn", name: "China" },
      { id: "co", name: "Colombia" },
      { id: "cu", name: "Cuba" },
      { id: "cz", name: "Czechia" },
      { id: "de", name: "Germany" },
      { id: "fr", name: "France" },
      { id: "gb", name: "United Kingdom" },
      { id: "gr", name: "Greece" },
      { id: "hk", name: "Hong Kong" },
      { id: "hu", name: "Hungary" },
      { id: "id", name: "Indonesia" },
      { id: "ie", name: "Ireland" },
      { id: "il", name: "Israel" },
      { id: "in", name: "India" },
      { id: "it", name: "Italy" },
      { id: "jp", name: "Japan" },
      { id: "kr", name: "Korea" },
      { id: "lt", name: "Lithuania" },
      { id: "lv", name: "Latvia" },
      { id: "ma", name: "Morocco" },
      { id: "mx", name: "Mexico" },
      { id: "mi", name: "Namibia" },
      { id: "ng", name: "Nigeria" },
      { id: "nl", name: "Netherlands" },
      { id: "no", name: "Norway" },
      { id: "nz", name: "New Zealand" },
      { id: "ph", name: "Philippines" },
      { id: "pl", name: "Poland" },
      { id: "pt", name: "Portugal" },
      { id: "ro", name: "Romania" },
      { id: "rs", name: "Serbia" },
      { id: "ru", name: "Russia" },
      { id: "sa", name: "Saudi Arabia" },
      { id: "se", name: "Sweden" },
      { id: "sg", name: "Singapore" },
      { id: "si", name: "Slovenia" },
      { id: "sk", name: "Slovakia" },
      { id: "th", name: "Thailand" },
      { id: "tr", name: "Turkey" },
      { id: "tw", name: "Taiwan" },
      { id: "ua", name: "Ukraine" },
      { id: "us", name: "USA" },
      { id: "ve", name: "Venezuela" },
      { id: "za", name: "Zambia" },
    ];
  }

  setArticleSub(article: Article) {
    this.articleSub.next(article);
  }

  getArticleSubLastValue() {
    return this.articleSub.value;
  }
}
