import { describe, it, expect } from 'vitest';
import { ResultsAggregator } from './ResultsAggregator';
import { ISearchService, SearchResult } from './SearchService';

class FakeSearchService implements ISearchService {
  constructor(private resultsMap: Record<string, SearchResult[] | Error>) {}

  async search(query: string): Promise<SearchResult[]> {
    const result = this.resultsMap[query];
    if (result instanceof Error) {
      throw result;
    }
    return result || [];
  }
}

describe('ResultsAggregator', () => {
  it('should return an empty list when no queries are provided', async () => {
    const service = new FakeSearchService({});
    const aggregator = new ResultsAggregator(service);
    const results = await aggregator.aggregate([]);
    expect(results).toEqual([]);
  });

  it('should return results from a single query', async () => {
    const mockResult: SearchResult = {
      title: 'Test Job',
      link: 'https://example.com/job/1',
      snippet: 'Test snippet',
    };
    const service = new FakeSearchService({
      'query1': [mockResult],
    });
    const aggregator = new ResultsAggregator(service);
    const results = await aggregator.aggregate(['query1']);
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual(mockResult);
  });

  it('should aggregate results from multiple queries', async () => {
    const result1: SearchResult = {
      title: 'Job 1',
      link: 'https://example.com/job/1',
      snippet: 'Snippet 1',
    };
    const result2: SearchResult = {
      title: 'Job 2',
      link: 'https://example.com/job/2',
      snippet: 'Snippet 2',
    };
    const service = new FakeSearchService({
      'query1': [result1],
      'query2': [result2],
    });
    const aggregator = new ResultsAggregator(service);
    const results = await aggregator.aggregate(['query1', 'query2']);
    expect(results).toHaveLength(2);
    expect(results).toContainEqual(result1);
    expect(results).toContainEqual(result2);
  });

  it('should deduplicate results based on link', async () => {
    const result1: SearchResult = {
      title: 'Job 1',
      link: 'https://example.com/job/1',
      snippet: 'Snippet 1',
    };
    // result2 has same link as result1
    const result2: SearchResult = {
      title: 'Job 1 Duplicate',
      link: 'https://example.com/job/1',
      snippet: 'Snippet 1 Duplicate',
    };
    const service = new FakeSearchService({
      'query1': [result1],
      'query2': [result2],
    });
    const aggregator = new ResultsAggregator(service);
    const results = await aggregator.aggregate(['query1', 'query2']);
    expect(results).toHaveLength(1);
    expect(results[0].link).toBe('https://example.com/job/1');
  });

  it('should handle errors in one query gracefully', async () => {
    const result1: SearchResult = {
      title: 'Job 1',
      link: 'https://example.com/job/1',
      snippet: 'Snippet 1',
    };
    const service = new FakeSearchService({
      'query1': [result1],
      'query2': new Error('Search failed'),
    });
    const aggregator = new ResultsAggregator(service);

    // Should not throw, and should return partial results
    const results = await aggregator.aggregate(['query1', 'query2']);
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual(result1);
  });
});
