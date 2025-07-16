
export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  password?: string;
  mobile: string;
  age: number;
  gender: 'male' | 'female';
  aiKnowledge: 'beginner' | 'intermediate' | 'advanced';
}
