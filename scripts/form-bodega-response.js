/**
 * Google Forms Response Handler - Bodega: Wijn & Tapas
 * 
 * Required OAuth Scopes (will be auto-detected):
 * - Forms: Read form responses
 * - Mail: Send emails
 * - URL Fetch: Download PDF attachments
 */

function getNaam(responses) {
  for (var i = 0; i < responses.length; i++) {
    var response = responses[i];
    var question = response.getItem().getTitle();
    if (question.includes("achternaam")) {
      return response.getResponse();
    }
  }
  return "daar";
}

function getAantalPersonen(responses) {
  for (var i = 0; i < responses.length; i++) {
    var response = responses[i];
    var question = response.getItem().getTitle();
    if (question.includes("glaasje drinken")) {
      var aantal = response.getResponse();
      if (aantal && aantal.trim() !== "") {
        return `<p><strong>Aantal personen:</strong> ${aantal}</p>`;
      }
    }
  }
  return "";
}

function getOpmerkingen(responses) {
  for (var i = 0; i < responses.length; i++) {
    var response = responses[i];
    var question = response.getItem().getTitle();
    var answer = response.getResponse();
    if (question.includes("Opmerkingen") && answer && answer.trim() !== "") {
      return `<p style="margin-top: 30px;"><strong>Uw opmerkingen:</strong></p><p style="margin-bottom: 30px; font-style: italic;">${answer}</p>`;
    }
  }
  return "";
}

function onFormSubmit(e) {
  try {
    var responses = e.response.getItemResponses();
    var email = e.response.getRespondentEmail();

    if (!email) {
      Logger.log("ERROR: No email address found");
      return;
    }

    var naam = getNaam(responses);
    var aantalPersonen = getAantalPersonen(responses);
    var opmerkingen = getOpmerkingen(responses);

    var htmlBody = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.8; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d4a5a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🍷 Bodega: Wijn & Tapas</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #2c3e50; margin-top: 0;">Beste ${naam},</h2>
            
            <p>Bedankt voor uw inschrijving voor onze <strong>Bodega: Wijn & Tapas</strong>! We kijken ernaar uit om samen een gezellige avond te beleven.</p>
            
            <div style="background: white; padding: 20px; border-left: 4px solid #e67e22; margin: 25px 0; border-radius: 5px;">
              <p style="margin: 8px 0;"><strong>📅 Datum:</strong> Vr 6 februari 2026</p>
              <p style="margin: 8px 0;"><strong>🕒 Tijd:</strong> 19:00 – 24:00</p>
              <p style="margin: 8px 0;"><strong>📍 Locatie:</strong> Speeltuin Dennenoord - Smallestraat 4, 2430 Laakdal</p>
              <p style="margin: 8px 0;"><strong>💸 Inkom:</strong> Geen inkomgeld</p>
            </div>
            
            ${aantalPersonen}
            
            <p style="background: #fff3e0; padding: 15px; border-radius: 5px; border-left: 4px solid #e67e22;">
              De toegang is zonder inkomgeld, maar uw inschrijving helpt ons om alles goed te organiseren.
            </p>
            
            ${opmerkingen}
            
            <p style="margin-top: 30px;">Heeft u wijzigingen of kunt u toch niet komen? Laat het ons weten via <a href="mailto:bodega@samenvoorkoen.be" style="color: #e67e22; text-decoration: none; font-weight: bold;">bodega@samenvoorkoen.be</a></p>
            
            <div style="background: #e8f5e9; padding: 20px; border-radius: 5px; margin-top: 30px; text-align: center;">
              <p style="margin: 0; color: #2c3e50; font-size: 16px;">💙 Samen zorgen we voor een warme avond in het teken van steun en verbondenheid.</p>
            </div>
            
            <p style="margin-top: 30px; font-size: 18px; color: #2c3e50; font-weight: bold;">Tot dan – we kijken ernaar uit om u te verwelkomen!</p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
              <p style="margin: 5px 0;">Met vriendelijke groet,</p>
              <p style="margin: 5px 0; font-weight: bold; color: #2c3e50;">Het team van SAMEN voor Koen TEGEN kanker</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: white; border-radius: 5px;">
              <p style="margin: 0; color: #666; font-size: 14px;">Meer info op <a href="https://samenvoorkoen.be" style="color: #e67e22; text-decoration: none;">samenvoorkoen.be</a></p>
            </div>
          </div>
        </body>
      </html>`;

    var plainBody = `Beste ${naam},

Bedankt voor uw inschrijving voor onze Bodega: Wijn & Tapas! We kijken ernaar uit om samen een gezellige avond te beleven.

📅 Datum: Vr 6 februari 2026
🕒 Tijd: 19:00 – 24:00
📍 Locatie: Dennenoord Laakdal
💸 Inkom: Gratis
🍷 Concept: Wijn & tapas

De toegang is zonder inkomgeld, maar uw inschrijving helpt ons om alles goed te organiseren.

Heeft u wijzigingen of kunt u toch niet komen? Laat het ons weten via bodega@samenvoorkoen.be.

💙 Samen zorgen we voor een warme avond in het teken van steun en verbondenheid.

Tot dan – we kijken ernaar uit om u te verwelkomen!

Met vriendelijke groet,
Het team van SAMEN voor Koen TEGEN kanker

Meer info: https://samenvoorkoen.be`;

    // Haal PDF van een publieke URL
    var pdfUrl = "https://twynantst.github.io/samenvoorkoen/assets/wijn/bedankbrief.pdf";
    var pdfBlob = null;

    try {
      var response = UrlFetchApp.fetch(pdfUrl);
      pdfBlob = response.getBlob().setName("bedankbrief.pdf");
    } catch (err) {
      Logger.log("ERROR fetching PDF: " + err.message);
    }

    // E-mail verzenden
    if (email) {
      var emailOptions = {
        to: email,
        cc: "bodega.inschrijvingen@samenvoorkoen.be",
        name: "SAMEN voor Koen TEGEN kanker",
        subject: "Bevestiging inschrijving Bodega: Wijn & Tapas - SAMEN voor Koen TEGEN kanker",
        htmlBody: htmlBody,
        body: plainBody
      };
      
      // Voeg attachment toe als het gelukt is
      if (pdfBlob) {
        emailOptions.attachments = [pdfBlob];
      }
      
      MailApp.sendEmail(emailOptions);
      Logger.log("Email sent successfully to: " + email);
    }
  } catch (err) {
    Logger.log("ERROR in onFormSubmit: " + err.message);
    Logger.log("Stack: " + err.stack);
    throw err;
  }
}
