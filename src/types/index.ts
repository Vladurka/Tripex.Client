export interface Post {
  id: string;
  profileId: string;
  contentUrl: string;
  description: string | null;
  createdAt: string;
  user: BasicProfile;
}

export interface BasicProfile {
  id: string;
  profileName: string;
  avatarUrl: string | null;
}

export interface Profile {
  id: string;
  profileName: string;
  avatarUrl: string | null;
  firstName: string | null;
  lastName: string | null;
  description: string | null;
  followersCount: number;
  followingCount: number;
}
