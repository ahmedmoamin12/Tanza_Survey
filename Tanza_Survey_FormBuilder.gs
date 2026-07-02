function createTanzaSurvey() {
  var form = FormApp.create('Tanza — Tenant Experience Survey')
    .setDescription("Thank you for helping us build Tanza's AI guide. Your answers train the assistant that recommends your venue to guests and helps them find, book, and enjoy it. Please answer as fully as you can — where something doesn't apply, just write \"N/A\". Questions marked [NEW] were added in this version.")
    .setCollectEmail(false)
    .setProgressBar(true);

  // SECTION 1: Venue Identity
  form.addPageBreakItem().setTitle('Section 1: Venue Identity');
  form.addTextItem().setTitle('What is the full official name of your venue?').setRequired(true);
  form.addTextItem().setTitle('Are there any alternative names, abbreviations, or nicknames that guests commonly use for your venue?');
  form.addParagraphTextItem().setTitle('In one sentence, describe what you offer to a guest who has never heard of you.').setRequired(true);
  form.addParagraphTextItem().setTitle('In 2–3 sentences, describe your experience in more detail for a guest who wants to know more before visiting.');
  form.addParagraphTextItem().setTitle('What are the 3 things that make your experience unique within Tanza?');
  form.addCheckboxItem().setTitle('What type of experience are you?').setChoiceValues(['Adventure', 'Sports', 'Edutainment', 'F&B', 'Wellness', 'Retail', 'Other']);
  form.addTextItem().setTitle('Which zone of Tanza are you located in?');
  form.addTextItem().setTitle('Which entrance gate is nearest to your venue?');
  form.addParagraphTextItem().setTitle('Where should guests park, and which parking area or drop-off point is closest to your venue? [NEW]');
  form.addParagraphTextItem().setTitle('What does your entrance or storefront look like — signage, colours, level/floor — so a guest knows they have arrived? [NEW]');
  form.addTextItem().setTitle('If you have a map pin or GPS coordinate for your entrance, please share it. [NEW]');
  form.addParagraphTextItem().setTitle('Who are the neighboring tenants closest to your location inside Tanza?');

  // SECTION 2: Target Audience & Guest Profile
  form.addPageBreakItem().setTitle('Section 2: Target Audience & Guest Profile');
  form.addCheckboxItem().setTitle('What age group do you primarily target?').setChoiceValues(['Under 6', '6+', '12+', '18+', 'Families', 'All ages']);
  form.addParagraphTextItem().setTitle('Are there any minimum or maximum age, height, or weight requirements for any of your experiences? If yes, specify per experience.');
  form.addParagraphTextItem().setTitle('Are there any medical conditions or physical limitations that would prevent a guest from participating safely? If yes, list them.');
  form.addTextItem().setTitle('What is the estimated average spend per guest in EGP?');

  // SECTION 3: Services & Offerings Catalog
  form.addPageBreakItem().setTitle('Section 3: Services & Offerings Catalog');
  form.addParagraphTextItem()
    .setTitle('List each distinct offering (one paragraph per offering)')
    .setHelpText('For EACH offering include: Offering name | Short description | Indoor/Outdoor/Shaded/AC (pauses in heat, rain, wind?) | Duration per session | Min-Max guests per session | Individuals/groups/both | Energy level (high-adrenaline/moderate/relaxed) | Adult price EGP | Child price EGP | Year-round or seasonal (which seasons?)')
    .setRequired(true);
  form.addParagraphTextItem().setTitle('Do you offer group or corporate packages? If yes, describe the package, minimum group size, and price.');
  form.addParagraphTextItem().setTitle('Do you offer group discounts? If yes, at what group size does the discount apply and what is the percentage?');
  form.addParagraphTextItem().setTitle('Do you offer any combo deals or joint packages with other Tanza tenants?');
  form.addParagraphTextItem().setTitle('Do prices change during peak seasons, weekends, or public holidays? If yes, describe the pricing tiers.');
  form.addParagraphTextItem().setTitle('Are there any experiences or services you plan to discontinue or change in the near future?');
  form.addParagraphTextItem().setTitle('What is included in each listed price, and what costs extra (add-ons, upgrades, equipment, photos)? [NEW]');
  form.addParagraphTextItem().setTitle('At what age does child pricing apply, and do you charge a spectator / non-participant price for someone who accompanies a guest but does not take part? [NEW]');
  form.addMultipleChoiceItem().setTitle('Are the prices you listed inclusive or exclusive of VAT? [NEW]').setChoiceValues(['Inclusive of VAT', 'Exclusive of VAT', 'Mixed / depends on item', 'Not sure']);
  form.addParagraphTextItem().setTitle('Which of your experiences pair naturally together, or with nearby venues — e.g., something guests typically do right before or after yours? [NEW]');
  form.addParagraphTextItem().setTitle('Do you offer memberships, season passes, or a loyalty / rewards scheme? If yes, describe it. [NEW]');
  form.addParagraphTextItem().setTitle('Can guests book your venue for a private event, birthday, or corporate group? If yes, give the capacity, how much notice you need, and whether catering is available. [NEW]');

  // SECTION 4: Booking & Sales
  form.addPageBreakItem().setTitle('Section 4: Booking & Sales');
  form.addMultipleChoiceItem().setTitle('Is entry to your experience included in a general Tanza admission ticket, or is it priced and sold separately by you? [NEW]').setChoiceValues(['Included in general Tanza admission', 'Priced and sold separately', 'Other']);
  form.addParagraphTextItem().setTitle('Is there any Tanza-wide wristband, day-pass, bundle, or membership that includes your experience? If so, how does your pricing relate to it? [NEW]');
  form.addMultipleChoiceItem().setTitle('Do you currently accept bookings online?').setChoiceValues(['Yes', 'No']);
  form.addTextItem().setTitle('If YES — what is the URL of your booking or checkout page?');
  form.addTextItem().setTitle('If YES — what booking platform or system do you use? (e.g., custom-built, Fareharbor, Bokun, WhatsApp, other)');
  form.addMultipleChoiceItem().setTitle('If YES — does your booking system have an API or webhook we can connect to?').setChoiceValues(['Yes', 'No', "Don't know"]);
  form.addTextItem().setTitle('If NO — how do guests currently book? (Walk-in only / Phone / WhatsApp / Other — specify)');
  form.addMultipleChoiceItem().setTitle('Can guests pay in advance online, or is payment only accepted on-site?').setChoiceValues(['Pay in advance online', 'Payment only accepted on-site', 'Both']);
  form.addCheckboxItem().setTitle('What payment methods do you accept on-site?').setChoiceValues(['Cash', 'Visa', 'Mastercard', 'Fawry', 'Instapay', 'Other']);
  form.addTextItem().setTitle('What currency do you accept? (EGP only, or others?)');
  form.addTextItem().setTitle('How far in advance can a guest book? (e.g., same-day, up to 7 days, up to 30 days)');
  form.addParagraphTextItem().setTitle('What happens when a session or time slot is fully booked? Do you have a waitlist, or do you direct guests to the next available slot?');
  form.addParagraphTextItem().setTitle('Is there any way for us to see your live availability or current wait time in real time, so the AI can tell a guest before they walk over? [NEW]').setHelpText('Specify: Yes — via [system] / No / Not sure');
  form.addTextItem().setTitle('Do you have a maximum number of bookings you accept per day?');
  form.addParagraphTextItem().setTitle('What is your cancellation policy?');
  form.addParagraphTextItem().setTitle('What is your refund policy?');
  form.addParagraphTextItem().setTitle('What is your policy for guests who arrive late to a pre-booked session?');

  // SECTION 5: Location & Operations
  form.addPageBreakItem().setTitle('Section 5: Location & Operations');
  form.addParagraphTextItem().setTitle('What are your operating hours? (List per day of the week)').setRequired(true);
  form.addParagraphTextItem().setTitle('Are your hours different on public holidays or during Ramadan? If yes, describe the adjusted schedule.');
  form.addTextItem().setTitle('What is the best access point or entrance for guests arriving from the main Tanza gate?');
  form.addTextItem().setTitle('What are your peak hours or peak days when guest traffic is highest?');
  form.addTextItem().setTitle('What is your maximum total capacity at any one time?');
  form.addParagraphTextItem().setTitle('How do you currently manage and communicate when you have reached full capacity?');
  form.addMultipleChoiceItem().setTitle('Is your venue accessible for guests using wheelchairs or mobility aids?').setChoiceValues(['Yes', 'No', 'Partially']);
  form.addMultipleChoiceItem().setTitle('Do you have a smoking area, or is smoking permitted in any part of your zone?').setChoiceValues(['Indoor', 'Outdoor', 'Not permitted']);
  form.addParagraphTextItem().setTitle('Do you have baby-changing facilities, a nursing area, or stroller parking near your venue? [NEW]');
  form.addParagraphTextItem().setTitle('In peak summer heat, do you have shaded or air-conditioned waiting or rest areas for guests? [NEW]');
  form.addParagraphTextItem().setTitle('How often is your experience closed for maintenance or technical issues, and how is that usually communicated to guests? [NEW]');

  // SECTION 6: Guest Preparation & Policies
  form.addPageBreakItem().setTitle('Section 6: Guest Preparation & Policies');
  form.addParagraphTextItem().setTitle('What should guests wear or bring before visiting your experience? (e.g., closed-toe shoes, sportswear, swimwear)');
  form.addParagraphTextItem().setTitle('Are there any specific dress code requirements or equipment guests must use? (e.g., helmets, wristbands, protective gear — specify what is provided vs. what the guest must bring)');
  form.addParagraphTextItem().setTitle('What items are NOT permitted inside your zone? (e.g., food, outside drinks, large bags, photography equipment)');
  form.addTextItem().setTitle('Do you have lockers or a storage area for guest belongings?');
  form.addParagraphTextItem().setTitle('Do you provide any equipment or gear for the experience? If yes, what is included and what costs extra?');
  form.addParagraphTextItem().setTitle('Is there a waiver or consent form guests must sign? If yes, can it be completed digitally before arrival?');
  form.addParagraphTextItem().setTitle('Which languages should the AI be able to serve your guests in (e.g., Arabic, English, Gulf Arabic, Russian)? And which of those languages do your on-ground staff speak? [NEW]');

  // SECTION 7: What the AI Should Know
  form.addPageBreakItem().setTitle('Section 7: What the AI Should Know (Critical for Accuracy)');
  form.addParagraphTextItem().setTitle('What are the 5 most common questions your staff gets asked by guests?').setHelpText("These become the core of the AI's FAQ layer for your venue").setRequired(true);
  form.addParagraphTextItem().setTitle('What is the single most common reason a guest leaves your experience disappointed?').setHelpText('This teaches the AI what not to over-promise or misrepresent');
  form.addParagraphTextItem().setTitle('What does your experience NOT include or offer that guests sometimes assume it does? [NEW]').setHelpText('So the AI does not accidentally over-promise.');
  form.addParagraphTextItem().setTitle('Is there any information about your venue that you do NOT want the AI to share, promote, or reference?');

  // SECTION 8: Media & Content Assets
  form.addPageBreakItem().setTitle('Section 8: Media & Content Assets');
  form.addTextItem().setTitle('Do you have a logo file you can share? (SVG or high-res PNG preferred — paste link)');
  form.addTextItem().setTitle('Do you have professional photos or videos of your experience that we can use? If yes, please share a link.');
  form.addTextItem().setTitle('Do you have a website? If yes, what is the URL?');
  form.addParagraphTextItem().setTitle('What are your social media handles? (Instagram, TikTok, Facebook — list each)');

  // SECTION 9: Contacts & Integration
  form.addPageBreakItem().setTitle('Section 9: Contacts & Integration');
  form.addParagraphTextItem().setTitle('Who is the primary contact for guest-facing information (the person who knows your services best)?').setHelpText('Name / Role / Phone / Email').setRequired(true);
  form.addParagraphTextItem().setTitle('Who should we contact when your pricing, hours, or services change so we can update the AI immediately?').setHelpText('Name / Role / Phone / WhatsApp');
  form.addParagraphTextItem().setTitle('Who is the on-ground contact the AI should escalate to when a guest has a problem it cannot resolve?').setHelpText('Name / Role / WhatsApp number — this is the human handoff point');
  form.addParagraphTextItem().setTitle('Does your booking or ticketing system have a technical contact we can speak to about integration?').setHelpText('Name / Role / Email');
  form.addParagraphTextItem().setTitle('How often do your prices, hours, or offerings typically change, and could you share a live feed, spreadsheet, or page we can pull updates from?');

  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Live form URL: ' + form.getPublishedUrl());
}
