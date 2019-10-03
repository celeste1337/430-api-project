"use strict";

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
    const encodingType = totalPage.getAttribute('enctype');

    //non dropdown inputs
    const nameField = document.querySelector('#nameField').value;
    const costField = document.querySelector('#costField').value;

    //stuff for images ! i think
    const imageData = document.querySelector("#image-input").files[0];
    console.log(imageData);
    

    //dropdown for sorting
    const sortBy = document.querySelector('#sortBy').value;

    //dropdown for initial picking category
    const selectCategory = document.querySelector('#selectCategory').value;

    const xhr = new XMLHttpRequest();

    xhr.open(doAction, doMethod);

    xhr.setRequestHeader('Content-type', encodingType);
    xhr.setRequestHeader('Accept', 'application/json');

    console.log(xhr);

    //ok do picture stuff like in here somehow . good luck
    if(doMethod === "post") {
        const formData = `name=${nameField}&cost=${costField}&category=${selectCategory}`;
        console.log(imageData);
        xhr.send(formData, imageData);
    }
    else {
        xhr.send();
    }
    
    console.log("sent");
    xhr.onload = () => handleResponse(xhr);


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