export interface Post {
  id: string;
  profileId: string;
  contentUrl: string;
  description: string;
  createdAt: string;
  user: BasicUser;
}

export interface BasicUser {
  id: string;
  profileName: string;
  avatarUrl: string;
}
