export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export class MockGoogleSearchService {
  async search(query: string): Promise<SearchResult[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock results
    return [
      {
        title: 'Senior DevOps Engineer at Greenhouse',
        link: 'https://boards.greenhouse.io/example/jobs/12345',
        snippet: 'We are looking for a Senior DevOps Engineer to join our team...',
      },
      {
        title: 'Software Engineer - SRE at Ashby',
        link: 'https://jobs.ashbyhq.com/example/jobs/67890',
        snippet: 'Join our SRE team to build scalable infrastructure...',
      },
      {
        title: 'Product Manager - Remote (Canada)',
        link: 'https://jobs.lever.co/example/jobs/11223',
        snippet: 'Looking for a Product Manager to lead our remote team in Canada...',
      },
    ];
  }
}
