import { Source } from "./Source";

export class Article {
  constructor(
    public source?: Source,
    public id?: string,
    public name?: string,
    public author?: string,
    public title?: string,
    public description?: string,
    public url?: string,
    public urlToImage?: string,
    public publishedAt?: string,
    public content?: string
  ) {}
}
