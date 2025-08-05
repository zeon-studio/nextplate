import { initialize } from "next/dist/server/lib/render-server";
import { PortableTextBlock } from "sanity";

export type RegularPage = {
  frontmatter: {
    title: string;
    subtitle?: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    tags: string[];
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};

export type Author = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: [
      {
        name: string;
        icon: string;
        link: string;
      },
    ];
  };
  content?: string;
  slug?: string;
};

export type Feature = {
  button: button;
  image?: string;
  video?: string;
  bulletpoints?: string[];
  content: string;
  title: string;
  subtitle?: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Service = {
  image: string;
  alt: string;
  link: string;
  category: string;
  title: string;
  content: string;
  button: Button;
};

export type Photo = {
  src: string;
  width: number;
  height: number;
};

export type Product = {
  image: string;
  title: string;
  alt: string;
  height: string;
  width: string;
};

export type Plant_based = {
  enable?: boolean;
  title: string;
  description: string;
  image: string;
  button: Button;
};

export type Call_to_action = {
  enable?: boolean;
  title: string;
  description: string;
  image: string;
  button: Button;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export type Buttons = {
  [key: string]: {
    enable: boolean;
    label: string;
    link: string;
    classname: string;
  };
};

export type Our_locations = {
  title: string;
  subtitle: string;
  location_title: string;
  location_content: string;
  image: string;
  alt: string;
  bulletpoints: string[];
};

export type Point_of_contact_email = {
  title: string;
  content: string;
  email: string;
  href: string;
};

export type Location = {
  state: string;
  address: string;
};

export type Point_of_contact_locations = {
  title: string;
  locations: Location[];
};

export type Number = {
  state: string;
  phone_number: string;
  href: string;
};

export type Point_of_contact_call = {
  title: string;
  content: string;
  numbers: Number[];
};

export type Capability = {
  title: string;
  image: string;
  alt: string;
  bulletpoints: string[];
};

export type Card = {
  title: string;
  content: string;
  button: Button;
};

export type Highlight = {
  logo?: string;
  title: string;
  subtitle: string;
  detail: string;
};

export type ProfileType = {
  _id: string;
  fullName: string;
  headline: string;
  profileImage: {
    alt: string;
    image: string;
  };
  shortBio: string;
  email: string;
  fullBio: PortableTextBlock[];
  location: string;
  resumeURL: string;
  socialLinks: string[];
  skills: string[];
};

export type JobPosition = {
  _id: string;
  jobTitle: string;
  location: string;
  jobDescription: string;
};

export type User = {
  _type: string;
  name: string;
  email: string;
  message: string;
};

export type EmployeeApplication = {
  _id?: string;
  _type: string;
  dateOfApplication: string;
  fname: string;
  mname: string;
  lname: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  email: string;
  positions: string;
  employeeType: string;
  availability: Array<string>;
  weekendAvailability: string;
  overtime: string;
  startDate: string;
  accommodation: string;
  accommodationMessage: string;
  jobPositionID: string;

  // Employment experiences should be an array of objects
  employmentExperiences: Array<{
    _key: string;
    nameofEmployer: string;
    supervisor: string;
    employerContact: string;
    employerAddress: string;
    employerPhone: string;
    dateEmployedFrom: string;
    dateEmployedTo: string;
    jobTitleAndDuties: string;
    reasonForLeaving: string;
  }>;
  termination: string;
  terminationMessage: string;
  employmentGaps: string;
  employmentQualifications: string;

  // Preserve job details
  jobSnapshot: {
    jobTitle: string;
    jobLocation: string;
  };

  // Education
  highschool: {
    highschoolName: string;
    highschoolYear: string;
    highschoolDegree: string;
    highschoolAreaOfStudy: string;
    highschoolSpecialization: string;
  };

  college: {
    collegeName: string;
    collegeYear: string;
    collegeDegree: string;
    collegeAreaOfStudy: string;
    collegeSpecialization: string;
  };

  graduateSchool: {
    graduateSchoolName: string;
    graduateSchoolYear: string;
    graduateSchoolDegree: string;
    graduateSchoolAreaOfStudy: string;
    graduateSchoolSpecialization: string;
  };

  tradeSchool: {
    tradeSchoolName: string;
    tradeSchoolYear: string;
    tradeSchoolDegree: string;
    tradeSchoolAreaOfStudy: string;
    tradeSchoolSpecialization: string;
  };

  other: {
    otherName: string;
    otherYear: string;
    otherDegree: string;
    otherAreaOfStudy: string;
    otherSpecialization: string;
  };

  // Business and professional references
  businessReferences: Array<{
    _key: string;
    nameAndTitle: string;
    relationship: string;
    phoneOrEmail: string;
  }>;

  personalReferences: Array<{
    _key: string;
    nameAndTitle: string;
    relationship: string;
    phoneOrEmail: string;
  }>;

  // General Information
  transportation: string;
  ageRequirement: string;
  employmentAuthorization: string;

  // Applicant statement and agreement
  agreement1: {
    initialHere1: string;
    statementAndAgreement1: string;
  };
  agreement2: {
    initialHere2: string;
    statementAndAgreement2: string;
  };
  agreement3: {
    initialHere3: string;
    statementAndAgreement3: string;
  };
  agreement4: {
    initialHere4: string;
    statementAndAgreement4: string;
  };
  agreement5: {
    initialHere5: string;
    statementAndAgreement5: string;
  };
  agreement6: {
    initialHere6: string;
    statementAndAgreement6: string;
  };

  // electronic signature
  electronicSignature: string;
  todaysDate: string;
};

export type CardCarouselType = {
  image: string;
  text: string;
  title: string;
  subtitle: string;
};
