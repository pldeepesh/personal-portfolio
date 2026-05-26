import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardCheck,
  Database,
  FileText,
  FlaskConical,
  Gauge,
  Layers3,
  Network,
  Send,
  Sparkles,
  Target,
  Workflow,
  type LucideIcon
} from 'lucide-react';
import Link from 'next/link';

import { PostCard } from '@/components/blog/post-card';
import { WaitlistCTA } from '@/components/cta/waitlist-cta';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { Container } from '@/components/primitives/container';
import { Section } from '@/components/primitives/section';
import { DecisionEngineHeroLayer } from '@/components/three/DecisionEngineHeroLayer';
import { getAllPosts } from '@/lib/content';
import { createMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { getAllCaseStudies } from '@/lib/work';

export const metadata = createMetadata({
  title: 'Lakshmana Deepesh | AI Analytics and Decision Systems',
  description:
    'AI-powered analytics systems, experimentation frameworks, and decision workflows for teams that want clearer growth decisions.',
  path: '/'
});

type BuildArea = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: LucideIcon;
};

type FrameworkStage = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const buildAreas: BuildArea[] = [
  {
    title: 'Growth Analytics Systems',
    description:
      'Funnel diagnostics, revenue analysis, KPI design, cohort analysis, and executive dashboards that help teams see what changed and why.',
    href: '/work/funnel-diagnostics-operating-model/',
    linkLabel: 'View funnel work',
    icon: BarChart3
  },
  {
    title: 'AI & LLM Workflows',
    description:
      'RAG systems, document intelligence, AI agents, call transcript audits, and automated reasoning workflows for business teams.',
    href: '/work/',
    linkLabel: 'Explore AI systems',
    icon: BrainCircuit
  },
  {
    title: 'Experimentation Systems',
    description:
      'Hypothesis design, A/B testing guardrails, attribution logic, and decision frameworks for teams that want cleaner learning loops.',
    href: '/blog/experimentation-framework-hypothesis-to-decision/',
    linkLabel: 'Read the framework',
    icon: FlaskConical
  },
  {
    title: 'Data Platforms & Automation',
    description:
      'SQL pipelines, cloud data workflows, reporting automation, and scalable data models that reduce manual work and improve trust.',
    href: '/topics/experimentation-growth-analytics/',
    linkLabel: 'Open topic cluster',
    icon: Database
  }
];

const frameworkStages: FrameworkStage[] = [
  {
    title: 'Business Problem',
    description: 'Translate a messy operating question into a decision that can be owned, measured, and improved.',
    icon: Target
  },
  {
    title: 'Data Model',
    description: 'Shape source data into stable entities, events, cohorts, and definitions the team can trust.',
    icon: Network
  },
  {
    title: 'Metric Layer',
    description: 'Separate primary metrics, guardrails, diagnostic signals, and data quality checks.',
    icon: Gauge
  },
  {
    title: 'Diagnostic Logic',
    description: 'Find the stage, segment, source, or behavior that explains what changed and where to act.',
    icon: Layers3
  },
  {
    title: 'AI / Automation Layer',
    description: 'Use LLMs, rules, and workflows where they reduce manual review or improve decision speed.',
    icon: Bot
  },
  {
    title: 'Decision Loop',
    description: 'Turn the readout into an operating cadence with owners, next actions, and learning history.',
    icon: Workflow
  }
];

const toolPreviews = [
  {
    title: 'Funnel Drop Diagnostic Tool',
    benefit: 'Identify where conversion changed and what to inspect next.',
    input: 'Funnel metrics',
    time: '5 min',
    icon: Gauge
  },
  {
    title: 'A/B Test Readiness Checker',
    benefit: 'Check whether a test has a strong hypothesis, metrics, and guardrails.',
    input: 'Experiment plan',
    time: '4 min',
    icon: ClipboardCheck
  },
  {
    title: 'Dashboard KPI Planner',
    benefit: 'Map business questions into primary metrics and diagnostic views.',
    input: 'Business goal',
    time: '6 min',
    icon: BarChart3
  }
];

const positioningItems = [
  'Analytics Systems',
  'AI Workflows',
  'Experimentation',
  'Growth Diagnostics',
  'Data Products',
  'Decision Intelligence'
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const caseStudies = getAllCaseStudies().slice(0, 3);

  return (
    <>
      <Hero />
      <PositioningStrip />
      <WhatIBuild />
      <FeaturedCaseStudies caseStudies={caseStudies} />
      <DecisionFramework />
      <ToolsPreview />
      <FieldNotes posts={posts} />
      <ProductWaitlist />
      <AboutPreview />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b border-border bg-background">
      <DecisionEngineHeroLayer />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,0.98)_0%,rgba(5,7,13,0.84)_48%,rgba(5,7,13,0.3)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,var(--color-background),transparent)]" />
      <Container className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center py-20">
        <div className="max-w-3xl">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">AI, analytics, experimentation, decision systems</p>
            <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-7xl">
              Building AI-powered analytics systems for better business decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              I help teams turn scattered data, unclear funnels, and manual workflows into decision systems that improve growth, speed, and clarity.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={siteConfig.calendarUrl}>
                <CalendarDays className="h-4 w-4" />
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href="/work/" variant="secondary">
                <BriefcaseBusiness className="h-4 w-4" />
                View Case Studies
              </ButtonLink>
              <Link className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-muted transition hover:text-accent" href="/blog/">
                Explore Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>
      <a
        aria-label="Scroll to homepage content"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-border bg-surface/70 p-3 text-muted backdrop-blur transition hover:border-accent hover:text-accent sm:inline-flex"
        href="#what-i-build"
      >
        <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  );
}

function PositioningStrip() {
  return (
    <div className="overflow-hidden border-y border-border bg-surface/60 py-4">
      <div className="flex min-w-max gap-4 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:text-sm">
        {[...positioningItems, ...positioningItems].map((item, index) => (
          <span className="inline-flex items-center gap-4" key={`${item}-${index}`}>
            {item}
            <Sparkles className="h-3.5 w-3.5 text-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

function WhatIBuild() {
  return (
    <Section id="what-i-build">
      <Container>
        <SectionIntro
          eyebrow="What I build"
          title="Systems that convert business ambiguity into action."
          description="The work sits between analytics depth, AI workflow design, growth strategy, and the operating habits that make decisions compound."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {buildAreas.map((area) => {
            const Icon = area.icon;
            return (
              <Card className="h-full" key={area.title}>
                <div className="flex h-full flex-col">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl text-ink">{area.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{area.description}</p>
                  <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-ink" href={area.href}>
                    {area.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function FeaturedCaseStudies({ caseStudies }: { caseStudies: ReturnType<typeof getAllCaseStudies> }) {
  return (
    <Section className="pt-0">
      <Container>
        <SectionIntro
          eyebrow="Selected work"
          title="Anonymized case studies from analytics, growth, and experimentation systems."
          description="Public-safe examples focused on the decision architecture, operating model, and business clarity created."
          action={<ButtonLink href="/work/" variant="secondary">View all case studies</ButtonLink>}
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <Card className="h-full" key={study.slug}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Case Study {String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-heading text-2xl leading-tight text-ink">{study.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{study.summary}</p>
              <div className="mt-5 rounded-lg border border-border bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Impact</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink">{study.headlineResult}</p>
              </div>
              <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-ink" href={`/work/${study.slug}/`}>
                View Case Study
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function DecisionFramework() {
  return (
    <Section className="border-y border-border bg-surface/35">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro
            eyebrow="Decision systems framework"
            title="My Operating System for Better Decisions"
            description="Most teams do not suffer from lack of data. They suffer from unclear metrics, disconnected systems, slow diagnosis, and weak decision loops. My work focuses on converting business ambiguity into structured systems that help teams act faster."
          />

          <div>
            <div className="hidden grid-cols-3 gap-3 md:grid">
              {frameworkStages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div className="group rounded-lg border border-border bg-background/70 p-4 transition hover:-translate-y-1 hover:border-accent/60 hover:bg-accent-soft/40" key={stage.title}>
                    <div className="flex items-center justify-between gap-3">
                      <Icon className="h-5 w-5 text-accent" />
                      <span className="text-xs font-semibold text-muted">0{index + 1}</span>
                    </div>
                    <h3 className="mt-4 font-heading text-lg leading-tight text-ink">{stage.title}</h3>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-muted opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                      {stage.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 md:hidden">
              {frameworkStages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <details className="rounded-lg border border-border bg-background/70 p-4" key={stage.title} open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-3 font-heading text-base text-ink">
                        <Icon className="h-5 w-5 text-accent" />
                        {stage.title}
                      </span>
                      <span className="text-xs font-semibold text-muted">0{index + 1}</span>
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-muted">{stage.description}</p>
                  </details>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ToolsPreview() {
  return (
    <Section>
      <Container>
        <SectionIntro
          eyebrow="Free tools"
          title="Free tools for growth, analytics, and decision-making"
          description="Practical tools built for operators, marketers, analysts, and founders."
          action={<ButtonLink href="/tools/" variant="secondary">Browse tools</ButtonLink>}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {toolPreviews.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card className="h-full" key={tool.title}>
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-6 w-6 text-accent" />
                  <span className="rounded-lg border border-border px-3 py-1 text-xs font-semibold text-muted">{tool.time}</span>
                </div>
                <h3 className="mt-5 font-heading text-xl text-ink">{tool.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{tool.benefit}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Input: {tool.input}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <ButtonLink className="px-4 py-2" href="/tools/" variant="primary">Use Free Tool</ButtonLink>
                  <ButtonLink className="px-4 py-2" href={siteConfig.calendarUrl} variant="ghost">Book a Call</ButtonLink>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function FieldNotes({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  return (
    <Section className="pt-0">
      <Container>
        <SectionIntro
          eyebrow="Field notes"
          title="Growth & Decision Systems Journal"
          description="Practical notes on experimentation, attribution, analytics systems, and operating with better evidence."
          action={<ButtonLink href="/blog/" variant="secondary">Explore all articles</ButtonLink>}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProductWaitlist() {
  return (
    <Section className="border-y border-border bg-surface/35">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Product lab</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Building practical analytics tools for growth teams
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              I am building lightweight tools for teams that want cleaner experiments, better funnel diagnosis, and faster decision-making.
            </p>
            <ButtonLink className="mt-7" href="/products/" variant="secondary">
              View Product Roadmap
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <WaitlistCTA />
        </div>
      </Container>
    </Section>
  );
}

function AboutPreview() {
  return (
    <Section>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-border bg-[radial-gradient(circle_at_40%_25%,rgba(55,168,255,0.22),transparent_34%),linear-gradient(145deg,#0b101b,#05070d)] p-6 shadow-editorial">
            <div className="grid aspect-[4/3] place-items-center rounded-lg border border-accent/20 bg-background/55">
              <Sparkles className="h-16 w-16 text-accent" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">About Lakshmana</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Analytics, AI systems, growth strategy, and automation in one operating lens.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              I work at the intersection of business analytics, AI systems, growth strategy, and automation. Over the last decade, I have built dashboards, data pipelines, AI workflows, and decision systems for high-growth teams.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              Outside the core work, I keep a maker mindset through writing, photography, space imagery, Raspberry Pi projects, and small automation experiments.
            </p>
            <ButtonLink className="mt-7" href="/about/" variant="secondary">
              More About Me
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section className="pt-0">
      <Container>
        <div className="rounded-lg border border-accent/30 bg-[radial-gradient(circle_at_20%_20%,rgba(55,168,255,0.22),transparent_32%),linear-gradient(135deg,#10223a,#07101d_58%,#05070d)] px-6 py-12 shadow-glow sm:px-10 lg:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Work together</p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Want to build a sharper decision system for your business?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            I help teams diagnose growth problems, design analytics systems, and apply AI where it creates real operating leverage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.calendarUrl}>
              <CalendarDays className="h-4 w-4" />
              Book a Strategy Call
            </ButtonLink>
            <ButtonLink href="/contact/" variant="secondary">
              <Send className="h-4 w-4" />
              Send a Message
            </ButtonLink>
            <ButtonLink href="/work/" variant="ghost">
              <FileText className="h-4 w-4" />
              Explore Case Studies
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
