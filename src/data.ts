export interface TourPackage {
  id: string;
  title: string;
  category: 'umrah' | 'hajj' | 'international' | 'domestic';
  duration: string;
  price: string;
  imageAlt: string;
  imageUrl: string;
  features: string[];
  itinerary: string[];
}

export interface VisaRequirement {
  country: string;
  visaType: string;
  processingTime: string;
  priceEstimate: string;
  documents: string[];
  requirementsInfo: string;
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'umrah-economy',
    title: 'Naseeb Global Economy Umrah Package',
    category: 'umrah',
    duration: '15 Days',
    price: 'PKR 185,000',
    imageAlt: 'Umrah Holy Mosque',
    imageUrl: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=800&q=80',
    features: [
      'Eco Hotel in Makkah (900m with shuttle service)',
      'Close Hotel in Madinah (500m walking)',
      'Complete luxury transport by air-conditioned coach',
      'Umrah Visa process and assistance',
      'Ziyarat in Makkah and Madinah with local guide'
    ],
    itinerary: [
      'Day 1: Arrival at Jeddah airport, transport to Makkah hotel, perform Umrah.',
      'Day 2-7: Daily prayers in Makkah, Ziyarat of historical sites (Jabal al-Nour, Muzdalifah, Mina).',
      'Day 8: Travel to Madinah via Haramain bullet train or service coach.',
      'Day 9-14: Daily prayers at Masjid-an-Nabawi, Ziyarats of Uhud, Masjid Quba, Qiblatayn.',
      'Day 15: Return journey and flight from Jeddah/Madinah airport.'
    ]
  },
  {
    id: 'umrah-premium',
    title: 'Umrah Deluxe 5-Star Premium',
    category: 'umrah',
    duration: '10 Days',
    price: 'PKR 320,000',
    imageAlt: 'Luxury Haram view',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    features: [
      '5-Star Makkah Hotel (Haram Front, e.g., Swissotel/Pulman Zamzam)',
      '5-Star Madinah Hotel (Front row, e.g., Oberoi/Al-Haram)',
      'VIP private luxury SUV transport',
      'Fast-track Visa process',
      'Guided individualized tour guide and premium kit'
    ],
    itinerary: [
      'Day 1: VIP reception at Jeddah, private chauffeur to Makkah, perform custom Umrah.',
      'Day 2-5: Five-star stay, VIP guided Ziyarats on demand.',
      'Day 6: Bullet train business class transfer to Madinah.',
      'Day 7-9: VIP experiences at Nabawi Mosque, private guide.',
      'Day 10: Private transfer to airport for departure.'
    ]
  },
  {
    id: 'hajj-executive',
    title: 'Executive Hajj Package (Shifting)',
    category: 'hajj',
    duration: '21 Days',
    price: 'PKR 1,550,000',
    imageAlt: 'Holy Kaaba',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8b186ef?auto=format&fit=crop&w=800&q=80',
    features: [
      'Premium Maktab Category-A near Jamarat in Mina',
      'Sofa beds, air-conditioned tents in Arafat',
      'Three-time premium buffet meals by expert chefs',
      'Religious lectures by renowned scholars throughout',
      'Exclusive private bus transit'
    ],
    itinerary: [
      'Phase 1: Arrival in Azizia medical apartments prior to Hajj days.',
      'Phase 2: Transition to Mina tents (8th Dhul Hijjah) and initiation of Hajj rituals.',
      'Phase 3: Day of Arafat worship (9th Dhul Hijjah) and overnight in Muzdalifah.',
      'Phase 4: Jamarat pelting (10th-12th Dhul Hijjah) and Tawaf-e-Ziyarah.',
      'Phase 5: Shifting to luxury apartments and travel to Madinah Al-Munawwarah for final visits.'
    ]
  },
  {
    id: 'dubai-desert',
    title: 'Dubai Oasis Getaway',
    category: 'international',
    duration: '5 Days / 4 Nights',
    price: 'PKR 245,000',
    imageAlt: 'Dubai Marina Skylines',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    features: [
      '4-Star hotel stay with breakfast',
      'Desert Safari with VIP BBQ dinner and Tanoura Dance',
      'Half-day guided city sightseeing & Marina Dhow Cruise',
      'Burj Khalifa entrance ticket (124th Floor)',
      'Return flights and entry tourist visa included'
    ],
    itinerary: [
      'Day 1: Arrival at Dubai DXB terminal, limousine transfer to hotel, Marina Cruise in evening.',
      'Day 2: Morning Dubai City Tour, afternoon high- Dunes Desert Safari with BBQ.',
      'Day 3: Visit to Dubai Mall, Underwater Aquarium, and Burj Khalifa observation floor.',
      'Day 4: Open day for luxury shopping or optional Aquaventure water park excursion.',
      'Day 5: Airport drop-off & departure flight.'
    ]
  },
  {
    id: 'turkey-grandeur',
    title: 'Grand Turkey & Cappadocia Explorer',
    category: 'international',
    duration: '8 Days',
    price: 'PKR 490,000',
    imageAlt: 'Turkey Hot Air Balloons',
    imageUrl: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80',
    features: [
      'Stay in boutique cave hotels in Cappadocia & 4-Star Istanbul hotels',
      'Classic Cappadocia hot air balloon flight reservation assistance',
      'Bosphorus Cruise tour with traditional show',
      'Guided historic tour of Blue Mosque, Hagia Sophia, & Topkapi Palace',
      'All internal flights, breakfast, and premium guide'
    ],
    itinerary: [
      'Day 1: Arrival in historic Istanbul, check-in, leisure walking around Sultanahmet.',
      'Day 2: Grand Istanbul tour visiting Blue Mosque, Hagia Sophia & Grand Bazaar.',
      'Day 3: Domestic flight to Cappadocia, authentic Turkish cave suite check-in.',
      'Day 4: Early sunrise Hot Air Balloon ride, followed by Red Valley tour.',
      'Day 5: Underground cities explore & Pottery workshop experiences.',
      'Day 6: Chauffeur flight back to Istanbul, late sunset Bosphorus Yacht Cruise.',
      'Day 7: Local cultural discovery or shopping day in Taksim square.',
      'Day 8: Farewell breakfast and airport departure.'
    ]
  },
  {
    id: 'malaysia-paradise',
    title: 'Malaysia & Singapore Twin Wonder',
    category: 'international',
    duration: '7 Days',
    price: 'PKR 310,000',
    imageAlt: 'Petrona Twin Towers',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a523?auto=format&fit=crop&w=800&q=80',
    features: [
      '3 Nights in Kuala Lumpur & 3 Nights in Singapore',
      'Luxury air-conditioned Coach transit between cities',
      'Kuala Lumpur City check Tour & Genting Highlands cable car ride',
      'Singapore Sentosa Island tour and Universal Studios entry ticket',
      'Double Entry Visas & Breakfast buffet daily'
    ],
    itinerary: [
      'Day 1: Arrival KLIA, luxury hotel check-in, Petronas photo-op.',
      'Day 2: Genting Highlands trip & Batu Caves sightseeing.',
      'Day 3: Coach travel to Singapore, check-in at core city hotel.',
      'Day 4: High exciting adventure at Universal Studios Singapore.',
      'Day 5: Sentosa Island premium explore including Cable Cars.',
      'Day 6: Singapore Civic District tour including Merlion Park.',
      'Day 7: Direct travel back and return flight.'
    ]
  }
];

export const VISA_DIRECTORY: VisaRequirement[] = [
  {
    country: 'Saudi Arabia',
    visaType: 'Electronic Tourist / Umrah Visa',
    processingTime: '24-48 Hours',
    priceEstimate: 'SAR 450 (approx PKR 34,000)',
    documents: [
      'Valid Passport with at least 6 months validity',
      'Recent White Background photograph (cropped 2x2)',
      'Valid CNIC copy',
      'Confirmed return return flight itinerary'
    ],
    requirementsInfo: 'Perfect option for tourists wanting standalone Umrah or sightseeing events.'
  },
  {
    country: 'United Arab Emirates (UAE)',
    visaType: '30 Days Single Entry Tourist Visa',
    processingTime: '3-4 Working Days',
    priceEstimate: 'PKR 38,000',
    documents: [
      'Passport main page scanned copy',
      'Passport size photo with clear details',
      'CNIC front and back scan copy',
      'For minors: B-Form birth certificate is mandatory'
    ],
    requirementsInfo: 'Quick approval rates. Ideal for short vacation and shopping trips.'
  },
  {
    country: 'Turkey',
    visaType: 'Single Entry Tourist Sticker Visa',
    processingTime: '15-20 Days',
    priceEstimate: 'PKR 65,000',
    documents: [
      'Complete signed visa application form',
      'Original Bank Statement (last 6 months, maintained balance > PKR 500k)',
      'Account Maintenance Certificate from bank',
      'NTN/Tax certificate (if self-employed business owner)',
      'Job Letter & 3 Months Payslips (if employed personnel)',
      'Police Clearance Certificate'
    ],
    requirementsInfo: 'Requires submission at official Gerrys Visa Drop Box. NASEEB GLOBAL TRAVEL & TOURS will prepare file indexation perfectly to avoid standard rejection reasons.'
  },
  {
    country: 'Schengen (Europe Countries)',
    visaType: 'Short-stay Visa (C-type)',
    processingTime: '21-30 Days',
    priceEstimate: 'PKR 98,000 (including consulting, file stack, travel insurance)',
    documents: [
      'Comprehensive Schengen Visa Application Form',
      'Biometric Photometrics according to ICAO specs',
      'Comprehensive Travel Insurance coverage limit > EUR 30,000',
      '6 Months strong bank statement with high solvency',
      'Chamber of Commerce active certificate (business owners)',
      'Focal Cover letter detailing exact daily activities'
    ],
    requirementsInfo: 'NASEEB GLOBAL TRAVEL & TOURS provides premium consultancy assistance, mock interviews prep, and covers accommodation bookings, transport tickets, and cover-letter writing.'
  },
  {
    country: 'Malaysia',
    visaType: 'Single Entry e-Tourist Visa',
    processingTime: '3 Working Days',
    priceEstimate: 'PKR 25,000',
    documents: [
      'Scan of original passport bio page',
      'Proof of return air flights',
      '3-months updated bank statement with balance > PKR 200,000',
      'Hotel reservation proof'
    ],
    requirementsInfo: 'Streamlined online system. Highly regularized processing.'
  }
];

export const GENERAL_REVIEWS = [
  {
    id: '1',
    name: 'Habib-Ur-Rehman',
    location: 'Faisalabad',
    quote: 'NASEEB GLOBAL TRAVEL & TOURS arranged our custom family Umrah trip flawlessy. The Swissotel hotel was right in front of Haram and the private coach transport made the journey extremely easy for my parents.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '2',
    name: 'Muhammad Bilal',
    location: 'Samundri Road',
    quote: 'Applied for Turkey tourism visa assistance through them. Incredible service! They structured my financial documentation and cover-letter, and the sticker visa got approved inside 14 days without a hassle.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '3',
    name: 'Aisha Siddique',
    location: 'Sargodha Road',
    quote: 'Unbelievable customer support. They helped me plan an custom 5-day Dubai trip. We got luxury seats, great hotels, and they kept track of our flight check-ins via WhatsApp throughout. Highly recommend!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  }
];
