# ATS Scout 🕵️‍♀️

ATS Scout is a React/TypeScript application that automates "Google Dorking" to find job listings directly on Applicant Tracking System (ATS) domains. It aggregates results from multiple sources into a single, filterable dashboard, allowing users to bypass noisy job boards.

## 🎯 Project Goal (MVP)
To build a tool that generates and executes advanced Google Search queries (e.g., `site:jobs.ashbyhq.com AND "DevOps"`) to find specific roles across 10+ different ATS platforms, aggregating the results into a unified UI.

## 🛠 Tech Stack
- **Language:** TypeScript
- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS (for rapid UI development)
- **State Management:** React Context or Zustand (keep it simple for MVP)
- **Testing:** Vitest + React Testing Library (Strict TDD)
- **Search Integration:** Google Custom Search JSON API (or SERP scraping fallback)

## 📋 Features (MVP)

### 1. Search Configuration (UI)
- **Role Input:** Text field to input roles (e.g., "DevOps", "SRE").
- **Location Input:** Text field for location constraints (e.g., "Canada", "Remote").
- **ATS Selection:** Checkbox list to select which ATS domains to include in the search (defaults to all).

### 2. The Search Engine (Logic)
- **Query Builder:** A utility that constructs the Google search string.
  - *Format:* `site:{ats_domain} AND ("{role_1}" OR "{role_2}") AND ("{location}")`
- **Aggregator:** A service that runs the queries for each selected ATS and normalizes the results.

### 3. Results Dashboard
- **List View:** Display job title, company (parsed from title/snippet), ATS source, and a direct link.
- **Filtering:** Client-side filtering of the aggregated list.

## 📂 Target ATS Domains
The system must support generating queries for the following domains:
1. `greenhouse.io`
2. `jobs.lever.co`
3. `jobs.smartrecruiters.com`
4. `wd1.myworkdayjobs.com`
5. `jobs.bamboohr.com`
6. `jobs.jobvite.com`
7. `careers.icims.com`
8. `apply.jazz.co`
9. `careers.workable.com`
10. `jobs.ashbyhq.com`
11. `apply.workable.com`
12. `breezy.hr`
13. `secure.collage.co` (Canadian focus)

## 🧪 Testing Strategy (TDD)
We are following a strict Test-Driven Development approach.
1. **Unit Tests:** All search logic, query building strings, and data normalization utilities must have unit tests written *before* implementation.
2. **Component Tests:** Key UI components (SearchForm, ResultsList) must be tested for rendering and user interaction.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Google Custom Search API Key (optional for dev, required for prod)

### Installation
```bash
npm install
```
