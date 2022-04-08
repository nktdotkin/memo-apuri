window.onload = function (e) {
    listFolders();
}

function listFolders() {
    fetch('/folder/list', {
        method: 'GET'
    })
        .then(response => { return response.json(); })
        .then(responseData => {
            showAlert(responseData);
        })
        .catch(err => {
            showAlert(err);
        });
}