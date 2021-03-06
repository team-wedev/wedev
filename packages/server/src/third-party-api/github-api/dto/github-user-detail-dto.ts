export class GithubUserDetailDto {
  public readonly login: string;
  public readonly githubId: number;
  public readonly nodeId: string;
  public readonly avatar: string;
  public readonly gravatarId: string;
  public readonly url: string;
  public readonly htmlUrl: string;
  public readonly followersUrl: string;
  public readonly followingUrl: string;
  public readonly subscriptionsUrl: string;
  public readonly organizationsUrl: string;
  public readonly reposUrl: string;
  public readonly eventsUrl: string;
  public readonly receivedEventsUrl: string;
  public readonly type: string;
  public readonly siteAdmin: boolean;
  public readonly name: string;
  public readonly company: string;
  public readonly blog: string;
  public readonly location: string;
  public readonly email: string;
  public readonly hireable: boolean;
  public readonly bio: string;
  public readonly publicRepos: number;
  public readonly followers: number;
  public readonly following: number;
  public readonly createdAt: string;
  public readonly updatedAt: string;

  public constructor(data) {
    this.login = data.login;
    this.githubId = data.id;
    this.nodeId = data.node_id;
    this.avatar = data.avatar_url;
    this.gravatarId = data.gravatar_id;
    this.url = data.url;
    this.htmlUrl = data.html_url;
    this.followersUrl = data.followers_url;
    this.followingUrl = data.following_url;
    this.subscriptionsUrl = data.subscriptions_url;
    this.organizationsUrl = data.organizations_url;
    this.reposUrl = data.repos_url;
    this.eventsUrl = data.events_url;
    this.receivedEventsUrl = data.received_events_url;
    this.type = data.type;
    this.siteAdmin = data.site_admin;
    this.name = data.name;
    this.company = data.company;
    this.blog = data.blog;
    this.location = data.location;
    this.email = data.email;
    this.hireable = data.hireable;
    this.bio = data.bio;
    this.publicRepos = data.public_repos;
    this.followers = data.followers;
    this.following = data.following;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
