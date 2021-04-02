class UI {
  constructor() {
    this.profile = document.getElementById("profile");
    this.spinner = document.getElementById("spinner");
    this.loading = document.getElementById("loader");
    this.timer = null;
  }
  showProfile(user) {
    this.profile.innerHTML = `
      <div class='card card-body mb-3'>
        <div class='row'>
          <div class='col-md-3'>
            <img class='img-fluid mb-2' src=${user.avatar_url}>
            <a href=${user.html_url} target="_blank" 
            class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class='col-md-9'>
            <span class='badge badge-primary p-2'>Public Repos: 
            ${user.public_repos}</span>
            <span class='badge badge-secondary p-2'>Public Gists: 
            ${user.public_gists}</span>
            <span class='badge badge-success p-2'>Followers: 
            ${user.followers}</span>
            <span class='badge badge-info p-2'>Following: 
            ${user.following}</span>
            <br><br>
            <ul class='list-group'>
              <li class='list-group-item'>Company: ${user.company}</li>
              <li class='list-group-item'>Website/Blog: ${user.blog}</li>
              <li class='list-group-item'>Location: ${user.location}</li>
              <li class='list-group-item'>member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div> 
      </div>
      <h3 class='page-heading mb-3'>Latest Repos</h3>
      <div id='repos'></div>
    `;
  }

  //Show User repos
  showRepos(repos, firstPage) {
    if (firstPage) {
      document.getElementById("repos").innerHTML = "";
    }
    let output = "";
    repos.forEach((repo) => {
      output += `
        <div class='card card-body mb-2'>
          <div class='row'>
            <div class='col-md-6'>
              <a href=${repo.html_url} target='_blank'>${repo.name}</a>
            </div>
            <div class='col-md-6'>
              <span class='badge badge-primary p-2 mx-2'>Stars: 
              ${repo.stargazers_count}</span>
              <span class='badge badge-secondary p-2 mx-2'>Watchers: 
              ${repo.watchers_count}</span>
              <span class='badge badge-success p-2 mx-2'>Forks: 
              ${repo.forks_count}</span> 
            </div>
          </div>
        </div>
      `;
    });

    document.getElementById("repos").innerHTML += output;
  }
  //show loader and fetch more post
  showLoader() {
    this.loading.classList.add("show");
  }
  //removeLoader
  removeLoader() {
    this.loading.classList.remove("show");
  }
  //Show spinner
  showSpinner() {
    spinner.innerHTML = `<div class='text-center mb-4'>
      <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    </div>`;
  }
  //remove spinner
  removeSpinner() {
    this.spinner.innerHTML = "";
  }
  //Show Alert Message
  showAlert(message, className) {
    //clear previous alert
    this.clearAlert();
    //creating div
    const div = document.createElement("div");
    //adding classes
    div.className = className + " mt-3";
    //add text
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".searchContainer");
    const search = document.querySelector(".search");

    container.insertBefore(div, search);

    //Clearing alert in 3 seconds
    this.timer = setTimeout(() => this.clearAlert(), 2000);
  }
  //clear Alert
  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  //Clear Profile
  clearProfile() {
    this.profile.innerHTML = "";
  }
}
