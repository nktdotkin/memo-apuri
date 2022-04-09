const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let loginData = await fetchData('/user/login', 'POST', 'json', new URLSearchParams(new FormData(loginForm)));
    let token = loginData['x-access-token'];

    if (token) {
        document.cookie = `x-access-token=${token}`;
        let indexData = await fetchData('/index', 'GET');
        window.open(indexData.url, "_self");
    }
});

