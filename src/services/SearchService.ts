export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export interface ISearchService {
  search(query: string): Promise<SearchResult[]>;
}
