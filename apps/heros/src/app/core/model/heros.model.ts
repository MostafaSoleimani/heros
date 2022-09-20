export interface IHero {
    comics: { available: number, collectionURI: string, items: IHeroItem[], returned: number };
    description: string;
    events: { available: number, collectionURI: string, items: IHeroItem[], returned: number };
    id: number;
    modified: string;
    name: string;
    resourceURI: string;
    series: { available: number, collectionURI: string, items: IHeroItem[], returned: number };
    stories: { available: number, collectionURI: string, items: IHeroItem[], returned: number };
    thumbnail: { path: string, extension: string }
    urls: { type: string, url: string }[]
}

export interface IHeroItem {
    name: string;
    resourceURI: string;
}

export interface IApiResult<T> {
    attributionHTML: string;
    attributionText: string;
    code: number;
    copyright: string;
    data: { offset: number, limit: number, total: number, count: number, results: T[] }
    etag: string;
    status: string;
}