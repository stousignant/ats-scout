import { describe, it, expect } from 'vitest';
import { QueryBuilder } from './QueryBuilder';
import { ATS_DOMAINS } from '../constants';

describe('QueryBuilder', () => {
  it('builds a query for a single role and location with default domains', () => {
    const role = 'DevOps';
    const location = 'Remote';
    const query = QueryBuilder.build(role, location);

    // Check if all default domains are present
    ATS_DOMAINS.forEach(domain => {
      expect(query).toContain(`site:${domain}`);
    });

    // Check structure
    expect(query).toContain(`AND ("${role}")`);
    expect(query).toContain(`AND ("${location}")`);

    // Check grouping of sites
    expect(query).toMatch(/^\(site:.*\) AND/);
  });

  it('builds a query for specific domains', () => {
    const role = 'SRE';
    const location = 'Canada';
    const domains = ['greenhouse.io', 'jobs.lever.co'];

    const query = QueryBuilder.build(role, location, domains);

    expect(query).toContain('site:greenhouse.io');
    expect(query).toContain('site:jobs.lever.co');
    expect(query).not.toContain('site:jobs.smartrecruiters.com');

    // Exact structure check
    expect(query).toBe('(site:greenhouse.io OR site:jobs.lever.co) AND ("SRE") AND ("Canada")');
  });

  it('handles trimming of inputs', () => {
    const query = QueryBuilder.build('  Frontend  ', '  NY  ', ['example.com']);
    expect(query).toBe('(site:example.com) AND ("Frontend") AND ("NY")');
  });

  it('throws an error when domains list is empty', () => {
    expect(() => {
      QueryBuilder.build('DevOps', 'Remote', []);
    }).toThrow('At least one ATS domain must be provided.');
  });
});
