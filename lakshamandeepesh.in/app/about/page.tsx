import Image from 'next/image';
import Link from 'next/link';

import { EventLink } from '@/components/analytics/event-link';
import { AuthorBadge } from '@/components/primitives/author-badge';
import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'About | Lakshmana Deepesh',
  description:
    'Background across data science leadership, photography, and product-minded web design with a practical execution style.',
  path: '/about/'
});

const craftAreas = [
  {
    title: 'Analytics and Decision Systems',
    image: '/img/portfolio/portfolio-01-thumbnail.jpg',
    description:
      'I build experimentation and measurement frameworks that help teams move from intuition-heavy calls to repeatable, evidence-backed decisions.'
  },
  {
    title: 'Photography and Storytelling',
    image: '/img/portfolio/portfolio-08-thumbnail.jpg',
    description:
      'Photography keeps my creative muscles active and sharpens how I frame problems, notice detail, and communicate ideas with clarity.'
  },
  {
    title: 'Product-minded Design',
    image: '/img/portfolio/portfolio-04-thumbnail.jpg',
    description:
      'I care deeply about interfaces that feel intentional, readable, and useful. Good design is trust, speed, and usability.'
  }
];

const timeline = [
  {
    period: 'Early years',
    title: 'Cross-functional analytics foundation',
    description:
      'Built practical analytics across marketing, operations, and sales while learning how decisions really get made inside teams.'
  },
  {
    period: 'Growth phase',
    title: 'Leadership and experimentation systems',
    description:
      'Led teams and introduced experimentation discipline, metric guardrails, and repeatable reporting patterns for faster execution.'
  },
  {
    period: 'Now',
    title: 'Editorial platform and product direction',
    description:
      'Evolving this website into an authority content engine and micro-SaaS launch base focused on growth analytics workflows.'
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          alt="Cinematic city lights photograph"
          className="h-[46vh] min-h-[360px] w-full object-cover"
          height={1200}
          priority
          src="/img/portfolio/portfolio-03-large.jpg"
          width={2200}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171c18]/75 via-[#1d241f]/55 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-6xl items-end px-4 pb-10 sm:px-6 sm:pb-12">
          <div className="max-w-2xl text-paper animate-reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f8d7b9]">About</p>
            <h1 className="mt-3 font-heading text-4xl leading-tight sm:text-6xl">Analyst’s rigor, creator’s lens</h1>
            <p className="mt-4 text-base leading-7 text-paper/85 sm:text-lg">
              I combine data science discipline with creative craft to build systems and experiences that people actually use.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="grid gap-8 rounded-2xl border border-border bg-white p-6 shadow-editorial lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            <div className="animate-reveal">
              <h2 className="font-heading text-4xl leading-tight text-ink sm:text-5xl">The core story</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                I am a data scientist with cross-functional experience across marketing, operations, sales, and business
                analytics. I have led teams, built decision systems, and translated complex data into clear strategic action.
              </p>
              <p className="mt-4 max-w-2xl leading-8 text-muted">
                This website is now publication-first, but it still carries the original DNA of my work: technical depth,
                practical outcomes, and creative storytelling through design and photography.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-border bg-tint px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink/80">
                  Experimentation Systems
                </span>
                <span className="rounded-full border border-border bg-tint px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink/80">
                  Growth Analytics
                </span>
                <span className="rounded-full border border-border bg-tint px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink/80">
                  Product Design Thinking
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 animate-reveal-delayed">
              <div className="col-span-2 overflow-hidden rounded-xl">
                <Image
                  alt="Night city photography by Lakshmana Deepesh"
                  className="h-52 w-full object-cover"
                  height={420}
                  src="/img/portfolio/portfolio-01-thumbnail.jpg"
                  width={760}
                />
              </div>
              <div className="overflow-hidden rounded-xl">
                <Image
                  alt="Landscape photography"
                  className="h-44 w-full object-cover"
                  height={300}
                  src="/img/portfolio/portfolio-06-thumbnail.jpg"
                  width={400}
                />
              </div>
              <div className="overflow-hidden rounded-xl">
                <Image
                  alt="Festival lighting architecture photography"
                  className="h-44 w-full object-cover"
                  height={300}
                  src="/img/portfolio/portfolio-08-thumbnail.jpg"
                  width={400}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {craftAreas.map((area, index) => (
              <article
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-editorial animate-reveal"
                key={area.title}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <Image alt={area.title} className="h-44 w-full object-cover" height={280} src={area.image} width={520} />
                <div className="space-y-3 p-5">
                  <h3 className="font-heading text-2xl text-ink">{area.title}</h3>
                  <p className="text-sm leading-7 text-muted">{area.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-editorial sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="font-heading text-3xl text-ink">Milestones</h2>
              <Link className="text-sm font-semibold text-accent hover:text-ink" href="/blog/">
                Read the full playbooks →
              </Link>
            </div>
            <div className="relative pl-6 sm:pl-8">
              <div className="absolute left-1.5 top-0 h-full w-px bg-border sm:left-2" />
              <div className="space-y-6">
                {timeline.map((item) => (
                  <article className="relative rounded-xl border border-border bg-paper p-5" key={item.title}>
                    <span className="absolute -left-[1.95rem] top-6 h-3 w-3 rounded-full bg-accent sm:-left-[2.45rem]" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">{item.period}</p>
                    <h3 className="mt-1 font-heading text-2xl text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 rounded-2xl border border-border bg-white p-6 shadow-editorial lg:grid-cols-[1fr_320px]">
            <div>
              <h2 className="font-heading text-3xl text-ink">How I collaborate</h2>
              <p className="mt-3 leading-8 text-muted">
                I work best with teams that value ownership, clarity, and iteration. My style combines structured analysis
                with product context so execution stays fast and defensible.
              </p>
              <p className="mt-3 leading-8 text-muted">
                If you are working on funnel conversion, pricing, attribution, or experimentation throughput, I focus on
                building systems that scale beyond one-off wins.
              </p>
              <div className="mt-6">
                <EventLink className="btn-primary" eventName="cta_click" eventParams={{ location: 'about', target: 'contact' }} href="/contact/">
                  Work with me
                </EventLink>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-tint p-5">
              <h3 className="font-heading text-2xl text-ink">Current focus</h3>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-muted">
                <li>Experiment design quality and guardrails</li>
                <li>Growth analytics operating systems</li>
                <li>SEO + content architecture for compounding traffic</li>
                <li>Micro-SaaS foundations for data-informed teams</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-editorial">
            <AuthorBadge
              author={{
                name: 'Lakshmana Deepesh Reddy',
                slug: 'deepesh-reddy',
                role: 'Data Scientist and Growth Analytics Leader',
                bio: 'Builds decision systems for growth and product teams.'
              }}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
