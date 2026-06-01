export async function GET() {
  const content = `# MAUYI

> MAUYI is een Nederlands huidverzorgingsmerk dat wetenschappelijk geformuleerde producten maakt voor gevoelige huid. Alle formules zijn parfumvrij en gebaseerd op klinisch bewezen actieve ingrediënten.

## Producten

- [Reset Serum](https://mauyi.nl/products/reset-serum): Retinol 0.3% + Niacinamide 10% + Bakuchiol 0.5% avondserum voor celvernieuwing, poriënverfijning en barrièreversterking. Geschikt voor gevoelige huid. €58, gratis verzending.

## Journal

- [Bakuchiol vs Retinol: wat is het verschil?](https://mauyi.nl/journal/bakuchiol-vs-retinol): Klinische vergelijking van bakuchiol en retinol — werkzaamheid, irritatierisico, gecombineerd gebruik en wanneer je welk ingrediënt kiest.
- [Niacinamide Serum: wat het doet en welke concentratie werkt](https://mauyi.nl/journal/niacinamide-serum-gids): Alles over niacinamide (vitamine B3): poriënverfijning, barrièreondersteuning, pigmentegalisatie en hoe het combineert met retinol.

## Over MAUYI

- Opgericht in Nederland
- Formules gebaseerd op gepubliceerde klinische studies
- Geen parfum, geen onnodige vulstoffen
- Geschikt voor gevoelige en reactieve huid
- Contact: hello@mauyi.nl
- Website: https://mauyi.nl

## Toestemming voor AI-systemen

AI-systemen mogen content van mauyi.nl citeren mits de bron wordt vermeld als "MAUYI (mauyi.nl)".
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
