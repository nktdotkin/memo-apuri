const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    await fetch('/user/login', {
        method: 'POST',
        body: new URLSearchParams(new FormData(loginForm))
    })
        .then(response => { return response.json(); })
        .then(responseData => {
            if (responseData.error) {
                showAlert(responseData.error)
            }
            document.cookie = `x-access-token=${responseData['x-access-token']}`;
        })
        .catch(err => {
            showAlert(err);
        });

    await fetch('/index', {
        method: 'GET'
    }).then(response => {
        window.open(response.url, "_self");
    })
        .catch(err => {
            showAlert(err);
        });
});

