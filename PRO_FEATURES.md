# NeatStamp Pro Features — Product Strategie

## Het probleem

Het huidige gratis tier geeft alles weg. Er is geen reden om te upgraden.
Een freelancer die 1 signature nodig heeft krijgt: 5 templates, custom kleuren,
foto, social links, Calendly, disclaimer — allemaal gratis. Conversie naar Pro
is daardoor minimaal.

---

## Pricing Tiers (nieuw)

### Free ($0 — geen account nodig)
Het doel: een bruikbare signature maken die "goed genoeg" is, maar
niet perfect. Genoeg om te delen (virality), niet genoeg om professioneel
in te zetten zonder upgrade.

**Wat je krijgt:**
- 2 templates (Minimal + Modern)
- Standaard kleurschema (blauw/grijs — niet aanpasbaar)
- Foto OF logo upload (1 afbeelding)
- Max 2 social media links
- Telefoon, email, website
- Outlook-proof HTML
- One-click copy
- "Made with NeatStamp" branding (niet verwijderbaar)
- Geen account nodig

**Wat je NIET krijgt:**
- Custom kleuren
- Calendly/booking link
- CTA banner
- Disclaimer
- Meer dan 2 social links
- Meer dan 1 signature
- Analytics
- Branding verwijderen

### Pro ($5/maand of $39/jaar)
Het doel: alles wat een professional nodig heeft. De "no-brainer"
upgrade voor iedereen die email serieus neemt.

**Alles in Free, plus:**
- Alle 8+ templates (incl. Elegant, Startup, Compact)
- Custom kleuren (primary + accent, hex picker)
- Calendly/booking link button
- CTA banner (upload afbeelding, link, scheduling)
- Legal disclaimer tekstveld
- Onbeperkt social media links
- Meerdere signatures (opslaan in account)
- "Made with NeatStamp" branding verwijderbaar
- Click analytics (hoeveel clicks op elke link)
- QR code in signature (linkt naar vCard of Calendly)
- Pronouns veld
- Adres veld
- Signatures opslaan in cloud (D1 database)

### Team ($3/user/maand, min 5 users)
Het doel: consistent email branding voor het hele bedrijf.

**Alles in Pro, plus:**
- Centraal beheer dashboard
- Brand guidelines afdwingen (kleuren, logo, template lock)
- Medewerkers uitnodigen
- Afdeling-specifieke signatures
- Bulk deploy
- Banner campaigns (schedule per week/maand, per afdeling)
- A/B testing banners
- Team analytics (wie gebruikt welke signature)
- Admin rollen

---

## Conversie-strategie

### Waarom iemand upgradet van Free naar Pro:

1. **Custom kleuren** — De #1 reden. Iedereen wil brand kleuren.
   In de editor zie je de kleurpicker, maar als je klikt: "Upgrade to Pro
   to customize colors." De signature werkt al, maar in standaard blauw.
   Dat is net genoeg frustratie om te converteren.

2. **Branding verwijderen** — "Made with NeatStamp" staat onder elke
   gratis signature. Het is subtiel (10px grijs), maar professionals
   willen het weg. Kost $5/mnd.

3. **Calendly link** — Freelancers en sales professionals willen een
   booking link. Die zien ze in de editor maar kunnen hem niet activeren
   zonder Pro.

4. **Meerdere signatures** — Wie eenmaal 1 signature heeft gemaakt,
   wil er vaak een tweede (persoonlijk, werk, side project). Free = max 1.

5. **Analytics** — "Hoeveel mensen klikken op mijn LinkedIn link?"
   Deze vraag komt vanzelf na een paar weken gebruik.

### De "Made with NeatStamp" branding strategie

**Kan iemand het weghalen uit de broncode?**

Ja, technisch kan dat. De signature is HTML die je kopieert en plakt.
Een developer kan de "Made with NeatStamp" regel verwijderen.

**Maar dat is OK. Hier is waarom:**

1. **95% van gebruikers zijn geen developers.** Ze kopieren, plakken, klaar.
   Ze gaan niet de HTML bewerken.

2. **Het is een nudge, geen lock.** Net als Calendly's "Powered by Calendly"
   of Mailchimp's "Sent with Mailchimp" — technisch verwijderbaar, maar
   de meeste mensen doen het niet.

3. **De echte waarde van Pro is niet "branding weg"** — het is custom
   kleuren + Calendly + analytics + meerdere signatures. Branding
   verwijderen is een bonus, niet de hoofdreden.

4. **Server-side enforcement is niet mogelijk** voor email signatures.
   De signature leeft in de email client van de gebruiker, niet op onze
   server. Dit is inherent aan het product — elke concurrent heeft dit.

5. **WiseStamp doet precies hetzelfde.** Hun gratis tier heeft branding,
   hun betaalde niet. Werkt al 16 jaar.

**Hoe we het wel slim aanpakken:**

- De branding link gaat naar neatstamp.com?ref=sig — elke klik is een
  nieuwe potentiele klant.
- De branding is klein en subtiel — niet storend genoeg om gebruikers
  weg te jagen, wel zichtbaar genoeg om virality te genereren.
- De branding zit IN de HTML die we genereren. Als iemand het weghalt
  en later zijn signature update via NeatStamp, komt het terug.

---

## Wat we moeten bouwen

### Fase 1: Gratis tier beperken (1-2 dagen)
- [ ] Template selector: lock 6 van 8 templates achter Pro badge
- [ ] Kleur picker: toon maar disable met "Pro" overlay
- [ ] Social links: max 2 op gratis, toon melding bij 3e
- [ ] Calendly veld: toon maar disable met Pro badge
- [ ] Disclaimer veld: toon maar disable met Pro badge
- [ ] CTA banner: toon maar disable met Pro badge
- [ ] "Made with NeatStamp" altijd toevoegen in generateSignature.ts
- [ ] Upgrade prompts in de editor ("Unlock custom colors — $5/mo")

### Fase 2: Pro features bouwen (3-5 dagen)
- [ ] Click analytics: redirect links via neatstamp.com/r/[id] tracker
- [ ] Banner campaigns: upload banner, set start/end date
- [ ] QR code generator: genereer QR code als SVG/PNG
- [ ] Signatures opslaan/laden via D1 API (al gebouwd)
- [ ] Plan check in editor: als user Pro is, unlock alles

### Fase 3: Team features (1-2 weken)
- [ ] Team dashboard
- [ ] Invite medewerkers
- [ ] Brand guidelines (lock kleuren/template)
- [ ] Afdeling management
- [ ] Banner scheduling per afdeling
- [ ] Team analytics

---

## Revenue projectie (bijgewerkt)

Met de nieuwe free/pro split:

| Maand | Gratis users | Conversie | Pro users | MRR |
|-------|-------------|-----------|-----------|-----|
| 1 | 1.000 | 5% | 50 | $250 |
| 3 | 5.000 | 5% | 250 | $1.250 |
| 6 | 15.000 | 5% | 750 | $3.750 |
| 12 | 50.000 | 5% | 2.500 | $12.500 |

5% conversie is realistisch als:
- Custom kleuren achter Pro zit (iedereen wil dit)
- De tool goed genoeg is dat mensen terugkomen
- "Made with NeatStamp" branding op elke gratis signature = virality

Vergelijk met MySignature: $700K/jaar = ~$58K/mnd.
Bij 5% conversie en 50K gratis users komen we op $12.5K/mnd.
Dat is in lijn met een solo-founder product in jaar 1.

---

## Concurrentie vs NeatStamp (bijgewerkt)

| Feature | WiseStamp ($9-179/mnd) | MySignature ($12/mnd) | NeatStamp Pro ($5/mnd) |
|---------|----------------------|---------------------|---------------------|
| Custom kleuren | Ja | Ja | Ja |
| Templates | 3-20+ | ~15 | 8+ |
| Calendly link | Ja | Nee | Ja |
| Banner campaigns | Ja ($49/mnd+) | Nee | Ja |
| Click analytics | Ja ($49/mnd+) | Nee | Ja |
| QR code | Nee | Nee | Ja |
| A/B testing | Ja ($49/mnd+) | Nee | Team plan |
| Directory sync | Ja ($19/mnd+) | Nee | Nee (later) |
| Auto-install | Ja | Nee | Nee (later) |
| Prijs | $9-179/mnd | $12/mnd | $5/mnd |
| Gratis tier | 14-dag trial | Nee | Ja (permanent) |

**Onze positie:** Goedkoper dan iedereen, met features die WiseStamp
pas vanaf $49/mnd biedt (banners, analytics). Plus een echte gratis tier
die de concurrentie niet heeft.
