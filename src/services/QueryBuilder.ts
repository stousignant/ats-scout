import { ATS_DOMAINS } from '../constants';

export class QueryBuilder {
  static build(role: string, location: string, domains: string[] = ATS_DOMAINS): string {
    const trimmedRole = role.trim();
    const trimmedLocation = location.trim();

    if (domains.length === 0) {
      throw new Error('At least one ATS domain must be provided.');
    }

    const sitesQuery = domains.map(d => `site:${d}`).join(' OR ');

    return `(${sitesQuery}) AND ("${trimmedRole}") AND ("${trimmedLocation}")`;
  }
}
