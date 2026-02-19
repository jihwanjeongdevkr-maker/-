
export enum CounselingType {
  IN_PERSON = '대면 상담',
  VIDEO = '화상 상담'
}

export enum ServiceCategory {
  PSYCHOLOGY = '심리상담',
  CAREER = '진로상담',
  RELATIONSHIP = '연애상담'
}

export interface BookingData {
  name: string;
  age: string;
  location: string;
  email: string;
  story: string;
  type: CounselingType;
}

export interface ServiceDetail {
  id: ServiceCategory;
  title: string;
  description: string;
  imageUrl: string;
}
