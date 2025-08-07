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

interface Ex{
   id: number;
  title: string;
  date: string;
  description: string;
  status: "دفع" | "قبض";
  amount: number;
}
interface Expense {
 expenses:Ex[]
}
type InstallmentPart = {
  amount: string;
  due_date: string;
};
export type StudentOption = {
  value: number;
  label: string;
};
export interface AddInsType  {
  studentId:string | null;
        title: string;
        setTitle: (value: string) => void;
        amount: string;
        setAmount: (value: string) => void;
        
        studentOptions: StudentOption[] |null;
        handleSelectChange: (selectedOption: any) => void;
        status: string;
        setStatus: (value: string) => void;
        isSplit: boolean;
        setIsSplit: (value: boolean) => void;
        parts: { amount: string; due_date: string }[];
        handleAddPart: () => void;
        handlePartChange: (
        index: number,
        field: keyof { amount: string; due_date: string },
        value: string
        ) => void;
        handleSubmit: () => Promise<void>;
    }



  export  type Inputs = {
      full_name: string;
      mother_name: string;
      birth_day: string;
      gender: string;
      status: string;
      orphan: string;
      has_martyrs_relatives: string;
      last_school: string;
      semester_id: string;
      offer_id: string;
      description: string;
      file: FileList;
      profile_image_url: FileList;
      class_room_id: string;
      class_section_id: string;
    };

    type Account = {
  id: number;
  name: string;
  code: string;
  balance: string;
  type: string | null;
  parent_id: number | null;
  created_at: string; // تاريخ بصيغة ISO
  updated_at: string; // تاريخ بصيغة ISO
  school_id: number;
  children_recursive: Account[]; // نفس النوع بشكل متداخل (Recursive)
};

export type Accounts = Account[];
