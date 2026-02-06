#!/usr/bin/env bun
/**
 * Anthropic Claude Code Documentation Scraper
 *
 * Scrapes daily updates from:
 * 1. GitHub repo (commits, releases, PRs)
 * 2. Documentation site
 * 3. Release notes
 *
 * Generates daily markdown report in daily/{YEAR}/{MONTH}/{DATE}.md
 */

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  html_url: string;
  published_at: string;
  body: string;
}

interface GitHubPR {
  number: number;
  title: string;
  html_url: string;
  merged_at: string;
}

interface DocPage {
  title: string;
  url: string;
  lastUpdated: string;
}

interface DailyReport {
  date: string;
  summary: string;
  github: {
    commits: GitHubCommit[];
    releases: GitHubRelease[];
    pullRequests: GitHubPR[];
  };
  docs: DocPage[];
  releaseNotes: string[];
}

const GITHUB_REPO = "anthropics/claude-code";
const DOCS_BASE_URL = "https://code.claude.com/docs";
const RELEASE_NOTES_URL = "https://platform.claude.com/docs/en/release-notes/overview";

// Format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Get year/month/day parts for directory structure
function getDateParts(date: Date): { year: string; month: string; day: string } {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return { year, month, day };
}

// Fetch GitHub commits from last 24 hours
async function fetchRecentCommits(): Promise<GitHubCommit[]> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const url = `https://api.github.com/repos/${GITHUB_REPO}/commits?since=${since}&per_page=100`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "claude-code-docs-scraper",
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const commits = await response.json();
    return commits.map((commit: any) => ({
      sha: commit.sha.substring(0, 7),
      commit: {
        message: commit.commit.message.split("\n")[0],
        author: {
          name: commit.commit.author.name,
          date: commit.commit.author.date,
        },
      },
      html_url: commit.html_url,
    }));
  } catch (error) {
    console.error("Error fetching commits:", error);
    return [];
  }
}

// Fetch recent GitHub releases
async function fetchRecentReleases(): Promise<GitHubRelease[]> {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=10`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "claude-code-docs-scraper",
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const releases = await response.json();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    return releases
      .filter((r: any) => r.published_at && new Date(r.published_at) > oneDayAgo)
      .map((release: any) => ({
        tag_name: release.tag_name,
        name: release.name || release.tag_name,
        html_url: release.html_url,
        published_at: release.published_at,
        body: release.body?.substring(0, 200) + "..." || "",
      }));
  } catch (error) {
    console.error("Error fetching releases:", error);
    return [];
  }
}

// Fetch recently merged PRs
async function fetchRecentPRs(): Promise<GitHubPR[]> {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&sort=updated&per_page=30`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "claude-code-docs-scraper",
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const prs = await response.json();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    return prs
      .filter((pr: any) => pr.merged_at && new Date(pr.merged_at) > oneDayAgo)
      .map((pr: any) => ({
        number: pr.number,
        title: pr.title,
        html_url: pr.html_url,
        merged_at: pr.merged_at,
      }));
  } catch (error) {
    console.error("Error fetching PRs:", error);
    return [];
  }
}

// Check documentation site for updates
async function checkDocumentationUpdates(): Promise<DocPage[]> {
  const results: DocPage[] = [];

  try {
    const response = await fetch('https://code.claude.com/docs');
    if (!response.ok) {
      console.warn('Failed to fetch docs site:', response.status);
      return [];
    }

    const html = await response.text();
    const linkRegex = /href="\/docs\/([^"]+)"/g;
    const links = new Set<string>();
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      links.add(match[1]);
    }

    for (const link of links) {
      results.push({
        title: link.split('/').pop() || link,
        url: `${DOCS_BASE_URL}/${link}`,
        lastUpdated: new Date().toISOString(),
      });
    }

    console.log(`Found ${results.length} documentation pages`);
  } catch (error) {
    console.error('Error checking documentation updates:', error);
  }

  return results;
}

// Check release notes for updates
async function checkReleaseNotes(): Promise<string[]> {
  const notes: string[] = [];

  try {
    const response = await fetch(RELEASE_NOTES_URL);
    if (!response.ok) {
      console.warn('Failed to fetch release notes:', response.status);
      return [];
    }

    const html = await response.text();
    const headingRegex = /<h[23][^>]*>(.*?)<\/h[23]>/gi;
    let match;

    while ((match = headingRegex.exec(html)) !== null) {
      const text = match[1].replace(/<[^>]*>/g, '').trim();
      if (text && text.length > 0) {
        notes.push(text);
      }
    }

    console.log(`Found ${notes.length} release note entries`);
  } catch (error) {
    console.error('Error checking release notes:', error);
  }

  return notes;
}

// Generate markdown report
function generateMarkdown(report: DailyReport): string {
  const { year, month, day } = getDateParts(new Date(report.date));

  let md = `# Anthropic Claude Code Documentation Update - ${report.date}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;

  // Summary section
  md += `## Summary\n\n`;
  md += `${report.summary}\n\n`;

  // GitHub Commits
  if (report.github.commits.length > 0) {
    md += `## GitHub Commits (${report.github.commits.length})\n\n`;
    for (const commit of report.github.commits) {
      md += `- [${commit.sha}](${commit.html_url}) - ${commit.commit.message}\n`;
      md += `  - by ${commit.commit.author.name} at ${new Date(commit.commit.author.date).toISOString()}\n`;
    }
    md += `\n`;
  } else {
    md += `## GitHub Commits\n\nNo commits in the last 24 hours.\n\n`;
  }

  // Releases
  if (report.github.releases.length > 0) {
    md += `## Releases (${report.github.releases.length})\n\n`;
    for (const release of report.github.releases) {
      md += `- [${release.tag_name}](${release.html_url}) - ${release.name}\n`;
      md += `  - ${release.body}\n`;
      md += `  - Published: ${new Date(release.published_at).toISOString()}\n`;
    }
    md += `\n`;
  } else {
    md += `## Releases\n\nNo new releases in the last 24 hours.\n\n`;
  }

  // Pull Requests
  if (report.github.pullRequests.length > 0) {
    md += `## Merged Pull Requests (${report.github.pullRequests.length})\n\n`;
    for (const pr of report.github.pullRequests) {
      md += `- [#${pr.number}](${pr.html_url}) - ${pr.title}\n`;
      md += `  - Merged: ${new Date(pr.merged_at).toISOString()}\n`;
    }
    md += `\n`;
  } else {
    md += `## Merged Pull Requests\n\nNo PRs merged in the last 24 hours.\n\n`;
  }

  // Documentation Updates
  if (report.docs.length > 0) {
    md += `## Documentation Pages (${report.docs.length})\n\n`;
    md += `*Current documentation pages available:\n\n`;
    for (const doc of report.docs.slice(0, 20)) {
      md += `- [${doc.title}](${doc.url})\n`;
    }
    if (report.docs.length > 20) {
      md += `\n*... and ${report.docs.length - 20} more pages*\n`;
    }
    md += `\n`;
  }

  // Release Notes
  if (report.releaseNotes.length > 0) {
    md += `## Platform Release Notes\n\n`;
    for (const note of report.releaseNotes.slice(0, 10)) {
      md += `- ${note}\n`;
    }
    if (report.releaseNotes.length > 10) {
      md += `\n*... and ${report.releaseNotes.length - 10} more entries*\n`;
    }
    md += `\n`;
  }

  // Footer
  md += `---\n`;
  md += `*Generated by [claude-code-anthropic-docs](https://github.com/ebowwa/claude-code-anthropic-docs) daily automation*\n`;
  md += `*Data sourced from [anthropics/claude-code](https://github.com/anthropics/claude-code), [code.claude.com](https://code.claude.com/docs), and [platform.claude.com](https://platform.claude.com)*\n`;

  return md;
}

// Save report to file
async function saveReport(markdown: string, date: Date): Promise<string> {
  const { year, month, day } = getDateParts(date);
  const dir = `daily/${year}/${month}`;
  const filepath = `${dir}/${day}.md`;

  // Ensure directory exists
  await $`mkdir -p ${dir}`;

  await Bun.write(filepath, markdown);

  return filepath;
}

// Main execution
async function main() {
  console.log("🔍 Scraping Anthropic Claude Code documentation...");

  const today = new Date();
  const dateStr = formatDate(today);

  // Fetch all data in parallel
  const [commits, releases, prs, docs, releaseNotes] = await Promise.all([
    fetchRecentCommits(),
    fetchRecentReleases(),
    fetchRecentPRs(),
    checkDocumentationUpdates(),
    checkReleaseNotes(),
  ]);

  // Build summary
  let summary = "";
  const parts = [];
  if (commits.length > 0) parts.push(`${commits.length} commit${commits.length > 1 ? "s" : ""}`);
  if (releases.length > 0) parts.push(`${releases.length} release${releases.length > 1 ? "s" : ""}`);
  if (prs.length > 0) parts.push(`${prs.length} PR${prs.length > 1 ? "s" : ""}`);
  if (docs.length > 0) parts.push(`${docs.length} doc page${docs.length > 1 ? "s" : ""}`);
  if (releaseNotes.length > 0) parts.push(`${releaseNotes.length} release note${releaseNotes.length > 1 ? "s" : ""}`);

  if (parts.length === 0) {
    summary = "No updates detected in the last 24 hours.";
  } else {
    summary = `Daily updates: ${parts.join(", ")}.`;
  }

  const report: DailyReport = {
    date: dateStr,
    summary,
    github: { commits, releases, pullRequests: prs },
    docs,
    releaseNotes,
  };

  const markdown = generateMarkdown(report);
  const filepath = await saveReport(markdown, today);

  console.log(`✅ Report saved to: ${filepath}`);
  console.log(`   Summary: ${summary}`);
}

main().catch(console.error);
