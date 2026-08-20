import type { ToolDefinition } from '@/lib/types';

const tools: ToolDefinition[] = [
  {
    slug: 'funnel-drop-diagnostic',
    title: 'Funnel Drop Diagnostic Tool',
    description: 'Find where a funnel changed, separate volume loss from conversion loss, and identify the next diagnostic questions.',
    category: 'Growth Analytics',
    status: 'live',
    ctaLabel: 'Use free tool',
    searchIntentCopy: 'Built for founders, growth leads, and analysts diagnosing sudden funnel drops or weekly conversion shifts.',
    metaDescription: 'Diagnose funnel drops by comparing leads, conversion rates, revenue, and stage-level movement.',
    keywords: ['funnel drop diagnostic', 'conversion drop analysis', 'growth analytics tool'],
    inputType: 'Previous/current funnel metrics',
    estimatedTime: '5 minutes',
    eventName: 'tool_funnel_drop_diagnostic',
    seoTitle: 'Funnel Drop Diagnostic Tool',
    seoDescription: 'A practical diagnostic workflow for understanding where conversion, lead volume, or revenue changed.',
    relatedArticles: ['acquisition-funnel-diagnostics', 'activation-metrics-that-matter'],
    relatedCaseStudies: ['funnel-diagnostics-operating-model'],
    resultCapture: true
  },
  {
    slug: 'ab-test-readiness-checker',
    title: 'A/B Test Readiness Checker',
    description: 'Review whether an experiment has a clear hypothesis, valid metrics, tracking checks, and launch guardrails.',
    category: 'Experimentation',
    status: 'coming-soon',
    ctaLabel: 'View tool details',
    searchIntentCopy: 'Designed for teams that want to catch weak experiment plans before launch.',
    metaDescription: 'A coming-soon A/B test readiness checker for hypotheses, metrics, tracking, and guardrails.',
    keywords: ['ab test checklist', 'experiment readiness', 'ab testing QA'],
    inputType: 'Experiment brief',
    estimatedTime: '4 minutes',
    eventName: 'tool_ab_test_readiness_checker',
    seoTitle: 'A/B Test Readiness Checker',
    seoDescription: 'Check experiment plans for hypothesis quality, tracking readiness, and decision clarity.',
    relatedArticles: ['experimentation-framework-hypothesis-to-decision', 'ab-testing-pitfalls-operational'],
    relatedCaseStudies: ['experimentation-throughput-redesign'],
    resultCapture: true
  },
  {
    slug: 'dashboard-kpi-planner',
    title: 'Dashboard KPI Planner',
    description: 'Map a business question into primary metrics, guardrails, diagnostic cuts, and dashboard sections.',
    category: 'Decision Systems',
    status: 'coming-soon',
    ctaLabel: 'View tool details',
    searchIntentCopy: 'Planned for operators who want dashboards that trigger decisions instead of passive reporting.',
    metaDescription: 'A coming-soon KPI planner for better dashboards, metric layers, and decision reviews.',
    keywords: ['dashboard KPI planner', 'metric framework', 'decision dashboard'],
    inputType: 'Business goal',
    estimatedTime: '6 minutes',
    eventName: 'tool_dashboard_kpi_planner',
    seoTitle: 'Dashboard KPI Planner',
    seoDescription: 'Plan primary metrics, diagnostic views, and decision cadences for better dashboards.',
    relatedArticles: ['activation-metrics-that-matter', 'retention-diagnostics-scorecard'],
    relatedCaseStudies: ['funnel-diagnostics-operating-model'],
    resultCapture: true
  },
  {
    slug: 'cac-roas-calculator',
    title: 'CAC / ROAS Calculator',
    description: 'Estimate acquisition efficiency, payback pressure, and whether spend changes are driven by volume, conversion, or value.',
    category: 'Marketing Analytics',
    status: 'coming-soon',
    ctaLabel: 'View tool details',
    searchIntentCopy: 'Built for marketers and operators who need a cleaner read on paid growth economics.',
    metaDescription: 'A coming-soon CAC and ROAS calculator for acquisition efficiency, payback pressure, and budget decisions.',
    keywords: ['CAC calculator', 'ROAS calculator', 'paid marketing analytics'],
    inputType: 'Spend, leads, customers, revenue',
    estimatedTime: '5 minutes',
    eventName: 'tool_cac_roas_calculator',
    seoTitle: 'CAC / ROAS Calculator',
    seoDescription: 'Calculate CAC, ROAS, conversion efficiency, and payback pressure for paid growth decisions.',
    relatedArticles: ['attribution-in-imperfect-data', 'pricing-elasticity-experiments'],
    relatedCaseStudies: ['paid-marketing-attribution-system'],
    resultCapture: true
  },
  {
    slug: 'lead-scoring-template-generator',
    title: 'Lead Scoring Template Generator',
    description: 'Turn source, intent, urgency, fit, and behavior signals into a practical lead-scoring template.',
    category: 'AI Workflows',
    status: 'coming-soon',
    ctaLabel: 'View tool details',
    searchIntentCopy: 'Designed for growth and sales teams that need a sharper lead quality operating model.',
    metaDescription: 'A coming-soon lead scoring template generator for fit, intent, urgency, and follow-up priority.',
    keywords: ['lead scoring template', 'lead prioritization', 'sales analytics'],
    inputType: 'Lead sources and quality signals',
    estimatedTime: '7 minutes',
    eventName: 'tool_lead_scoring_template_generator',
    seoTitle: 'Lead Scoring Template Generator',
    seoDescription: 'Generate a practical lead scoring template from source, intent, fit, behavior, and urgency signals.',
    relatedArticles: ['acquisition-funnel-diagnostics', 'attribution-in-imperfect-data'],
    relatedCaseStudies: ['ai-powered-lead-prioritization-framework'],
    resultCapture: true
  },
  {
    slug: 'ai-use-case-prioritization-matrix',
    title: 'AI Use Case Prioritization Matrix',
    description: 'Score AI workflow ideas by business leverage, data readiness, risk, repeatability, and implementation effort.',
    category: 'AI Workflows',
    status: 'planned',
    ctaLabel: 'View tool details',
    searchIntentCopy: 'Planned for leaders deciding which AI workflows are worth building first.',
    metaDescription: 'A planned AI use case prioritization tool for ranking workflow ideas by leverage and readiness.',
    keywords: ['AI use case prioritization', 'LLM workflow prioritization', 'AI automation matrix'],
    inputType: 'Workflow candidates',
    estimatedTime: '8 minutes',
    eventName: 'tool_ai_use_case_prioritization',
    seoTitle: 'AI Use Case Prioritization Matrix',
    seoDescription: 'Prioritize AI workflow ideas using business impact, data readiness, risk, and effort.',
    relatedArticles: ['hello-world', 'attribution-in-imperfect-data'],
    relatedCaseStudies: ['document-intelligence-workflow', 'ai-sales-quality-audit-system'],
    resultCapture: true
  }
];

export function getAllTools(): ToolDefinition[] {
  return tools;
}

export function getToolBySlug(slug: string): ToolDefinition | null {
  return tools.find((tool) => tool.slug === slug) ?? null;
}

export function getLiveTools(): ToolDefinition[] {
  return tools.filter((tool) => tool.status === 'live');
}
