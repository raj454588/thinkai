
export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export interface User {
  id: string;
  username: string;
  password?: string;
  mobile: string;
  skill: string;
  aiKnowledge: 'beginner' | 'intermediate' | 'advanced';
}
