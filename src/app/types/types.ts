 type Offer = {
  id: number;
  title: string;
  school_id: number;
  value: number;
  created_at: string | null;
  updated_at: string | null;
};

export type OfferResponse = {
  offers: Offer[];
  total: number;
};
export type InsResponse = {
  total: number;
};

export interface Student {
  id: number;
  full_name: string;
  mother_name: string;
  school_id: number;
  profile_image_url: string;
  file: string;
  description: string;
  status: string;
  gender: string;
  orphan: string;
  has_martyrs_relatives: string;
  last_school: string;
  semester_id: number;
  class_room_id: number;
  class_section_id: number;
  birth_day: string;
  offer_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface StudentsResponse {
  students: Student[];
  total : number
}
type Profile = {
  id: number;
  name: string;
  email: string;
  expires_at: string;
  email_verified_at: string | null;
  school_id: number;
  created_at: string; 
  updated_at: string; 
};

export type ProfileResponse = {
  profile: Profile;
};


 type OfferItem = {
  id:number
  note: string;
  value: number;
  student: string;
};

export interface OffersResponseItems {
  data: OfferItem[];
}
type Invoice = {
  id: number;
  number: string;
  value: string;
  student_id: number;
  student_name: string;
  school_id: number;
  school_name: string;
  created_at: string;
};

export type InvoiceResponse = {
  data: Invoice[];
};

export type Option = {
  id: number;
  full_name?: string;
  name?: string;
};
type Part = {
  id: number;
  amount: string;
  due_date: string;
  paid_at: string;
};

type Installment = {
  id: number;
  title: string;
  amount: string;
  student: string;
  status: "pending" | "paid";
  created_at: string;
  parts: Part[];
};

export type Installments = {
  data: Installment[];
};