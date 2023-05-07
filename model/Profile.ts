export class Profile {
  bio: string;
  name: string;
  cover: string;
  picture: string;
  followedBy: number;
  following: number;
  posts: number;

  constructor(profile: Profile) {
    this.bio = profile.bio;
    this.name = profile.name;
    this.cover = profile.cover;
    this.picture = profile.picture;
    this.followedBy = profile.followedBy;
    this.following = profile.following;
    this.posts = profile.posts;
  }
}
