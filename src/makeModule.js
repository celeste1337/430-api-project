const handleResponse = (xhr) => {
    const content = document.querySelector('#content');

    switch (xhr.status) {
        case 200:
            content.innerHTML = '<b>success</b>';
            break;
        case 201:
            content.innerHTML = '<b>created</b>';
            break;
        case 400:
            content.innerHTML = '<b>bad request</b>';
            break;
        case 404:
            content.innerHTML = '<b>not found quirky gorl</b>';
            break;
        case 401:
            content.innerHTML = '<b>unauthorized .</b>';
            break;
        case 403:
            content.innerHTML = '<b>FORBIDDEN</b>';
            break;
        case 500:
            content.innerHTML = '<b>internal error <3</b>';
            break;
        case 501:
            content.innerHTML = '<b>not implemeneted :)</b>';
            break;
        default:
            content.innerHTML = '<b>we didnt implement this sozzz</b>';
            break;
    }
    console.log(xhr.response);

    if (xhr.response) {
        const obj = xhr.response;
        console.log(obj);

        content.innerHTML += `<p>${obj}</p>`;
    } else {
        content.innerHTML += `<p>there are none/this is probably a HEAD call</p>`;
    }
};

const requestUpdate = (e, totalPage) => {
    console.log("request update called");
    //request stuff, request method and the url (/getUsers, etc)
    const doAction = totalPage.getAttribute('action');
    const doMethod = totalPage.getAttribute('method');

    //non dropdown inputs
    const nameField = document.querySelector('#nameField').value;
    const costField = document.querySelector('#costField').value;
    
    //stuff for images ! i think
    const imageField = document.querySelector("#imageField").src;

    //dropdowns
    const page = document.querySelector('#urlField').value;
    const method = document.querySelector('#methodSelect').value;

    const xhr = new XMLHttpRequest();

    //get user
    if (e.target.id === 'userForm') {
        xhr.open(method, page);

        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onload = () => handleResponse(xhr);

        xhr.send();
        console.log("sent");
    } else if (e.target.id === 'nameForm') {
        xhr.open('POST', '/addUsers');

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Accept', 'application/json');

        //
        console.log(xhr);

        const formData = `name=${nameField}&age=${ageField}`;
        xhr.send(formData);
        console.log("sent");
        xhr.onload = () => handleResponse(xhr);
    }

    e.preventDefault();
    //prevents DOM event bubbling
    return false;
};

const init = () => {
    const totalPage = document.querySelector('#totalPage');
    const addForm = document.querySelector('#addForm');
    const sortForm = document.querySelector('#sortForm');

    console.log("init");
    const getResponses = (e) =>
        requestUpdate(e, totalPage);

    //event listeners for the submit button and add button
    addForm.addEventListener('submit', getResponses);
    sortForm.addEventListener('submit', getResponses);

};

window.onload = init;