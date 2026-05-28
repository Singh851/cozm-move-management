import type { MMCase } from "./types";

export const BNP_CASES: MMCase[] = [
  {
    id: "CAS-0001841234",
    assignee: { name: "Marie Dupont", email: "m.dupont@bnpparibas.com", phone: "+33 6 12 34 56 78", salutation: "Ms", nationality: "French" },
    entity: "BNP PARIBAS London Branch",
    from: { city: "Paris", country: "France", flag: "🇫🇷" },
    to: { city: "London", country: "United Kingdom", flag: "🇬🇧" },
    assignmentType: "Long-Term",
    initiationDate: "2026-01-15",
    mmc: "Sarah Clarke",
    status: "Mover Assigned",
    acknowledgedDate: "2026-01-15",
    serviceIntroSentDate: "2026-01-16",
    shipmentTypes: [
      { method: "Road", spStatus: "Pending" }
    ],
    quotes: [
      { id: "Q-0700", mover: "Santa Fe Paris", volume: "8.5 cbm road, combined", price: 2320, currency: "EUR", winner: true, savings: 2460, selectionReason: "Price" },
      { id: "Q-0701", mover: "Premium Removals Solutions", volume: "12 cbm road, combined", price: 4780, currency: "EUR", winner: false }
    ],
    selectedMover: "Santa Fe Paris",
    briefingCall: {
      scheduledDate: "2026-01-20",
      completedDate: "2026-01-20",
      notes: "Assignee confirmed road shipment only. No vehicle or pets. Origin property is a 2-bed apartment. Destination TBC pending housing search. Assignee available from 15 Feb for packing.",
      summarySentDate: "2026-01-21"
    },
    kpi: { preMoveServeyDate: "2026-01-28", deliveryComplete: false },
    billing: {},
    csatSent: false
  },
  {
    id: "CAS-0001812994",
    assignee: { name: "Jean-Pierre Martin", email: "jp.martin@bnpparibas.com", phone: "+33 1 45 67 89 10", salutation: "Mr", nationality: "French" },
    entity: "BNP PARIBAS USA",
    from: { city: "Paris", country: "France", flag: "🇫🇷" },
    to: { city: "New York", country: "United States", flag: "🇺🇸" },
    assignmentType: "Long-Term",
    initiationDate: "2026-01-10",
    mmc: "Oliver Brown",
    status: "Survey & Quotes",
    acknowledgedDate: "2026-01-10",
    serviceIntroSentDate: "2026-01-11",
    shipmentTypes: [
      { method: "Air", spStatus: "Not Enrolled" },
      { method: "Sea", spStatus: "Not Enrolled" }
    ],
    quotes: [
      { id: "Q-PENDING-1", mover: "Santa Fe Paris", volume: "400 kg air + 50 cbm sea", price: 15931, currency: "EUR", winner: false },
      { id: "Q-PENDING-2", mover: "Premium Removals Solutions", volume: "400 kg air + 57 cbm sea", price: 16867, currency: "EUR", winner: false }
    ],
    selectedMover: undefined,
    briefingCall: {
      scheduledDate: "2026-01-17",
      completedDate: "2026-01-17",
      notes: "Assignee requires air + sea combination. Family of 3. Approx 50 cbm sea + 400kg air. Packing requested late February. Assignee preference: Santa Fe.",
      summarySentDate: "2026-01-18"
    },
    kpi: { preMoveServeyDate: "2026-01-25", deliveryComplete: false },
    billing: {},
    csatSent: false
  },
  {
    id: "CAS-0001821231",
    assignee: { name: "Sophie Laurent", email: "s.laurent@bnpcardif.com", phone: "+33 6 98 76 54 32", salutation: "Ms", nationality: "French" },
    entity: "GIE BNP PARIBAS CARDIF",
    from: { city: "Paris", country: "France", flag: "🇫🇷" },
    to: { city: "Luxembourg City", country: "Luxembourg", flag: "🇱🇺" },
    assignmentType: "Short-Term",
    initiationDate: "2026-02-03",
    mmc: "Emma Wilson",
    status: "Briefing Call Complete",
    acknowledgedDate: "2026-02-03",
    serviceIntroSentDate: "2026-02-04",
    shipmentTypes: [
      { method: "Road", spStatus: "Not Enrolled" },
      { method: "Air", spStatus: "Not Enrolled" }
    ],
    quotes: [],
    selectedMover: undefined,
    briefingCall: {
      scheduledDate: "2026-02-10",
      completedDate: "2026-02-10",
      notes: "Assignee has a small apartment. Estimated 15-20 cbm road + 100kg air for urgent items. Single, no dependants. Flexible on dates from late March.",
      summarySentDate: "2026-02-11"
    },
    kpi: { deliveryComplete: false },
    billing: {},
    csatSent: false
  },
  {
    id: "CAS-0001833976",
    assignee: { name: "Wei Zhang", email: "w.zhang@bnpparibas.com.hk", phone: "+61 4 12 34 56 78", salutation: "Mr", nationality: "Australian" },
    entity: "BNP Paribas Hong Kong Branch",
    from: { city: "Sydney", country: "Australia", flag: "🇦🇺" },
    to: { city: "Hong Kong", country: "Hong Kong", flag: "🇭🇰" },
    assignmentType: "Long-Term",
    initiationDate: "2026-01-05",
    mmc: "Laura Chen",
    status: "In Transit",
    acknowledgedDate: "2026-01-05",
    serviceIntroSentDate: "2026-01-06",
    shipmentTypes: [
      { method: "Sea", spStatus: "Complete" },
      { method: "Air", spStatus: "Complete" }
    ],
    quotes: [
      { id: "Q-0668", mover: "Chess Moving Sydney", volume: "11 cbm + 200 kg air", price: 7573.70, currency: "EUR", winner: true, savings: 588.30, selectionReason: "Price" },
      { id: "Q-0669", mover: "OSS World Wide Movers", volume: "11 cbm + 200 kg air", price: 8162, currency: "EUR", winner: false }
    ],
    selectedMover: "Chess Moving Sydney",
    briefingCall: {
      scheduledDate: "2026-01-12",
      completedDate: "2026-01-12",
      notes: "Family of 4 including 2 school-age children. Sea + air combination. Assignee preference for speed — air for essentials. Packing date confirmed 1 March.",
      summarySentDate: "2026-01-13"
    },
    kpi: {
      preMoveServeyDate: "2026-01-20",
      actualPackingDate: "2026-03-01",
      finalsReceivedDate: "2026-03-03",
      deliveryComplete: false,
      actualDepartureDate: "2026-03-05",
      actualArrivalDate: undefined
    },
    billing: {},
    csatSent: false
  },
  {
    id: "CAS-0001838840",
    assignee: { name: "Antoine Blanc", email: "a.blanc@findomestic.it", phone: "+33 4 94 12 34 56", salutation: "Mr", nationality: "French" },
    entity: "FINDOMESTIC BANCA SPA",
    from: { city: "Toulon", country: "France", flag: "🇫🇷" },
    to: { city: "Florence", country: "Italy", flag: "🇮🇹" },
    assignmentType: "Permanent Transfer",
    initiationDate: "2025-12-10",
    mmc: "Sarah Clarke",
    status: "Delivery Follow Up",
    acknowledgedDate: "2025-12-10",
    serviceIntroSentDate: "2025-12-11",
    shipmentTypes: [
      { method: "Road", spStatus: "Complete" }
    ],
    quotes: [
      { id: "Q-0674", mover: "Santa Fe Paris", volume: "27 cbm + piano handling", price: 2800, currency: "EUR", winner: true, savings: 3050, selectionReason: "Price" },
      { id: "Q-0673", mover: "Premium Removals Solutions", volume: "34 cbm Toulon-Paris + piano", price: 6250, currency: "EUR", winner: false }
    ],
    selectedMover: "Santa Fe Paris",
    briefingCall: {
      scheduledDate: "2025-12-18",
      completedDate: "2025-12-18",
      notes: "Large road shipment including upright piano (ground floor delivery). Family of 3. Requested special handling for piano and artwork. Packing early March.",
      summarySentDate: "2025-12-19"
    },
    kpi: {
      preMoveServeyDate: "2026-01-08",
      actualPackingDate: "2026-03-10",
      finalsReceivedDate: "2026-03-12",
      deliveryComplete: true,
      deliveryDate: "2026-03-18",
      actualDepartureDate: "2026-03-10",
      actualArrivalDate: "2026-03-18"
    },
    billing: { whoToBill: "Client" },
    csatSent: false
  },
  {
    id: "CAS-0001844582",
    assignee: { name: "Ana Ferreira", email: "a.ferreira@bnpparibas.pt", phone: "+351 91 234 56 78", salutation: "Ms", nationality: "Portuguese" },
    entity: "BNP PARIBAS SA / PORTUGAL",
    from: { city: "Lisbon", country: "Portugal", flag: "🇵🇹" },
    to: { city: "Paris", country: "France", flag: "🇫🇷" },
    assignmentType: "Long-Term",
    initiationDate: "2025-11-20",
    mmc: "Emma Wilson",
    status: "Complete",
    acknowledgedDate: "2025-11-20",
    serviceIntroSentDate: "2025-11-21",
    shipmentTypes: [
      { method: "Road", spStatus: "Complete" }
    ],
    quotes: [
      { id: "Q-0692", mover: "Santa Fe Lisbon", volume: "2 cbm road, combined", price: 1330, currency: "EUR", winner: true, savings: 509.30, selectionReason: "Price" },
      { id: "Q-0691", mover: "Global International Inc.", volume: "2 cbm road, combined", price: 1839.30, currency: "EUR", winner: false }
    ],
    selectedMover: "Santa Fe Lisbon",
    briefingCall: {
      scheduledDate: "2025-11-27",
      completedDate: "2025-11-27",
      notes: "Small move — studio apartment. Single assignee. Road only. Quick turnaround requested.",
      summarySentDate: "2025-11-28"
    },
    kpi: {
      preMoveServeyDate: "2025-12-05",
      actualPackingDate: "2026-01-15",
      finalsReceivedDate: "2026-01-17",
      deliveryComplete: true,
      deliveryDate: "2026-02-01",
      actualDepartureDate: "2026-01-15",
      actualArrivalDate: "2026-02-01"
    },
    billing: { whoToBill: "Client", moverInvoiceReceivedDate: "2026-02-10", billingCompletedDate: "2026-02-20" },
    csatSent: true,
    csatScore: 5
  },
  {
    id: "CAS-0001778261",
    assignee: { name: "Claire Moreau", email: "c.moreau@bnppf.com", phone: "+33 6 55 44 33 22", salutation: "Ms", nationality: "French" },
    entity: "BNP PARIBAS PERSONAL FINANCE",
    from: { city: "Paris", country: "France", flag: "🇫🇷" },
    to: { city: "Amsterdam", country: "Netherlands", flag: "🇳🇱" },
    assignmentType: "Long-Term",
    initiationDate: "2026-03-20",
    mmc: undefined,
    status: "Initialized",
    shipmentTypes: [],
    quotes: [],
    selectedMover: undefined,
    briefingCall: {},
    kpi: { deliveryComplete: false },
    billing: {},
    csatSent: false
  },
  {
    id: "CAS-0001810310",
    assignee: { name: "James Henderson", email: "j.henderson@bnpparibas.com", phone: "+44 7700 900123", salutation: "Mr", nationality: "British" },
    entity: "BNP PARIBAS London Branch",
    from: { city: "London", country: "United Kingdom", flag: "🇬🇧" },
    to: { city: "Frankfurt", country: "Germany", flag: "🇩🇪" },
    assignmentType: "Long-Term",
    initiationDate: "2026-01-02",
    mmc: "Oliver Brown",
    status: "Awaiting Finals Origin",
    acknowledgedDate: "2026-01-02",
    serviceIntroSentDate: "2026-01-03",
    shipmentTypes: [
      { method: "Road", spStatus: "Complete" },
      { method: "Air", spStatus: "Complete" }
    ],
    quotes: [
      { id: "Q-SF-LDN-01", mover: "Santa Fe London", volume: "TBC cbm road + air", price: 0, currency: "EUR", winner: true, selectionReason: "Price" },
      { id: "Q-ELITE-01", mover: "Elite Moving System LTD", volume: "TBC cbm", price: 0, currency: "EUR", winner: false }
    ],
    selectedMover: "Santa Fe London",
    briefingCall: {
      scheduledDate: "2026-01-09",
      completedDate: "2026-01-09",
      notes: "Family of 4. Road + air combination. Large family home. Estimated 60+ cbm. Packing confirmed 5 March.",
      summarySentDate: "2026-01-10"
    },
    kpi: {
      preMoveServeyDate: "2026-01-16",
      actualPackingDate: "2026-03-05",
      deliveryComplete: false
    },
    billing: {},
    csatSent: false
  }
];
