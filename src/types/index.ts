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
  profileName: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  description: string;
  followersCount: number;
  followingCount: number;
}
