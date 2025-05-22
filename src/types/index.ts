export interface Post {
  id: string;
  profileId: string;
  contentUrl: string;
  description: string;
  createdAt: string;
  user: BasicProfile;
}

export interface BasicProfile {
  id: string;
  profileName: string;
  avatarUrl: string;
}

export interface Profile {
  id: string;
  avatarUrl: string;
  profileName: string;
  firstName: string;
  lastName: string;
  description: string;
  createdAt: string;
}

export interface UserSignUp {
  email: string;
  userName: string;
  password: string;
}

export interface UserLogIn {
  email: string;
  password: string;
}
