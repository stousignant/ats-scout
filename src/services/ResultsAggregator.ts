import { type ISearchService, type SearchResult } from './SearchService';

export class ResultsAggregator {
  constructor(private searchService: ISearchService) {}

  async aggregate(queries: string[]): Promise<SearchResult[]> {
    if (queries.length === 0) {
      return [];
    }

    const promises = queries.map((query) => this.searchService.search(query));
    const results = await Promise.allSettled(promises);

    const successfulResults: SearchResult[] = [];

    for (const result of results) {
      if (result.status === 'fulfilled') {
        successfulResults.push(...result.value);
      } else {
        // Optionally log error here
        console.error(`Search query failed:`, result.reason);
      }
    }

    // Deduplicate by link
    const uniqueResults: SearchResult[] = [];
    const seenLinks = new Set<string>();

    for (const res of successfulResults) {
      if (!seenLinks.has(res.link)) {
        seenLinks.add(res.link);
        uniqueResults.push(res);
      }
    }

    return uniqueResults;
  }
}
