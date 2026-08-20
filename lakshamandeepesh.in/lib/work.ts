export type WorkCaseStudy = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  headlineResult: string;
  heroImage: string;
  duration: string;
  scope: string;
  confidentialityLabel: string;
  problem: string;
  challenge: string;
  impact: string[];
  approach: string[];
  outcomes: string[];
  stack: string[];
  tools: string[];
  relatedTools: string[];
  relatedArticles: string[];
  relatedPostSlug?: string;
};

const caseStudies: WorkCaseStudy[] = [
  {
    slug: 'funnel-diagnostics-operating-model',
    title: 'Growth Funnel Diagnostics System',
    category: 'Growth Analytics',
    tags: ['Funnel Analytics', 'Activation', 'Decision Cadence'],
    summary:
      'Built a weekly funnel diagnostics system that aligned acquisition, activation, and retention teams around one decision loop.',
    headlineResult: 'Improved activation conversion visibility and weekly prioritization quality.',
    heroImage: '/img/stock/topics-collaboration.jpg',
    duration: '16 weeks',
    scope: 'Growth Marketing, Product, Lifecycle',
    confidentialityLabel: 'Anonymized consumer growth funnel',
    problem:
      'Conversion discussions were stuck at aggregate metrics, making it hard to separate source quality, onboarding friction, and instrumentation issues.',
    challenge:
      'Teams disagreed on root causes because channel quality, onboarding friction, and instrumentation health were not evaluated in one shared framework.',
    impact: [
      'Faster weekly diagnosis across acquisition and activation stages.',
      'Clearer ownership of bottlenecks across marketing, product, and lifecycle teams.',
      'More predictable experimentation priorities from a shared signal board.'
    ],
    approach: [
      'Defined funnel decomposition by channel, audience, and onboarding stage.',
      'Created a signal board with conversion, guardrail, and data quality indicators.',
      'Prioritized experiments around the largest stage-wise drop-off points.',
      'Added retention-linked validation to prevent short-term conversion wins from damaging cohort quality.'
    ],
    outcomes: [
      'Weekly reviews moved from metric reporting to diagnostic action.',
      'Stakeholders aligned faster on which stage, source, or segment needed attention.',
      'Experiment backlog quality improved because opportunities were linked to observed funnel movement.'
    ],
    stack: ['SQL', 'Python', 'BI dashboards', 'Funnel instrumentation audits'],
    tools: ['SQL', 'Python', 'Tableau', 'Funnel instrumentation audits'],
    relatedTools: ['funnel-drop-diagnostic', 'dashboard-kpi-planner'],
    relatedArticles: ['acquisition-funnel-diagnostics', 'activation-metrics-that-matter'],
    relatedPostSlug: 'acquisition-funnel-diagnostics'
  },
  {
    slug: 'ai-powered-lead-prioritization-framework',
    title: 'AI-Powered Lead Prioritization Framework',
    category: 'AI Workflows',
    tags: ['Lead Scoring', 'AI Workflow', 'Sales Operations'],
    summary:
      'Designed a prioritization framework that helped a high-volume team focus follow-up effort on leads with stronger conversion signals.',
    headlineResult: 'Created a clearer operating model for lead quality, routing, and follow-up priority.',
    heroImage: '/img/stock/topics-roadmap.jpg',
    duration: '10 weeks',
    scope: 'Growth, Sales Operations, Analytics',
    confidentialityLabel: 'Anonymized multi-stage lead conversion system',
    problem:
      'A high-volume lead funnel needed a better way to distinguish urgency, fit, intent, and follow-up priority without overloading the team.',
    challenge:
      'Lead quality signals were fragmented across channels, lifecycle events, and CRM status updates, making prioritization inconsistent.',
    impact: [
      'More consistent lead triage logic across source, urgency, and behavioral signals.',
      'Reduced manual interpretation in daily sales and growth operating reviews.',
      'Created a foundation for future AI-assisted lead summaries and routing recommendations.'
    ],
    approach: [
      'Mapped the observable lead signals available before and after first contact.',
      'Defined scoring tiers with explainable reasons instead of opaque model output.',
      'Built QA checks for stale data, missing attributes, and source-mix shifts.',
      'Connected prioritization output to team review cadence and follow-up rules.'
    ],
    outcomes: [
      'Lead review moved from first-in-first-out logic to higher-signal prioritization.',
      'The team gained a repeatable language for quality, urgency, and next action.',
      'The framework reduced ambiguity before introducing heavier automation.'
    ],
    stack: ['SQL', 'Python', 'CRM exports', 'LLM workflow design'],
    tools: ['SQL', 'Python', 'CRM data models', 'Prompt evaluation checklists'],
    relatedTools: ['ai-use-case-prioritization-matrix'],
    relatedArticles: ['acquisition-funnel-diagnostics', 'attribution-in-imperfect-data']
  },
  {
    slug: 'paid-marketing-attribution-system',
    title: 'Paid Marketing Attribution System',
    category: 'Attribution',
    tags: ['Paid Marketing', 'Attribution', 'Source Mix'],
    summary:
      'Built a practical attribution layer that helped teams compare source quality, funnel progression, and business outcomes with imperfect data.',
    headlineResult: 'Improved paid marketing readouts by separating spend, volume, conversion quality, and downstream value.',
    heroImage: '/img/stock/work-hero.jpg',
    duration: '12 weeks',
    scope: 'Marketing Analytics, Growth, Finance',
    confidentialityLabel: 'Anonymized paid acquisition measurement system',
    problem:
      'Channel reporting over-weighted top-line volume and under-weighted conversion quality, lifecycle progression, and downstream economics.',
    challenge:
      'Attribution data was imperfect, with gaps across source tagging, offline conversion, and lifecycle milestones.',
    impact: [
      'Clearer paid channel reviews across volume, quality, and conversion stages.',
      'Better tradeoff conversations between acquisition cost and downstream outcomes.',
      'Reduced overreaction to noisy short-term channel movement.'
    ],
    approach: [
      'Defined a source-quality view combining spend, lead quality, conversion movement, and cohort behavior.',
      'Separated deterministic attribution from directional diagnostic signals.',
      'Added data quality flags for missing source, campaign, or lifecycle information.',
      'Created a recurring readout for budget, experiment, and landing-page decisions.'
    ],
    outcomes: [
      'Marketing reviews became more diagnostic and less dependent on single-source reports.',
      'Teams gained a practical way to reason under imperfect attribution conditions.',
      'Budget discussions were grounded in quality-adjusted funnel movement.'
    ],
    stack: ['SQL', 'Python', 'Ad platform exports', 'BI dashboards'],
    tools: ['SQL', 'Python', 'Attribution QA checklists', 'Dashboard templates'],
    relatedTools: ['dashboard-kpi-planner', 'funnel-drop-diagnostic'],
    relatedArticles: ['attribution-in-imperfect-data', 'acquisition-funnel-diagnostics'],
    relatedPostSlug: 'attribution-in-imperfect-data'
  },
  {
    slug: 'document-intelligence-workflow',
    title: 'Document Intelligence Workflow',
    category: 'AI Workflows',
    tags: ['Document AI', 'RAG', 'Automation'],
    summary:
      'Designed an AI-assisted workflow for extracting, reviewing, and summarizing structured insights from messy business documents.',
    headlineResult: 'Reduced manual review burden while keeping human verification in the decision loop.',
    heroImage: '/img/stock/topics-hero.jpg',
    duration: '8 weeks',
    scope: 'AI Workflow Design, Operations, Analytics',
    confidentialityLabel: 'Anonymized document intelligence workflow',
    problem:
      'Important operating information lived inside documents, notes, and unstructured records that were slow to review manually.',
    challenge:
      'The workflow needed speed without sacrificing traceability, review quality, or confidence in extracted facts.',
    impact: [
      'Created a repeatable document review flow with extraction, evidence, and human verification.',
      'Reduced time spent on low-value scanning and summarization.',
      'Established guardrails for what AI could suggest versus what humans must approve.'
    ],
    approach: [
      'Mapped document types, review tasks, and failure modes before selecting automation points.',
      'Designed extraction fields with confidence notes and source references.',
      'Built prompt and review templates for consistent summaries.',
      'Added human-in-the-loop checks for sensitive or ambiguous outputs.'
    ],
    outcomes: [
      'Reviewers could move faster without losing source traceability.',
      'The system created reusable patterns for additional document categories.',
      'AI output became a draft decision aid instead of an unverified final answer.'
    ],
    stack: ['LLM workflows', 'RAG design', 'Structured extraction', 'Review QA'],
    tools: ['Prompt libraries', 'Vector search patterns', 'Review checklists'],
    relatedTools: ['ai-use-case-prioritization-matrix'],
    relatedArticles: ['attribution-in-imperfect-data']
  },
  {
    slug: 'ai-sales-quality-audit-system',
    title: 'AI Sales Quality Audit System',
    category: 'AI Quality',
    tags: ['Sales Quality', 'Call Review', 'LLM Evaluation'],
    summary:
      'Built a quality audit framework for reviewing sales interactions, surfacing coaching themes, and protecting decision quality.',
    headlineResult: 'Turned scattered review notes into a structured quality signal for coaching and operating reviews.',
    heroImage: '/img/stock/contact-hero.jpg',
    duration: '9 weeks',
    scope: 'Sales Operations, AI Review, Analytics',
    confidentialityLabel: 'Anonymized sales quality review system',
    problem:
      'Manual sales quality reviews were inconsistent and difficult to summarize into operating themes across teams and time periods.',
    challenge:
      'The system needed to support coaching without exposing private details or treating AI classifications as unquestioned truth.',
    impact: [
      'Standardized quality dimensions for call and conversation review.',
      'Created coaching themes that could be reviewed without exposing sensitive raw content.',
      'Improved consistency in how sales quality signals were discussed.'
    ],
    approach: [
      'Defined a review rubric for clarity, next-step quality, objection handling, and compliance-sensitive signals.',
      'Designed AI-assisted summaries with required evidence snippets and uncertainty notes.',
      'Created aggregate reporting that emphasized patterns instead of individual blame.',
      'Added reviewer QA so the model output could be corrected and improved.'
    ],
    outcomes: [
      'Quality review became more structured and less dependent on anecdotal sampling.',
      'Managers gained a faster way to identify coaching themes.',
      'The workflow kept human judgment central for sensitive decisions.'
    ],
    stack: ['LLM evaluation', 'Rubric design', 'Conversation analytics', 'BI reporting'],
    tools: ['Prompt QA', 'Review rubrics', 'Analytics dashboards'],
    relatedTools: ['ai-use-case-prioritization-matrix', 'dashboard-kpi-planner'],
    relatedArticles: ['retention-diagnostics-scorecard']
  },
  {
    slug: 'experimentation-throughput-redesign',
    title: 'Experimentation Decision Framework',
    category: 'Experimentation',
    tags: ['Experiment Design', 'Guardrails', 'Decision Memos'],
    summary:
      'Built an experimentation operating model that reduced cycle-time while improving confidence in rollout decisions.',
    headlineResult: 'Reduced test cycle-time by 34% with better guardrail discipline.',
    heroImage: '/img/stock/topics-roadmap.jpg',
    duration: '14 weeks',
    scope: 'Growth, Product, and Analytics',
    confidentialityLabel: 'Anonymized experimentation operating model',
    problem:
      'The team wanted more experiments, but weak hypotheses and inconsistent readouts made it hard to convert tests into decisions.',
    challenge:
      'Hypotheses were vague, instrumentation checks were ad hoc, and post-test decisions were delayed by interpretation disputes.',
    impact: [
      'Lower average experiment cycle-time.',
      'Cleaner pre-launch instrumentation and guardrail discipline.',
      'Fewer ambiguous post-test outcomes and fewer low-value reruns.'
    ],
    approach: [
      'Introduced a standardized hypothesis and decision template for every test.',
      'Added pre-launch instrumentation QA gates to catch tracking regressions early.',
      'Defined metric hierarchy: primary metric, guardrails, and stop conditions.',
      'Established a weekly evidence review and one-page decision memo ritual.'
    ],
    outcomes: [
      '34% lower average experiment cycle-time.',
      'Higher decision velocity without sacrificing statistical rigor.',
      'Fewer ambiguous post-test outcomes and fewer reruns of low-value tests.'
    ],
    stack: ['Python', 'SQL', 'Experiment design templates', 'Decision memos'],
    tools: ['Python', 'SQL', 'Metabase', 'Experiment design templates'],
    relatedTools: ['ab-test-readiness-checker'],
    relatedArticles: ['experimentation-framework-hypothesis-to-decision', 'ab-testing-pitfalls-operational'],
    relatedPostSlug: 'experimentation-framework-hypothesis-to-decision'
  },
  {
    slug: 'pricing-analytics-decision-stack',
    title: 'Pricing Analytics Decision Stack',
    category: 'Pricing Analytics',
    tags: ['Pricing', 'Elasticity', 'Guardrails'],
    summary:
      'Designed a pricing analytics layer connecting elasticity signals, churn guardrails, and experiment outcomes.',
    headlineResult: 'De-risked pricing tests while preserving retention quality.',
    heroImage: '/img/stock/contact-hero.jpg',
    duration: '12 weeks',
    scope: 'Pricing, Product, Finance',
    confidentialityLabel: 'Anonymized pricing analytics system',
    problem:
      'Pricing decisions needed a clearer way to evaluate revenue upside against churn risk, support burden, and customer trust.',
    challenge:
      'Pricing tests were high-stakes and politically sensitive, with no shared model for interpreting upside and risk.',
    impact: [
      'Higher confidence in pricing rollout and no-rollout decisions.',
      'Faster alignment between growth, product, and finance.',
      'Reduced risk of short-term revenue lifts causing long-term retention damage.'
    ],
    approach: [
      'Built segment-level elasticity tracking for plan and audience cohorts.',
      'Defined mandatory guardrails for churn, support burden, and downgrade behavior.',
      'Standardized pricing test readouts with confidence intervals and segment variance.',
      'Connected decision outputs to finance and growth planning cycles.'
    ],
    outcomes: [
      'Higher confidence in pricing rollout/no-rollout decisions.',
      'Faster alignment between growth, product, and finance.',
      'Reduced risk of short-term revenue lifts causing long-term churn penalties.'
    ],
    stack: ['SQL', 'Python', 'Cohort modeling', 'BI dashboards'],
    tools: ['SQL', 'Python', 'Looker/BI dashboards', 'Cohort modeling'],
    relatedTools: ['ab-test-readiness-checker', 'dashboard-kpi-planner'],
    relatedArticles: ['pricing-elasticity-experiments', 'retention-diagnostics-scorecard'],
    relatedPostSlug: 'pricing-elasticity-experiments'
  }
];

export function getAllCaseStudies(): WorkCaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): WorkCaseStudy | null {
  return caseStudies.find((study) => study.slug === slug) ?? null;
}
