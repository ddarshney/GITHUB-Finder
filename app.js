//Init Github
const github = new Github();
//Init UI
const ui = new UI();
//Search input
const searchUser = document.getElementById("searchUser");
//Pagination
let page = 1;
//to stop fetch req if no more pages available
let repo_count = 0;

//fetch profile and repo on every keystroke
searchUser.addEventListener("keyup", (e) => {
  const userText = e.target.value;
  ui.clearAlert();
  if (userText !== "") {
    //Fetch Profile
    ui.showSpinner();
    github.getUser(userText).then((data) => {
      //remove spinner once get the response
      ui.removeSpinner();
      if (data.profile.message === "Not Found") {
        //show alert
        ui.showAlert("User not found", "alert alert-danger");
      } else {
        //show profile
        page = 1;
        repo_count = 0;
        ui.showProfile(data.profile);
        repo_count = data.profile.public_repos;
        github
          .getRepos(userText, page)
          .then((data) => ui.showRepos(data.repos, true));
      }
    });
  } else {
    //clear profile and repo
    ui.clearProfile();
    //remove spinner
    ui.removeSpinner();
    //reseting repo variables
    page = 1;
    lastData = 0;
    repoLimit = false;
  }
});

//Pagination on scroll
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (page * 5 >= repo_count) {
    return;
  }
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    ui.showLoader();
    page++;
    github.getRepos(searchUser.value, page).then((data) => {
      ui.removeLoader();
      setTimeout(() => ui.showRepos(data.repos), 200);
    });
  }
});
