class Github {
  constructor() {
    this.client_id = "0681e1482701f8e81985";
    this.client_secret = "76cb7a810d22eb2b356f0495ac3d4b8b2175fddb";
    this.repos_count = 5;
    this.repos_sort = "created: asc";
  }
  //fetch user profile
  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const profile = await profileResponse.json();
    return {
      profile,
    };
  }
  async getRepos(user, page) {
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&page=${page}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const repos = await repoResponse.json();
    return {
      repos,
    };
  }
  //fetch user's repositories
}
