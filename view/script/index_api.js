window.onload = function (e) {
    listFolders();
}

function listFolders() {
    const folders = await fetchData('/folder/list', 'GET');
}