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