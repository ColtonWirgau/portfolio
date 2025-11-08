export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

export interface PageView {
  id?: string;
  path: string;
  timestamp: string;
  userAgent?: string;
}
