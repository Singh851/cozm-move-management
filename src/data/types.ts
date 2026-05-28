export type CaseStatus =
  | 'Initialized'
  | 'Briefing Call Complete'
  | 'Survey & Quotes'
  | 'Mover Assigned'
  | 'Awaiting Move Dates'
  | 'Awaiting Finals Origin'
  | 'In Transit'
  | 'Delivery Follow Up'
  | 'Awaiting Final Billing'
  | 'Complete';

export type ShipmentMethod = 'Air' | 'Sea' | 'Road' | 'Vehicle' | 'Pet';

export interface Assignee {
  name: string;
  email: string;
  phone?: string;
  salutation?: string;
  nationality?: string;
}

export interface Address {
  city: string;
  country: string;
  flag?: string;
}

export interface Quote {
  id: string;
  mover: string;
  volume: string;
  price: number;
  currency: string;
  winner: boolean;
  savings?: number;
  selectionReason?: string;
}

export interface ShipmentType {
  method: ShipmentMethod;
  spStatus?: 'Not Enrolled' | 'Pending' | 'Form Received' | 'Complete';
}

export interface BriefingCall {
  scheduledDate?: string;
  completedDate?: string;
  notes?: string;
  summarySentDate?: string;
}

export interface MoveKPI {
  preMovesSurveyDate?: string;
  actualPackingDate?: string;
  finalsReceivedDate?: string;
  deliveryComplete: boolean;
  deliveryDate?: string;
  actualDepartureDate?: string;
  actualArrivalDate?: string;
}

export interface BillingInfo {
  whoToBill?: 'AM' | 'Client';
  moverInvoiceReceivedDate?: string;
  billingCompletedDate?: string;
}

export interface MMCase {
  id: string;
  assignee: Assignee;
  entity: string;
  from: Address;
  to: Address;
  assignmentType: string;
  initiationDate: string;
  mmc?: string;
  status: CaseStatus;
  shipmentTypes: ShipmentType[];
  quotes: Quote[];
  selectedMover?: string;
  briefingCall: BriefingCall;
  kpi: MoveKPI;
  billing: BillingInfo;
  csatSent?: boolean;
  csatScore?: number;
  exceptionRaised?: boolean;
  exceptionReason?: string;
  acknowledgedDate?: string;
  serviceIntroSentDate?: string;
}
