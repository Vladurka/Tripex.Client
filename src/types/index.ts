export interface PostType {
  id: string;
  profileId: string;
  contentUrl: string;
  description: string | null;
  createdAt: string;
  user: BasicProfileType;
}

export interface BasicProfileType {
  id: string;
  profileName: string;
  avatarUrl: string | null;
}

export interface ProfileType {
  id: string;
  profileName: string;
  avatarUrl: string | null;
  firstName: string | null;
  lastName: string | null;
  description: string | null;
  followersCount: number;
  followingCount: number;
}
