// schema.org for Lakeshore. MedicalClinic with medicalSpecialty,
// availableService and opening hours, plus FAQPage on the questions page.
//
// What is deliberately NOT here: no aggregateRating, no review markup, and no
// `relevantSpecialty` naming conditions on the services. A fictional clinic
// must not publish a rating, and a real one should not put outcome claims in
// structured data any more than it puts them in prose — search engines render
// this as fact.
import { breadcrumbs, localBusiness, type JsonLd } from './shared';
import { business, faq, hours, services } from '../../data/demos/clinic-practitioner';

export { breadcrumbs as demoBreadcrumbs };

export function medicalClinic(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'MedicalClinic',
    business,
    homePath,
    image,
    hours: hours
      .filter((day) => !day.closed)
      .map((day) => ({ schemaDay: day.schemaDay, open: day.open, close: day.close })),
    extra: {
      medicalSpecialty: ['Chiropractic', 'PhysicalTherapy'],
      areaServed: { '@type': 'City', name: 'Toronto' },
      isAcceptingNewPatients: true,
      currenciesAccepted: 'CAD',
      // Name and description only — what happens in the appointment, which is
      // exactly what the visible copy says.
      availableService: services.map((service) => ({
        '@type': 'MedicalProcedure',
        name: service.name,
        description: service.description,
        ...(service.minutes ? { duration: `PT${service.minutes}M` } : {}),
      })),
    },
  });
}

/** FAQPage, generated from the same CMS-modelled answers reception edits, so
 *  a wording change required by the College updates both at once. */
export function faqSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
