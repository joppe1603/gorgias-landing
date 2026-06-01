import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { render } from '@react-email/render'
import * as React from 'react'

interface WaitlistConfirmationProps {
  baseUrl?: string
  email?: string
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.mauyi.nl'

const steps = [
  {
    title: 'Sample testing loopt',
    desc: 'We testen de formule met een kleine groep. Resultaten volgen op week 2, 4 en 8.',
  },
  {
    title: 'Dermatoloog review',
    desc: 'Eindformule wordt onafhankelijk beoordeeld op veiligheid en werkzaamheid.',
  },
  {
    title: 'Eerste batch productie',
    desc: 'Jij ontvangt als eerste een persoonlijke uitnodiging — vóór de officiële lancering.',
  },
]

export default function WaitlistConfirmation({
  baseUrl = BASE,
  email = '',
}: WaitlistConfirmationProps) {
  const launchUrl = `${baseUrl}/launch`
  const privacyUrl = `${baseUrl}/privacy`
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`

  return (
    <Html lang="nl">
      <Head />
      <Preview>Je staat op de MAUYI wachtlijst — we laten je als eerste weten wanneer het er is.</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* ─── HEADER ─── */}
          <Section style={header}>
            <Text style={brandLabel}>MAUYI</Text>
            <Text style={headerSub}>Pre-launch · Wachtlijst</Text>
          </Section>

          {/* ─── MAIN BODY ─── */}
          <Section style={mainBody}>

            <Heading as="h1" style={headline}>
              Je staat op de lijst.
            </Heading>

            <Text style={intro}>
              Bedankt voor je aanmelding. Wanneer de eerste batch van het{' '}
              <strong style={{ color: '#1A1A1A', fontWeight: 600 }}>Reset Serum</strong>{' '}
              klaar is, ontvang je als eerste een persoonlijk bericht — vóór iedereen
              die later aanmeldt.
            </Text>

            <Text style={secondPara}>
              Geen hype, geen kortingen, geen dagelijkse mails. Alleen één eerlijk
              bericht op het moment dat het er is.
            </Text>

            <Hr style={divider} />

            {/* ─── STEPS ─── */}
            <Text style={stepsLabel}>Wat nu?</Text>

            {steps.map((step, i) => (
              <Section key={i} style={stepRow}>
                <div style={stepNumber}>{i + 1}</div>
                <div style={stepContent}>
                  <Text style={stepTitle}>{step.title}</Text>
                  <Text style={stepDesc}>{step.desc}</Text>
                </div>
              </Section>
            ))}

            <Hr style={divider} />

            {/* ─── CTA ─── */}
            <Section style={{ textAlign: 'center' as const, paddingTop: '8px' }}>
              <Button href={launchUrl} style={ctaButton}>
                Volg het proces →
              </Button>
            </Section>

          </Section>

          {/* ─── FOOTER ─── */}
          <Section style={footer}>
            <Text style={footerText}>
              Je ontvangt dit bericht omdat je je hebt aangemeld via mauyi.nl.
            </Text>
            <Text style={footerLinks}>
              <Link href={privacyUrl} style={goldLink}>Privacybeleid</Link>
              <span style={{ color: '#C8C4BF', margin: '0 8px' }}>·</span>
              <Link href={unsubscribeUrl} style={grayLink}>Uitschrijven</Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

export async function renderWaitlistEmail(baseUrl: string, email: string): Promise<string> {
  return await render(<WaitlistConfirmation baseUrl={baseUrl} email={email} />)
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  margin: 0,
  padding: 0,
  backgroundColor: '#F2EFE9',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
}

const container: React.CSSProperties = {
  maxWidth: '520px',
  margin: '0 auto',
  backgroundColor: '#FFFFFF',
  borderRadius: '20px',
  overflow: 'hidden',
  border: '1px solid #E4DFD9',
}

const header: React.CSSProperties = {
  backgroundColor: '#0F0E0C',
  padding: '36px 40px',
  textAlign: 'center',
}

const brandLabel: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: '22px',
  fontWeight: 600,
  letterSpacing: '0.2em',
  color: '#FFFFFF',
}

const headerSub: React.CSSProperties = {
  margin: 0,
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.24em',
  color: '#C9A96E',
}

const mainBody: React.CSSProperties = {
  padding: '44px 40px 40px',
}

const headline: React.CSSProperties = {
  margin: '0 0 20px',
  fontSize: '28px',
  fontWeight: 600,
  color: '#1A1A1A',
  fontFamily: "Georgia, 'Times New Roman', serif",
  lineHeight: 1.2,
}

const intro: React.CSSProperties = {
  margin: '0 0 16px',
  fontSize: '15px',
  color: '#5C5754',
  lineHeight: 1.75,
  fontWeight: 300,
}

const secondPara: React.CSSProperties = {
  margin: '0 0 32px',
  fontSize: '15px',
  color: '#5C5754',
  lineHeight: 1.75,
  fontWeight: 300,
  fontStyle: 'italic',
}

const divider: React.CSSProperties = {
  borderColor: '#EDE9E4',
  margin: '0 0 28px',
}

const stepsLabel: React.CSSProperties = {
  margin: '0 0 16px',
  fontSize: '10px',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: '#9A9590',
}

const stepRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid #F0EDE9',
}

const stepNumber: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#C9A96E',
  color: '#FFFFFF',
  fontSize: '11px',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const stepContent: React.CSSProperties = {
  flex: 1,
}

const stepTitle: React.CSSProperties = {
  margin: '0 0 3px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#1A1A1A',
}

const stepDesc: React.CSSProperties = {
  margin: 0,
  fontSize: '12px',
  color: '#9A9590',
  fontWeight: 300,
  lineHeight: 1.65,
}

const ctaButton: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#C9A96E',
  color: '#1A1A1A',
  fontWeight: 700,
  fontSize: '14px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  borderRadius: '14px',
  padding: '14px 32px',
}

const footer: React.CSSProperties = {
  padding: '24px 40px',
  textAlign: 'center',
  borderTop: '1px solid #F0EDE9',
  backgroundColor: '#FAFAF8',
}

const footerText: React.CSSProperties = {
  margin: '0 0 6px',
  fontSize: '11px',
  color: '#9A9590',
  fontWeight: 300,
  lineHeight: 1.5,
}

const footerLinks: React.CSSProperties = {
  margin: 0,
  fontSize: '11px',
}

const goldLink: React.CSSProperties = {
  color: '#C9A96E',
  textDecoration: 'none',
}

const grayLink: React.CSSProperties = {
  color: '#9A9590',
  textDecoration: 'none',
}
