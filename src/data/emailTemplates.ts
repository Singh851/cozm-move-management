export interface EmailTemplate {
  id: string;
  trigger: string;
  subject: string;
  to: string;
  timing: string;
  body: string;
  attachments?: string[];
  phase: string;
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "ET-01",
    trigger: "New case created — MMC assignment",
    subject: "New Move Management Case Assigned – {{Case.ID}}",
    to: "MM General Mailbox",
    timing: "Immediate on case creation",
    phase: "D.1 Initiation",
    body: `Dear MM Team,

A new Move Management case has been initiated in Unity and requires MMC assignment.

Case Reference: {{Case.ID}}
Assignee: {{Assignee.FullName}}
Moving From: {{Case.FromCity}}, {{Case.FromCountry}}
Moving To: {{Case.ToCity}}, {{Case.ToCountry}}
Client Entity: {{Case.Entity}}
Initiation Date: {{Case.InitiationDate}}

Please assign an MMC to this case at your earliest convenience.

Regards,
Unity Move Management System`,
    attachments: []
  },
  {
    id: "ET-02",
    trigger: "Case creation — Acknowledgement to client",
    subject: "Acknowledgement of Move Management Initiation – {{Assignee.FullName}}",
    to: "Client HR Contact",
    timing: "Immediate on case creation",
    phase: "D.2 Acknowledgement",
    body: `Dear {{Client.HRContactName}},

Thank you for initiating a Move Management case for {{Assignee.FullName}}.

We confirm receipt of your initiation and are pleased to advise that {{Assignee.FullName}}'s move is now being processed.

Case Reference: {{Case.ID}}
Assigned MMC: {{MMC.Name}}
Moving From: {{Case.FromCity}}, {{Case.FromCountry}}
Moving To: {{Case.ToCity}}, {{Case.ToCountry}}
Estimated Start Date: {{Case.AssignmentStartDate}}

Your assigned Move Management Consultant, {{MMC.Name}}, will be in touch with {{Assignee.FirstName}} shortly to introduce themselves and begin coordinating the move.

Please do not hesitate to contact us if you have any questions.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: ["Personal Data Consent Letter", "Move Needs Assessment Form", "Shipment Protection Enrolment Pack", "BNP Employee Presentation"]
  },
  {
    id: "ET-03",
    trigger: "Initiation Date + 24 hours",
    subject: "Your Relocation Support – {{Assignee.FirstName}} {{Assignee.LastName}}",
    to: "Assignee",
    timing: "Initiation Date + 24 hours",
    phase: "D.3 Assignee Service Introduction",
    body: `Dear {{Assignee.Salutation}} {{Assignee.LastName}},

On behalf of {{Case.HostEntity}}, Santa Fe Relocation will be supporting you with your upcoming move from {{Case.FromCity}}, {{Case.FromCountry}} to {{Case.ToCity}}, {{Case.ToCountry}}.

**Your Relocation Support**

My name is {{MMC.Name}}, your Move Management Consultant. I will be your main point of contact and will coordinate the following:

• Schedule a briefing call to confirm your move requirements and next steps
• Arrange for two movers to perform each a pre-move survey of your goods and to provide us with quotes for your move
• Review and select the most competitive quote in line with your employer's policy
• Introduce you to the selected mover and outline the process
• Organise shipment protection coverage during the move

**What We Need From You:**

1. Confirm availability for our call — please reply with convenient dates and times during business hours.
2. Review, sign, and return the attached documents:
   • Personal Data Consent Letter
   • Employee Presentation (sign and return the last page)
   • Move Needs Assessment Form (complete and return electronically)

We are unable to begin services until we receive your signed documents.

**Also Attached:**
Shipment Protection Enrolment Pack (details of your employer-provided coverage)

Please don't hesitate to reach out with any questions. I look forward to supporting you through your relocation.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation — Moving made easy.`,
    attachments: ["Move Needs Assessment Form", "Employee Presentation", "Shipment Protection Enrolment Pack"]
  },
  {
    id: "ET-04",
    trigger: "Briefing Call Date + 24 hours (after notes entered)",
    subject: "Briefing Call Summary – {{Assignee.FirstName}} {{Assignee.LastName}}",
    to: "Assignee",
    timing: "Briefing Call Date + 24 hours",
    phase: "D.4 Briefing Call",
    body: `Dear {{Assignee.Salutation}} {{Assignee.LastName}},

Thank you for taking the time to speak with me today. Please find below a summary of our conversation.

**Briefing Call Summary**

Date of Call: {{BriefingCall.Date}}
MMC: {{MMC.Name}}

Move Details Confirmed:
• Origin: {{Case.FromAddress}}, {{Case.FromCity}}, {{Case.FromCountry}}
• Destination: {{Case.ToCity}}, {{Case.ToCountry}}
• Shipment Types: {{Case.ShipmentTypes}}
• Estimated Volume: {{Case.EstimatedVolume}}
• Preferred Packing Window: {{Case.PreferredPackingDates}}

Next Steps:
1. We will arrange for panel movers to contact you to schedule pre-move surveys
2. Once all quotes are received, we will present a comparison for review
3. You will be asked to indicate your mover preference

{{BriefingCall.AdditionalNotes}}

Please review and confirm the above is accurate. If you have any changes or questions, please do not hesitate to contact me.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: []
  },
  {
    id: "ET-05",
    trigger: "MMC instruction following Briefing Call",
    subject: "Pre-Move Survey & Quote Request – {{Assignee.FirstName}} {{Assignee.LastName}} ({{Case.FromCity}} → {{Case.ToCity}})",
    to: "Panel Movers (selected)",
    timing: "On MMC instruction post Briefing Call",
    phase: "D.6 Survey & Quote Request",
    body: `Dear {{Mover.ContactName}},

Santa Fe Relocation would like to invite you to conduct a pre-move survey and submit a door-to-door quote for the following shipment.

**Assignee Details**
Name: {{Assignee.FullName}}
Moving From: {{Case.FromAddress}}, {{Case.FromCity}}, {{Case.FromCountry}}
Moving To: {{Case.ToCity}}, {{Case.ToCountry}}
Shipment Types Required: {{Case.ShipmentTypes}}
Preferred Survey Window: {{Case.PreferredSurveyDates}}

**Please complete your quote using the link below:**
[Complete Quote Form →] {{QuoteForm.Link}}

**Important:**
• All quotes must be submitted via the link above by {{QuoteDeadline}}
• Minimum two quotes are required before mover selection
• Please include all shipment methods, weights, volumes, and all-in pricing

Please confirm receipt of this request by return.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: ["Quote Form Template"]
  },
  {
    id: "ET-06",
    trigger: "Within 24 hours of mover survey request",
    subject: "Survey Date Confirmation – {{Assignee.FirstName}} {{Assignee.LastName}}",
    to: "Assigned Mover",
    timing: "Mover request date + 24 hours",
    phase: "D.6 Survey Confirmation",
    body: `Dear {{Mover.ContactName}},

This is a reminder regarding the pre-move survey for:

Assignee: {{Assignee.FullName}}
Survey Address: {{Case.FromAddress}}, {{Case.FromCity}}
Requested Survey Window: {{Case.PreferredSurveyDates}}

Please confirm the agreed survey date and time by return, and contact the assignee directly on {{Assignee.Phone}} to coordinate access.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: []
  },
  {
    id: "ET-07",
    trigger: "All quotes received — automatic trigger",
    subject: "Your Move — Mover Preference Request",
    to: "Assignee",
    timing: "Pre-Move Survey Date + 24 hours / all quotes received",
    phase: "D.7 Mover Ranking",
    body: `Dear {{Assignee.Salutation}} {{Assignee.LastName}},

We have now received all quotes for your move from {{Case.FromCity}} to {{Case.ToCity}} and would like to share the comparison with you.

Please review the attached Quote Comparison and indicate your preference using the link below:

[View Quote Comparison & Select Preference →] {{QuoteComparison.Link}}

Our team has reviewed the quotes against your employer's criteria and will factor your preference into our final recommendation.

Please respond by {{ResponseDeadline}}.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: ["Quote Comparison Summary"]
  },
  {
    id: "ET-08",
    trigger: "Mover selection confirmed in Unity",
    subject: "Move Booking Confirmation – {{Assignee.FirstName}} {{Assignee.LastName}} ({{Case.ID}})",
    to: "Assigned Mover",
    timing: "On mover selection",
    phase: "D.9 Mover Booking",
    body: `Dear {{Mover.ContactName}},

We are pleased to confirm the booking of your services for the following move:

**Booking Confirmation**
Case Reference: {{Case.ID}}
Assignee: {{Assignee.FullName}}
Origin: {{Case.FromAddress}}, {{Case.FromCity}}, {{Case.FromCountry}}
Destination: {{Case.ToCity}}, {{Case.ToCountry}}
Shipment Types: {{Case.ShipmentTypes}}
Estimated Packing Date: {{Case.EstimatedPackingDate}}

**Invoicing Details**
Invoice to: Santa Fe Relocation
Address: 1 Lyric Square, London W6 0NB
PO Reference: {{Case.PONumber}}

Please confirm receipt of this booking and provide your operational team's contact details.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: []
  },
  {
    id: "ET-09",
    trigger: "Mover selection confirmed in Unity",
    subject: "Your Move — Mover Confirmed & Next Steps",
    to: "Assignee",
    timing: "On mover selection",
    phase: "D.9 Mover Confirmation to Assignee",
    body: `Dear {{Assignee.Salutation}} {{Assignee.LastName}},

We are pleased to confirm that your move has been booked with {{SelectedMover.Name}}.

**Your Move Details**
Case Reference: {{Case.ID}}
Moving From: {{Case.FromCity}}, {{Case.FromCountry}}
Moving To: {{Case.ToCity}}, {{Case.ToCountry}}
Estimated Packing Date: {{Case.EstimatedPackingDate}}
Mover Contact: {{Mover.ContactName}} — {{Mover.Phone}}

**Shipment Protection**
Please review and complete the attached Shipment Protection Enrolment Form as soon as possible. This must be received before your packing date.

{{Case.Recommendations}}

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: ["Shipment Protection Enrolment Pack", "Recommendations for an International Move"]
  },
  {
    id: "ET-10",
    trigger: "One week before packing date — if SP form not received",
    subject: "REMINDER: Shipment Protection Enrolment Required – {{Assignee.FirstName}}",
    to: "Assignee",
    timing: "1 week before packing date (if SP form not received)",
    phase: "D.10 SP Reminder 1",
    body: `Dear {{Assignee.Salutation}} {{Assignee.LastName}},

This is a reminder that we have not yet received your completed Shipment Protection Enrolment Form.

Your packing date is scheduled for {{Case.PackingDate}} — please complete and return the form at your earliest convenience to ensure your belongings are protected during transit.

[Complete SP Enrolment Form →] {{SPForm.Link}}

If you have already submitted this, please disregard this message.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: ["Shipment Protection Enrolment Pack"]
  },
  {
    id: "ET-11",
    trigger: "76 hours before packing date — if SP form not received",
    subject: "URGENT: Shipment Protection Enrolment – Action Required",
    to: "Assignee",
    timing: "76 hours before packing date (if SP form not received)",
    phase: "D.10 SP Reminder 2",
    body: `Dear {{Assignee.Salutation}} {{Assignee.LastName}},

We have not yet received your Shipment Protection Enrolment Form and your packing date is approaching.

Packing Date: {{Case.PackingDate}}

Please complete the form immediately to ensure your shipment is protected:
[Complete SP Enrolment Form →] {{SPForm.Link}}

Failure to submit this form before packing may affect your shipment protection coverage.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: []
  },
  {
    id: "ET-12",
    trigger: "48 hours before packing date — if SP form not received",
    subject: "ACTION NEEDED: SP Form Missing – {{Assignee.FirstName}} {{Assignee.LastName}} ({{Case.ID}})",
    to: "MMC",
    timing: "48 hours before packing date (if SP form not received)",
    phase: "D.10 SP MMC Alert",
    body: `Dear {{MMC.Name}},

This is an automated alert from Unity: the Shipment Protection Enrolment Form has not been received for the following case and packing is in 48 hours.

Case Reference: {{Case.ID}}
Assignee: {{Assignee.FullName}}
Packing Date: {{Case.PackingDate}}

Please contact the assignee directly to ensure the form is submitted before packing begins.

Unity Move Management System`,
    attachments: []
  },
  {
    id: "ET-13",
    trigger: "SP declaration completed in Unity",
    subject: "Shipment Protection Confirmation – {{Assignee.FirstName}} {{Assignee.LastName}}",
    to: "Assignee",
    timing: "On SP declaration completion",
    phase: "D.10 SP Confirmation",
    body: `Dear {{Assignee.Salutation}} {{Assignee.LastName}},

We are pleased to confirm that your Shipment Protection Declaration has been completed for your upcoming move.

**Declaration Summary**
Case Reference: {{Case.ID}}
Shipment Method(s): {{Case.ShipmentTypes}}
Declaration Reference: {{SP.DeclarationRef}}

Your belongings are now covered for the duration of transit. Please retain this confirmation for your records.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: ["SP Declaration Confirmation"]
  },
  {
    id: "ET-14",
    trigger: "Packing Date + 24 hours",
    subject: "Finals Request – {{Assignee.FirstName}} {{Assignee.LastName}} ({{Case.ID}})",
    to: "Assigned Mover",
    timing: "Packing Date + 24 hours",
    phase: "D.11 Finals Request",
    body: `Dear {{Mover.ContactName}},

We are following up on the move for {{Assignee.FullName}} ({{Case.ID}}).

Packing Date: {{Case.PackingDate}}

Could you please provide the final weights, volumes, and inventory for this shipment at your earliest convenience?

[Submit Finals →] {{Finals.Link}}

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: []
  },
  {
    id: "ET-15",
    trigger: "Packing Date + 48 hours",
    subject: "In-Transit Date Request – {{Assignee.FirstName}} {{Assignee.LastName}} ({{Case.ID}})",
    to: "Assigned Mover",
    timing: "Packing Date + 48 hours",
    phase: "D.11 In-Transit Request",
    body: `Dear {{Mover.ContactName}},

Please provide the estimated departure and arrival dates for the following shipment:

Case Reference: {{Case.ID}}
Assignee: {{Assignee.FullName}}
Route: {{Case.FromCity}} → {{Case.ToCity}}

[Submit In-Transit Dates →] {{InTransit.Link}}

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: []
  },
  {
    id: "ET-16",
    trigger: "On entry of delivery date in Unity",
    subject: "Your Move is Complete — Delivery Confirmation & Next Steps",
    to: "Assignee",
    timing: "On entry of delivery date",
    phase: "D.12 Delivery Follow-Up",
    body: `Dear {{Assignee.Salutation}} {{Assignee.LastName}},

We hope your move went smoothly! Please review your delivery and let us know if everything has arrived in order.

**Delivery Details**
Delivery Date: {{Case.DeliveryDate}}
Destination: {{Case.ToAddress}}, {{Case.ToCity}}, {{Case.ToCountry}}

**If You Need to Make a Claim**
Please refer to the enclosed document for the step-by-step claims process. Any damage or loss must be reported within {{ClaimsDeadline}} days of delivery.

[View Claims Process →]

We will be in touch shortly with a satisfaction survey. Thank you for choosing Santa Fe Relocation.

Kind Regards,
{{MMC.Name}}
Santa Fe Relocation`,
    attachments: ["Claim Process Step by Step"]
  },
  {
    id: "ET-17",
    trigger: "5 days after delivery date entry",
    subject: "How Was Your Move? — {{Assignee.FirstName}}, We'd Love Your Feedback",
    to: "Assignee",
    timing: "5 days after delivery date",
    phase: "D.14 CSAT Survey",
    body: `Dear {{Assignee.FirstName}},

We hope you are settling in well. We'd love to hear about your moving experience with Santa Fe Relocation.

Please take a moment to rate your experience:

[Rate Your Move Experience →] {{CSAT.SurveyLink}}

Your feedback helps us continuously improve our service and provides valuable insight for your employer.

Thank you,
Santa Fe Relocation`,
    attachments: []
  }
];
