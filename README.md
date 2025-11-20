# Help Koen – Donaties & Acties

Deze eenvoudige statische site ondersteunt het inzamelen van geld voor de behandeling van Koen. Doneren gebeurt via een externe GoFundMe pagina; externe supporters kunnen hun eigen acties lokaal registreren (client-side). Voor centrale opslag kun je een Google Form embedden.

## Structuur
```
samen-voor-koen-tegen-kanker/
  README.md
  src/
    index.html
    components/donate-button.html
    scripts/actions.js
    scripts/donate.js
    styles/main.css
```

## Lokale Test
Open `src/index.html` rechtstreeks in je browser (dubbelklik) of gebruik een eenvoudige lokale webserver:
```powershell
# Vanuit de src map
pwsh -Command "python -m http.server 8080"  # Vereist Python
# Ga naar http://localhost:8080
```

## Centrale Opslag (Actief)
Externe acties worden nu centraal opgeslagen via Google Form → Google Sheet. De site haalt elke 5 minuten nieuwe acties op via CSV export. Moderatie gebeurt door rijen te verwijderen/bewerken in de Sheet.

## Hosting Idee
Upload de `src` inhoud naar:
- GitHub Pages
- Netlify (drag & drop)
- Vercel (nieuw project, static).

## Privacy / GDPR
Verzamel via dit formulier geen gevoelige persoonsgegevens. Voor e-mailadressen: zorg voor toestemming als je later mailt.

## Moderatie & Privacy
- **Moderatie**: Open de Google Sheet en verwijder/bewerk rijen met ongepaste inzendingen.
- **Privacy**: Maak duidelijk in je privacybeleid dat e-mailadressen publiek zichtbaar zijn (of haal email veld uit de weergave in `actions-remote.js`).
- **Spam**: Schakel in Google Form in: **Instellingen** → **Antwoorden** → **Eén antwoord per persoon beperken** (vereist Google login).

## Verdere Uitbreiding
- Embed Google Calendar voor visuele agenda.
- Transparantie sectie automatiseren met GoFundMe API of handmatig bijwerken.
- E-mail notificaties bij nieuwe acties via Google Apps Script trigger.
- Foto uploads toevoegen (Google Form ondersteunt bestandsuploads → automatisch naar Drive).

Veel succes!
