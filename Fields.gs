/**
 * Single source of truth for the survey schema, shared by the backend
 * (Code.gs, for sheet columns) and referenced by Index.html's JS (SECTIONS).
 * type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'file' | 'voice'
 */
var FIELD_ORDER = [
  // Section 1: Venue Identity
  { key: 's1_name', label: 'Full official venue name', type: 'text' },
  { key: 's1_aka', label: 'Alternative names / nicknames', type: 'text' },
  { key: 's1_pitch', label: 'One-sentence pitch', type: 'textarea' },
  { key: 's1_desc', label: 'Detailed description (2-3 sentences)', type: 'textarea' },
  { key: 's1_unique', label: '3 things that make you unique', type: 'textarea' },
  { key: 's1_type', label: 'Experience type', type: 'checkbox' },
  { key: 's1_zone', label: 'Zone in Tanza', type: 'text' },
  { key: 's1_gate', label: 'Nearest entrance gate', type: 'text' },
  { key: 's1_parking', label: 'Parking / drop-off', type: 'textarea' },
  { key: 's1_storefront', label: 'Entrance / storefront description', type: 'textarea' },
  { key: 's1_geo', label: 'Map pin / GPS coordinate', type: 'text' },
  { key: 's1_neighbors', label: 'Neighboring tenants', type: 'textarea' },
  { key: 's1_attachment', label: 'Attachment (Venue Identity)', type: 'file' },

  // Section 2: Target Audience & Guest Profile
  { key: 's2_age', label: 'Primary target age group', type: 'checkbox' },
  { key: 's2_requirements', label: 'Age / height / weight requirements', type: 'textarea' },
  { key: 's2_medical', label: 'Medical / physical limitations', type: 'textarea' },
  { key: 's2_spend', label: 'Estimated average spend per guest (EGP)', type: 'text' },
  { key: 's2_attachment', label: 'Attachment (Target Audience & Guest Profile)', type: 'file' },

  // Section 3: Services & Offerings Catalog
  { key: 's3_offerings', label: 'Offerings catalog', type: 'textarea' },
  { key: 's3_group_packages', label: 'Group / corporate packages', type: 'textarea' },
  { key: 's3_group_discounts', label: 'Group discounts', type: 'textarea' },
  { key: 's3_combos', label: 'Combo deals / joint packages', type: 'textarea' },
  { key: 's3_peak_pricing', label: 'Peak / seasonal pricing', type: 'textarea' },
  { key: 's3_discontinuing', label: 'Experiences being discontinued/changed', type: 'textarea' },
  { key: 's3_price_includes', label: 'What price includes vs. extra costs', type: 'textarea' },
  { key: 's3_child_age', label: 'Child pricing age / spectator price', type: 'textarea' },
  { key: 's3_vat', label: 'VAT inclusive or exclusive', type: 'radio' },
  { key: 's3_pairings', label: 'Natural pairings with other experiences', type: 'textarea' },
  { key: 's3_membership', label: 'Memberships / season passes / loyalty', type: 'textarea' },
  { key: 's3_private_events', label: 'Private events / birthdays / corporate', type: 'textarea' },
  { key: 's3_attachment', label: 'Attachment (Services & Offerings Catalog)', type: 'file' },

  // Section 4: Booking & Sales
  { key: 's4_admission', label: 'Included in general admission or separate', type: 'radio' },
  { key: 's4_wristband', label: 'Tanza-wide wristband/pass relationship', type: 'textarea' },
  { key: 's4_online_booking', label: 'Accepts online bookings', type: 'radio' },
  { key: 's4_booking_url', label: 'Booking / checkout page URL', type: 'text' },
  { key: 's4_booking_platform', label: 'Booking platform/system used', type: 'text' },
  { key: 's4_api', label: 'Booking system has API/webhook', type: 'radio' },
  { key: 's4_no_booking_flow', label: 'How guests book if not online', type: 'text' },
  { key: 's4_payment_timing', label: 'Pay in advance vs on-site', type: 'radio' },
  { key: 's4_payment_methods', label: 'Payment methods accepted on-site', type: 'checkbox' },
  { key: 's4_currency', label: 'Currency accepted', type: 'text' },
  { key: 's4_advance_window', label: 'How far in advance guests can book', type: 'text' },
  { key: 's4_full_slot', label: 'What happens when fully booked', type: 'textarea' },
  { key: 's4_live_availability', label: 'Live availability / wait-time feed', type: 'textarea' },
  { key: 's4_daily_max', label: 'Max bookings accepted per day', type: 'text' },
  { key: 's4_cancellation', label: 'Cancellation policy', type: 'textarea' },
  { key: 's4_refund', label: 'Refund policy', type: 'textarea' },
  { key: 's4_late_arrival', label: 'Late arrival policy', type: 'textarea' },
  { key: 's4_attachment', label: 'Attachment (Booking & Sales)', type: 'file' },

  // Section 5: Location & Operations
  { key: 's5_hours', label: 'Operating hours per day', type: 'textarea' },
  { key: 's5_holiday_hours', label: 'Holiday / Ramadan hours', type: 'textarea' },
  { key: 's5_access_point', label: 'Best access point from main gate', type: 'text' },
  { key: 's5_peak_hours', label: 'Peak hours/days', type: 'text' },
  { key: 's5_capacity', label: 'Maximum total capacity', type: 'text' },
  { key: 's5_capacity_mgmt', label: 'How full-capacity is managed/communicated', type: 'textarea' },
  { key: 's5_accessibility', label: 'Wheelchair / mobility accessibility', type: 'radio' },
  { key: 's5_smoking', label: 'Smoking area policy', type: 'radio' },
  { key: 's5_baby', label: 'Baby-changing / nursing / stroller parking', type: 'textarea' },
  { key: 's5_shade_ac', label: 'Shaded / AC rest areas in summer', type: 'textarea' },
  { key: 's5_maintenance', label: 'Maintenance closures & communication', type: 'textarea' },
  { key: 's5_attachment', label: 'Attachment (Location & Operations)', type: 'file' },

  // Section 6: Guest Preparation & Policies
  { key: 's6_wear', label: 'What guests should wear/bring', type: 'textarea' },
  { key: 's6_dresscode', label: 'Dress code / required equipment', type: 'textarea' },
  { key: 's6_notpermitted', label: 'Items not permitted', type: 'textarea' },
  { key: 's6_lockers', label: 'Lockers / storage', type: 'text' },
  { key: 's6_equipment', label: 'Equipment/gear provided', type: 'textarea' },
  { key: 's6_waiver', label: 'Waiver / consent form', type: 'textarea' },
  { key: 's6_languages', label: 'Languages AI + staff should speak', type: 'textarea' },
  { key: 's6_attachment', label: 'Attachment (Guest Preparation & Policies)', type: 'file' },

  // Section 7: What the AI Should Know
  { key: 's7_faq', label: 'Top 5 most common guest questions', type: 'voice' },
  { key: 's7_disappoint', label: 'Most common reason guests are disappointed', type: 'voice' },
  { key: 's7_not_included', label: "What's assumed but not included", type: 'textarea' },
  { key: 's7_donotshare', label: 'Info the AI should NOT share', type: 'textarea' },
  { key: 's7_attachment', label: 'Attachment (What the AI Should Know)', type: 'file' },

  // Section 8: Media & Content Assets
  { key: 's8_logo', label: 'Logo file', type: 'file' },
  { key: 's8_photos', label: 'Photos / videos', type: 'file' },
  { key: 's8_pricelist', label: 'Price list / menu / brochure (PDF)', type: 'file' },
  { key: 's8_website', label: 'Website URL', type: 'text' },
  { key: 's8_social', label: 'Social media handles', type: 'textarea' },
  { key: 's8_attachment', label: 'Attachment (other media)', type: 'file' },

  // Section 9: Contacts & Integration
  { key: 's9_primary_contact', label: 'Primary guest-info contact', type: 'textarea' },
  { key: 's9_update_contact', label: 'Contact for pricing/hours changes', type: 'textarea' },
  { key: 's9_escalation_contact', label: 'On-ground escalation contact', type: 'textarea' },
  { key: 's9_tech_contact', label: 'Booking system technical contact', type: 'textarea' },
  { key: 's9_update_feed', label: 'How often things change / live feed source', type: 'textarea' },
  { key: 's9_attachment', label: 'Attachment (Contacts & Integration)', type: 'file' }
];
