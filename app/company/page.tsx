import PageHeader from '@/components/ui/PageHeader'
import AboutSection from '@/components/sections/AboutSection'
import { site } from '../../data/site'

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="O nama"
        title="Kontinuitet, preciznost i odgovornost od 1993."
        subtitle={`${site.company.name} razvija se kroz stabilne projekte i dugoročna partnerstva, uz fokus na preciznu realizaciju i tehničku pouzdanost.`}
      />
      <AboutSection />
    </>
  )
}
