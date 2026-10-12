// All project copy lives here. Source of truth:
// https://github.com/paulard10/consumer-data-readiness-portfolio (root README and
// each project README). Every figure below is quoted from those files — when the
// repository changes, update this file to match.

export const repo = "https://github.com/paulard10/consumer-data-readiness-portfolio"
const tree = (path: string) => `${repo}/tree/main/${path}`
const blob = (path: string) => `${repo}/blob/main/${path}`

export type Finding = { value: string; label: string }
export type Step = { title: string; body: string }
export type Screenshot = {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}
export type RepoLink = { label: string; href: string }
export type DataTable = {
  caption: string
  columns: string[]
  rows: string[][]
  /** Optional emphasised final row, e.g. a total. */
  total?: string[]
}

export type Project = {
  slug: string
  index: "01" | "02" | "03"
  stage: string
  title: string
  stack: string[]
  tools: string[]
  question: string
  summary: string
  built: string[]
  findingsLabel: string
  findings: Finding[]
  /** The project folder on GitHub. */
  github: string
  repoLinks: RepoLink[]
  /** What this project hands to the next one in the pipeline. */
  output: string
  screenshots: Screenshot[]
  caseStudy: {
    problem: string
    data: string
    approach: Step[]
    table?: DataTable
    note?: { title: string; body: string }
    insights: string[]
    recommendations?: string[]
    learned: string[]
    next: string[]
  }
}

export const projects: Project[] = [
  {
    slug: "data-readiness",
    index: "01",
    stage: "Data Readiness",
    title: "Consumer Data Readiness Analysis",
    stack: ["SQL", "Excel"],
    tools: [
      "SQL (SQLite)",
      "DB Browser for SQLite",
      "Excel",
      "PivotTables",
      "Structured Tables",
      "Conditional Formatting",
    ],
    question:
      "Is consumer data from four source systems accurate, consistent, consented and structured enough for marketing activation?",
    summary:
      "Profiles, harmonises and validates 10,150 synthetic consumer records, then scores them on a weighted five-dimension Data Readiness Score.",
    built: [
      "SQL harmonisation of country, product and lifecycle taxonomies with CASE logic, leaving raw data untouched",
      "Row-level quality flags and a READY / REVIEW / NOT READY status for every profile",
      "A weighted Data Readiness Score and an Excel dashboard with source-level analysis",
    ],
    findingsLabel: "Key findings",
    findings: [
      { value: "81.09", label: "Overall Data Readiness Score, rated GOOD" },
      {
        value: "19.76%",
        label: "of records flagged as invalid marketing activations (2,006)",
      },
      {
        value: "49.59%",
        label: "of profiles stale under a 365-day threshold (5,033)",
      },
    ],
    github: tree("01_Audience_Readiness"),
    repoLinks: [
      { label: "Project folder", href: tree("01_Audience_Readiness") },
      { label: "SQL scripts", href: tree("01_Audience_Readiness/sql") },
      { label: "Excel workbooks", href: tree("01_Audience_Readiness/excel") },
      { label: "README", href: blob("01_Audience_Readiness/README.md") },
    ],
    output: "A validated consumer table with row-level quality flags",
    screenshots: [
      {
        src: "/screenshots/01-excel-dashboard.png",
        width: 1533,
        height: 914,
        alt: "Excel dashboard showing overall readiness 81.09, 2,006 invalid activations, readiness by dimension, top data-quality issues and issues by source",
        caption: "Excel readiness dashboard",
      },
      {
        src: "/screenshots/01-sql-readiness-score.png",
        width: 1528,
        height: 939,
        alt: "SQL query computing the weighted Data Readiness Score in DB Browser for SQLite",
        caption: "SQL readiness score",
      },
    ],
    caseStudy: {
      problem:
        "Consumer data arrived from Website, CRM, Mobile App and Retail Partner systems. The goal was to find and flag the issues, standardise the data, and decide whether each profile was ready for marketing activation.",
      data: "10,150 synthetic records (10,000 unique consumers) with intentional problems: inconsistent country naming, duplicate identities, missing and malformed emails, inconsistent taxonomies, missing consent, activations without valid consent, consent conflicts, missing audience segments and stale profiles.",
      approach: [
        {
          title: "Profile and harmonise",
          body: "Inspected the raw data and standardised inconsistent values (Spain, ES, ESP) with SQL CASE logic. Raw data stays untouched; cleaned and validated versions are built separately.",
        },
        {
          title: "Check identity quality",
          body: "Compared total records with unique IDs: 150 extra duplicate records, 300 records belonging to duplicated identities. Also checked duplicate, missing and malformed emails, and consent conflicts across duplicates.",
        },
        {
          title: "Validate consent and activation",
          body: "Tested whether activated profiles had valid marketing consent, by source and by country, plus segment completeness and profile freshness.",
        },
        {
          title: "Build the validated table",
          body: "Added row-level flags, a quality_issue_count, and a READY / REVIEW / NOT READY status per profile.",
        },
        {
          title: "Score and communicate",
          body: "Weighted five dimensions into a Data Readiness Score, then built an Excel workbook with PivotTables, source analysis and a dashboard.",
        },
      ],
      table: {
        caption: "Consumer Data Readiness Score (weights are illustrative)",
        columns: ["Dimension", "Weight", "Score"],
        rows: [
          ["Completeness", "20%", "96.77"],
          ["Consent Compliance", "30%", "66.15"],
          ["Identity Quality", "20%", "97.04"],
          ["Taxonomy Quality", "15%", "99.46"],
          ["Freshness", "15%", "50.41"],
        ],
        total: ["Overall · GOOD", "100%", "81.09"],
      },
      insights: [
        "Structure was strong: taxonomy 99.46, identity 97.04, completeness 96.77.",
        "Freshness was the weakest dimension at 50.41: 5,033 records (49.59%) were stale under the 365-day activity threshold.",
        "Consent Compliance scored 66.15, with 2,006 records (about 19.76%) flagged as invalid marketing activations.",
        "Each source carried a different risk: Retail Partner had the most invalid activations (508), Mobile App the highest overall issue rate (84.08%), Website the most missing consent (114), and CRM the most consent conflicts (14).",
      ],
      recommendations: [
        "Prioritise invalid-activation remediation, starting with Retail Partner",
        "Strengthen consent validation before profiles reach activation platforms",
        "Set up freshness monitoring to refresh, suppress or exclude inactive profiles",
        "Investigate the Mobile App feed and validation logic",
        "Review CRM consent conflicts separately, given their privacy risk",
        "Automate the recurring checks",
      ],
      learned: [
        "Data readiness is more than deleting duplicates or filling gaps. It combines business rules, privacy controls, taxonomy standards, identity resolution and freshness.",
        "Conflicting identities can't be merged safely without explicit survivorship rules and a trusted-source hierarchy.",
        "Keeping raw, cleaned and validated data separate keeps every transformation traceable and reversible.",
      ],
      next: [
        "Automate the checks for invalid activation, missing consent, duplicates, consent conflicts, freshness and taxonomy, which became Project 02.",
      ],
    },
  },
  {
    slug: "data-quality-monitor",
    index: "02",
    stage: "Automation",
    title: "Automated Data Quality Monitor",
    stack: ["Python", "pandas"],
    tools: [
      "Python",
      "pandas",
      "Cursor",
      "CSV processing",
      "Rule-based monitoring",
      "Automated reporting",
    ],
    question:
      "Can the manual SQL checks become a reusable monitor that flags quality and activation risks every time new data arrives?",
    summary:
      "A Python and pandas monitor that validates, standardises and classifies every record, rates each metric against warning and critical thresholds, and writes five reports automatically.",
    built: [
      "Automated ingestion and nine quality checks, with row-level 1/0 issue flags",
      "OK / WARNING / CRITICAL severity per metric against configurable thresholds",
      "Five generated outputs: validated data, exceptions queue, quality summary, alerts and monitoring status",
    ],
    findingsLabel: "Key findings",
    findings: [
      {
        value: "2 of 9",
        label: "metrics CRITICAL: invalid activations and stale profiles",
      },
      { value: "3,145", label: "of 10,150 records classified READY" },
      {
        value: "1",
        label: "NULL-handling bug in the SQL consent rule, caught by cross-validation",
      },
    ],
    github: tree("02_Data_Quality_Automation"),
    repoLinks: [
      { label: "Project folder", href: tree("02_Data_Quality_Automation") },
      {
        label: "Monitor script",
        href: blob("02_Data_Quality_Automation/scripts/01_data_quality_monitor.py"),
      },
      {
        label: "Generated outputs",
        href: tree("02_Data_Quality_Automation/output"),
      },
      { label: "README", href: blob("02_Data_Quality_Automation/README.md") },
    ],
    output: "Validated data, an exceptions queue and severity alerts",
    screenshots: [
      {
        src: "/screenshots/02-automated-monitoring.png",
        width: 1534,
        height: 976,
        alt: "Terminal output of the Python monitor: data-quality report with record counts and an automated monitoring status of CRITICAL with per-metric severities",
        caption: "Automated monitoring report",
      },
    ],
    caseStudy: {
      problem:
        "Quality checks can't depend on someone manually inspecting every new file from Website, CRM, Mobile App and Retail Partner. The goal was to automate the Project 01 validation into a workflow that could support a data steward or marketing-data operations team.",
      data: "The same synthetic raw dataset: 10,150 records, 10,000 unique consumers and 14 original attributes, loaded and evaluated end to end with no manual filtering.",
      approach: [
        {
          title: "Ingest",
          body: "Load the raw consumer CSV with pandas.",
        },
        {
          title: "Validate and flag",
          body: "Check missing and malformed emails, duplicates, missing consent, invalid activation, missing segments, stale profiles, consent conflicts and taxonomy issues, as 1/0 flags per record.",
        },
        {
          title: "Standardise taxonomy",
          body: "Map variants (ES, ESP → Spain; skin-care → Skincare). Values that can't be mapped reliably become Unknown rather than being guessed.",
        },
        {
          title: "Classify readiness",
          body: "Assign READY, REVIEW or NOT READY from consent, conflicts, email quality, segmentation and freshness. Result: 3,145 / 3,539 / 3,466.",
        },
        {
          title: "Monitor severity",
          body: "A reusable function rates every metric OK, WARNING or CRITICAL against its thresholds. One critical metric makes the overall status CRITICAL.",
        },
        {
          title: "Write reports",
          body: "validated_data, exceptions_report, data_quality_summary, monitoring_alerts and monitoring_summary, generated on every run.",
        },
      ],
      table: {
        caption: "Monitoring results (thresholds are illustrative)",
        columns: ["Metric", "Rate", "Warn", "Critical", "Status"],
        rows: [
          ["Missing Email", "2.18%", "2.00%", "5.00%", "WARNING"],
          ["Malformed Email", "0.64%", "1.00%", "2.00%", "OK"],
          ["Duplicated-Flagged Records", "2.96%", "2.00%", "5.00%", "WARNING"],
          ["Missing Marketing Consent", "4.15%", "3.00%", "5.00%", "WARNING"],
          ["Invalid Marketing Activation", "19.76%", "2.00%", "5.00%", "CRITICAL"],
          ["Missing Audience Segment", "3.36%", "2.00%", "5.00%", "WARNING"],
          ["Stale Profiles", "49.59%", "10.00%", "20.00%", "CRITICAL"],
          ["Consent Conflicts", "0.18%", "0.10%", "0.50%", "WARNING"],
          ["Taxonomy Issues", "0.54%", "1.00%", "3.00%", "OK"],
        ],
        total: ["Overall monitoring status", "", "", "", "CRITICAL"],
      },
      note: {
        title: "Why CRITICAL here but GOOD in Project 01?",
        body: "They answer different questions. Project 01 is a weighted score across five dimensions. This monitor uses rule-based thresholds, where a single severe metric triggers an overall CRITICAL alert. The two results complement each other.",
      },
      insights: [
        "Invalid marketing activation ran at 19.76%, well past the 5% critical threshold.",
        "Stale profiles ran at 49.59%, far beyond the 20% critical threshold. Together these two drive the CRITICAL status.",
        "Cross-validating against SQL exposed a discrepancy. The original rule used marketing_consent <> 'YES', which silently skips NULLs. After treating NULL, blank and NO as invalid, both implementations returned 2,006 invalid activations.",
        "Rule-based monitoring was a deliberate choice: deterministic rules are explainable, auditable and easy for business owners to challenge.",
      ],
      learned: [
        "Automation doesn't remove the need for business judgement. Consent rules, severity thresholds and survivorship logic still need governed owners.",
        "Technically valid code can still produce the wrong business result, so test rules across implementations.",
      ],
      next: [
        "Source- and market-specific thresholds and privacy rules",
        "Historical trends, load-to-load comparison and statistical anomaly detection",
        "Email or Teams/Slack alerts, and scheduled runs",
        "Integration with Power BI dashboards",
      ],
    },
  },
  {
    slug: "media-activation-dashboard",
    index: "03",
    stage: "Activation & Monitoring",
    title: "Media Activation & Performance Dashboard",
    stack: ["Power BI", "DAX"],
    tools: [
      "Power BI",
      "DAX",
      "Star-schema modelling",
      "Slicers and filter context",
    ],
    question:
      "How are channels, markets and audiences performing, and is the data behind activation consented, classified and delivered on time?",
    summary:
      "A Power BI report that links campaign results to the quality of the data behind them, across Spain, France, Germany and the United Kingdom.",
    built: [
      "A star schema: one media-performance fact table with audience-taxonomy and campaign-metadata dimensions",
      "DAX measures for media KPIs (ROAS, CPA, CTR, conversion rate) and data-quality KPIs",
      "Four report pages, from executive overview to recommendations, with interactive slicers",
    ],
    findingsLabel: "At a glance",
    findings: [
      { value: "11", label: "core media measures in DAX" },
      { value: "8", label: "activation and data-quality measures" },
      { value: "4", label: "report pages on one shared model" },
    ],
    github: tree("03_Media_Dashboard"),
    repoLinks: [
      { label: "Project folder", href: tree("03_Media_Dashboard") },
      { label: "Power BI file", href: tree("03_Media_Dashboard/powerbi") },
      { label: "Datasets", href: tree("03_Media_Dashboard/data") },
      { label: "README", href: blob("03_Media_Dashboard/README.md") },
    ],
    output: "Media performance and data health, monitored in one report",
    screenshots: [
      {
        src: "/screenshots/03-executive_overview.png",
        width: 1308,
        height: 759,
        alt: "Power BI Executive Media Overview page with spend, revenue, ROAS, conversions, CTR and CPA cards and filters",
        caption: "Executive media overview",
      },
      {
        src: "/screenshots/03-audience_activation.png",
        width: 1310,
        height: 732,
        alt: "Power BI Audience & Activation page comparing audience segments with consent and taxonomy monitoring",
        caption: "Audience & activation",
      },
      {
        src: "/screenshots/03-data_quality_monitoring.png",
        width: 1321,
        height: 726,
        alt: "Power BI Data Quality & Monitoring page showing invalid consent, unmapped audiences, missing tags and delayed feeds",
        caption: "Data quality & monitoring",
      },
      {
        src: "/screenshots/03-executive_recommendations.png",
        width: 1311,
        height: 728,
        alt: "Power BI Executive Recommendations page",
        caption: "Executive recommendations",
      },
      {
        src: "/screenshots/03-interactive_filtering.png",
        width: 1316,
        height: 728,
        alt: "Power BI report filtered with slicers by country, channel, category and objective",
        caption: "Interactive filtering",
      },
    ],
    caseStudy: {
      problem:
        "Analyse campaign performance, and connect marketing results with the quality and readiness of the data used for activation. Four questions: how channels and markets perform, which audiences perform best, whether activation data is consented, classified and delivered, and which issues to prioritise.",
      data: "Three synthetic datasets: daily media performance (market, channel, campaign, audience, impressions, reach, clicks, spend, conversions, revenue, plus consent, taxonomy, tagging and feed status), an audience taxonomy, and campaign metadata.",
      approach: [
        {
          title: "Model a star schema",
          body: "media_performance as the fact table, related to audience_taxonomy on audience_id and campaign_metadata on campaign_id, so attributes filter metrics dynamically.",
        },
        {
          title: "Write the measures",
          body: "Spend, Revenue, Conversions, Impressions, Reach, Clicks, CTR, CPC, CPA, Conversion Rate and ROAS, plus consent validity, unmapped audiences, missing campaign tags, delayed feeds, Quality Issue Rate and Monitoring Status.",
        },
        {
          title: "Design four pages",
          body: "Executive Media Overview, Audience & Activation, Data Quality & Monitoring, and Executive Recommendations.",
        },
        {
          title: "Make it explorable",
          body: "Slicers by country, channel, product category, campaign objective and audience segment, with every measure recalculating in filter context.",
        },
      ],
      insights: [
        "Strong media performance alone is not enough. Data used for activation should also be consent-valid, consistently classified, properly tagged and available on time.",
        "Issue counts and issue rates together show where remediation should be prioritised.",
      ],
      recommendations: [
        "Address consent problems before activation",
        "Improve campaign tagging and audience taxonomy consistency",
        "Monitor data feeds and quality indicators continuously",
        "Automate quality controls and alerts where possible",
      ],
      learned: [
        "Hands-on practice with Power BI data modelling, star schemas, relationships, DAX measures, filter context, KPI design and slicers.",
        "Putting media performance and data quality in one report makes it visible when results rest on weak data.",
      ],
      next: [
        "Automated quality alerts",
        "Historical anomaly detection by market and channel",
        "Automated campaign-tag validation",
        "Integration with CRM/CDP activation workflows",
      ],
    },
  },
]

export const takeaways = [
  {
    title: "Data readiness is more than clean data.",
    body: "Records can be complete and well structured yet still unusable for activation without valid consent.",
  },
  {
    title: "Automation needs governance.",
    body: "Thresholds, consent rules and identity-survivorship logic must be agreed with Privacy, Data Governance and Marketing.",
  },
  {
    title: "Test business rules across implementations.",
    body: "Comparing SQL and Python outputs caught a logic error that technically valid code had hidden.",
  },
  {
    title: "Media performance depends on data quality.",
    body: "Strong ROAS means little if the underlying audiences are unconsented, unmapped or mistagged.",
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: i < projects.length - 1 ? projects[i + 1] : undefined,
  }
}
