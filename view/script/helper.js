function showAlert(message) {
    alert(JSON.stringify(message));
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const fetchData = async (route, methodType, returnType, bodyData) => {
    let responseData = await fetch(route, {
        method: methodType,
        body: bodyData
    })
        .then(response => {
            switch (returnType) {
                case 'blob':
                    return response.blob();
                case 'text':
                    return response.text();
                case 'json':
                    return response.json();
                default:
                    return response;
            }
        })
        .then(responseData => {
            if (responseData.error) {
                showAlert(responseData.error);
            }
            return responseData;
        })
        .catch(err => {
            showAlert(err);
        });
    return responseData;
}