import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { render } from '@react-email/render'
import * as React from 'react'

interface LaunchEmailProps {
  baseUrl?: string
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.mauyi.nl'

export default function LaunchEmail({ baseUrl = BASE }: LaunchEmailProps) {
  const shopUrl = `${baseUrl}/shop`
  const privacyUrl = `${baseUrl}/privacy`
  const unsubscribeUrl = `${baseUrl}/unsubscribe`

  return (
    <Html lang="nl">
      <Head />
      <Preview>Reset Serum is nu verkrijgbaar — jij was er als eerste bij.</Preview>
      <Body style={body}>
        <Container style={wrapper}>

          {/* ─── HEADER ─── */}
          <Section style={header}>
            <Text style={brandLabel}>MAUYI</Text>
            <Text style={headerSub}>Pre-launch · Eerste batch</Text>
          </Section>

          {/* ─── HERO IMAGE ─── */}
          <Section style={{ padding: '0' }}>
            <Img
              src={`${baseUrl}/reset-serum-new.jpg`}
              alt="MAUYI Reset Serum"
              width="560"
              style={heroImage}
            />
            <div style={heroOverlay} />
          </Section>

          {/* ─── MAIN BODY ─── */}
          <Section style={mainBody}>

            {/* Decorative line */}
            <Section style={{ textAlign: 'center' as const, marginBottom: '36px' }}>
              <div style={goldLine} />
            </Section>

            <Heading as="h1" style={headline}>
              Het is zover.
            </Heading>

            <Text style={intro}>
              Je stond op de wachtlijst — en nu is het moment.{' '}
              <strong style={{ color: '#FAF8F5', fontWeight: 600 }}>Reset Serum is klaar.</strong>{' '}
              De eerste batch is beperkt. Jij hebt nu exclusieve toegang, nog vóór de officiële
              lancering.
            </Text>

            {/* ─── PRODUCT BOX ─── */}
            <Section style={productBox}>
              <Text style={productEyebrow}>Reset Serum · 30 ml</Text>
              <Text style={productTitle}>Jouw dagelijkse reset, in één flesje.</Text>

              {/* Ingredient chips */}
              <Row style={{ marginBottom: '20px' }}>
                {[
                  ['Bakuchiol', '1%'],
                  ['Niacinamide', '10%'],
                  ['Ceramiden', '+ HA'],
                ].map(([name, amount]) => (
                  <Column key={name} style={{ paddingRight: '8px' }}>
                    <div style={chip}>
                      <Text style={chipName}>{name}</Text>
                      <Text style={chipAmount}>{amount}</Text>
                    </div>
                  </Column>
                ))}
              </Row>

              <Text style={productDesc}>
                Geformuleerd voor zichtbaar resultaat in 4 weken. Geschikt voor dagelijks
                gebruik — ook bij gevoelige huid. Zonder parfum, alcohol of agressieve
                actieve stoffen.
              </Text>
            </Section>

            {/* ─── CTA ─── */}
            <Section style={{ textAlign: 'center' as const, marginBottom: '12px' }}>
              <Button href={shopUrl} style={ctaButton}>
                Bestel nu →
              </Button>
            </Section>

            <Text style={urgency}>
              Beperkte eerste batch — op is op
            </Text>

            <Hr style={divider} />

            <Text style={smallNote}>
              Vragen? Stuur een bericht naar{' '}
              <Link href="mailto:hello@mauyi.nl" style={goldLink}>hello@mauyi.nl</Link>
            </Text>

          </Section>

          {/* ─── FOOTER ─── */}
          <Section style={footer}>
            <Text style={footerBrand}>MAUYI Skincare · mauyi.nl</Text>
            <Text style={footerLinks}>
              <Link href={privacyUrl} style={footerLink}>Privacybeleid</Link>
              <span style={{ color: 'rgba(250,248,245,0.2)', margin: '0 8px' }}>·</span>
              <Link href={unsubscribeUrl} style={footerLink}>Afmelden</Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

export async function renderLaunchEmail(baseUrl: string): Promise<string> {
  return await render(<LaunchEmail baseUrl={baseUrl} />)
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  margin: 0,
  padding: 0,
  backgroundColor: '#0D0C0A',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
}

const wrapper: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: '#0F0E0C',
  borderRadius: '20px',
  overflow: 'hidden',
  border: '1px solid rgba(201,169,110,0.18)',
}

const header: React.CSSProperties = {
  padding: '40px 40px 36px',
  textAlign: 'center',
  borderBottom: '1px solid rgba(201,169,110,0.12)',
}

const brandLabel: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: '13px',
  fontWeight: 800,
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: '#C9A96E',
}

const headerSub: React.CSSProperties = {
  margin: 0,
  fontSize: '11px',
  color: 'rgba(250,248,245,0.35)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 400,
}

const heroImage: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  display: 'block',
  objectFit: 'cover',
  maxHeight: '320px',
}

const heroOverlay: React.CSSProperties = {
  height: '2px',
  background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.6), transparent)',
}

const mainBody: React.CSSProperties = {
  padding: '44px 40px 40px',
}

const goldLine: React.CSSProperties = {
  height: '1px',
  background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)',
  width: '100%',
}

const headline: React.CSSProperties = {
  margin: '0 0 20px',
  fontSize: '36px',
  fontWeight: 600,
  color: '#FAF8F5',
  fontFamily: "Georgia, 'Times New Roman', serif",
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
}

const intro: React.CSSProperties = {
  margin: '0 0 32px',
  fontSize: '15px',
  color: 'rgba(250,248,245,0.6)',
  lineHeight: 1.75,
  fontWeight: 300,
}

const productBox: React.CSSProperties = {
  backgroundColor: 'rgba(201,169,110,0.05)',
  border: '1px solid rgba(201,169,110,0.18)',
  borderRadius: '14px',
  padding: '28px',
  marginBottom: '32px',
}

const productEyebrow: React.CSSProperties = {
  margin: '0 0 6px',
  fontSize: '10px',
  fontWeight: 800,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: '#C9A96E',
}

const productTitle: React.CSSProperties = {
  margin: '0 0 20px',
  fontSize: '18px',
  fontWeight: 600,
  color: '#FAF8F5',
  fontFamily: "Georgia, 'Times New Roman', serif",
  lineHeight: 1.3,
}

const chip: React.CSSProperties = {
  backgroundColor: 'rgba(201,169,110,0.08)',
  border: '1px solid rgba(201,169,110,0.25)',
  borderRadius: '8px',
  padding: '8px 10px',
  textAlign: 'center',
}

const chipName: React.CSSProperties = {
  margin: '0 0 2px',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#C9A96E',
}

const chipAmount: React.CSSProperties = {
  margin: 0,
  fontSize: '13px',
  fontWeight: 500,
  color: 'rgba(250,248,245,0.7)',
}

const productDesc: React.CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: 'rgba(250,248,245,0.45)',
  lineHeight: 1.75,
  fontWeight: 300,
}

const ctaButton: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#C9A96E',
  backgroundImage: 'linear-gradient(135deg, #C9A96E 0%, #e0bb84 50%, #C9A96E 100%)',
  color: '#0F0E0C',
  fontWeight: 700,
  fontSize: '15px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  borderRadius: '14px',
  padding: '16px 44px',
}

const urgency: React.CSSProperties = {
  margin: '12px 0 32px',
  fontSize: '11px',
  color: 'rgba(250,248,245,0.3)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  textAlign: 'center',
  fontWeight: 500,
}

const divider: React.CSSProperties = {
  borderColor: 'rgba(250,248,245,0.08)',
  margin: '0 0 24px',
}

const smallNote: React.CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: 'rgba(250,248,245,0.3)',
  lineHeight: 1.6,
}

const goldLink: React.CSSProperties = {
  color: '#C9A96E',
  textDecoration: 'none',
}

const footer: React.CSSProperties = {
  padding: '24px 40px',
  textAlign: 'center',
  borderTop: '1px solid rgba(201,169,110,0.12)',
}

const footerBrand: React.CSSProperties = {
  margin: '0 0 6px',
  fontSize: '11px',
  color: 'rgba(250,248,245,0.2)',
  letterSpacing: '0.06em',
}

const footerLinks: React.CSSProperties = {
  margin: 0,
  fontSize: '11px',
}

const footerLink: React.CSSProperties = {
  color: 'rgba(250,248,245,0.25)',
  textDecoration: 'none',
}
