// Init GitHub
const github = new GitHub;

// User input
const searchUser = document.getElementById('searchUser');

// Listen for user input
searchUser.addEventListener('keyup', (e) => {
    // Get user input
    const userInput = e.target.value;

    // Check input value
    if (userInput !== '') {
        github.getUser(userInput)
            .then(data => {
                console.log(data);
            })
    }
})