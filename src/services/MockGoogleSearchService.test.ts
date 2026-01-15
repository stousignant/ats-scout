import { describe, it, expect } from 'vitest';
import { MockGoogleSearchService } from './MockGoogleSearchService';

describe('MockGoogleSearchService', () => {
  it('should return a list of mock search results', async () => {
    const service = new MockGoogleSearchService();
    const query = 'site:greenhouse.io AND "DevOps"';

    const results = await service.search(query);

    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);

    const firstResult = results[0];
    expect(firstResult).toHaveProperty('title');
    expect(firstResult).toHaveProperty('link');
    expect(firstResult).toHaveProperty('snippet');
  });

  it('should simulate a network delay (optional but good for realism)', async () => {
    const service = new MockGoogleSearchService();
    const start = Date.now();
    await service.search('test');
    const end = Date.now();

    // Expect at least some delay, e.g., > 100ms
    expect(end - start).toBeGreaterThanOrEqual(100);
  });
});
