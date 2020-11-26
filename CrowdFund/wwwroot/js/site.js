// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

if (getUserId()) {
    $('#logout-btn').show();
}

function getUserId() {
    return localStorage.getItem('userId');
}

// Events
$('#create-user').on('click', () => {
    addUser()
});

function addUser() {
    let actionUrl = '/api/user';
    let formData = {
        FirstName: $('#firstname').val(),
        LastName: $('#lastname').val(),
        Email: $('#email').val(),
        Password: $('#password').val(),
    };

    $.ajax(
        {
            url: actionUrl,
            data: JSON.stringify(formData),
            contentType: 'application/json',
            type: "POST",
            success: function (data) {
                alert(JSON.stringify(data))
                window.open("/home", "_self")
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("Error from server: " + errorThrown);
            }
        }
    );
}

$('#login-btn').on('click', function () {
    let userEmail = $('#user-email').val();
    let password = $('#user-password').val();

    let loginOptions = {
        email: userEmail,
        password: password
    };

    $.ajax({
        url: '/home/login',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(loginOptions),
        success: function (data) {
            localStorage.setItem('userId', data.userId);
            $('#logout-btn').show();
        },
        error: function () {
            alert('Login denied');
        }
    });
});

$('#logout-btn').on('click', function () {
    localStorage.removeItem('userId');
    $('#logout-btn').hide();
});

$(document).ready(function () {
    let userId = getUserId();
    $.ajax({
        url: '/api/project/bycreatorid/' + userId,
        contentType: 'application/json',
        type: 'GET',
        success: function (data) {
            let projectCards = '';
            if (data == null) {
                $('#js-my-projects').append('<p>You dont have any projects yet</p>');
            } else {
                data.forEach(project => {
                    percent = 100 * (project.currentFund) / project.goal;
                    console.log(percent);
                    console.log(project);
                    projectCards +='<div class="card text-center p-0 d-inline-block my-2 mr-2" style="height:400px; width: 18rem;">' +
                        '<img class="card-img-top" height="200" src="/uploadedimages/' + project.photo + '" alt="Card image cap">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + project.title + '</h5>' +
                        '<p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;>"' + project.description + '</p>' +
                        '<p>' + project.currentFund + ' of ' + project.goal + ' funded!</p>' +
                        '<div class="progress">' +
                        '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"></div>' +
                        '</div>' +
                        '<button id="js-go-to-project" onclick="GoToProject(' + project.id + ')" class="col-12 btn btn-dark text=light" style="position:absolute; bottom:0px; left:0px;">Project\'s page</button> ' +
                        '</div> ' +
                        '</div >';
                });
                $('#js-my-projects').append(projectCards);
            }
        }

    });
});

//Create project
$('#js-create-button').on('click', function () {
    let actionUrl = '/api/project';
    var input = document.getElementById('Photo');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("Photo", files[0]);
    }
    formData.append("Title", $('#Title').val());
    formData.append("Description", $('#Description').val());
    formData.append("Category", $('#Category').val());
    formData.append("Status", $('#Status').val());
    formData.append("CreatorId", getUserId());
    formData.append("Goal", $('#Goal').val());
    $.ajax(
        {
            url: actionUrl,
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                $('#js-create-form').html('');
                let packageForm = '';
                packageForm = '<div class="form-group row">' +
                    '<label for="Price">Reward</label>' +
                    '<input type="text" class="form-control" id="Reward" placeholder="Enter package Reward">' +
                    '</div>' +
                    '<div class="form-group row">' +
                    '<label for="example-number-input">Price</label>' +
                    '<input class="form-control" type="number" value="0" id="Price">' +
                    '</div>' +
                    '<div class="form-group row">' +
                    '<label for="example-number-input">ProjectId</label>' +
                    '<input class="form-control" type="number" value="'+data.id+'" id="ProjectId">' +
                    '</div>' +
                    '<button id="js-package-create-button" onclick="addAnotherPackage();" type="button" class="btn btn-primary ml-auto">Add another package</button>' +
                    '<button id="js-package-create-finish-button" onclick="stopAdding();" type="button" class="btn btn-primary ml-auto">Finish</button>';
                $('#js-create-form').append(packageForm);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("Error from server: " + errorThrown);
            }
        }
    );
});

//Add package to created project
function addAnotherPackage() {
    let projectId = $('#ProjectId').val();
    let actionUrl = '/api/package/project/' + projectId;

    var formData = new FormData();

    formData.append("Price", $('#Price').val());
    formData.append("Reward", $('#Reward').val());
    formData.append("ProjectId", $('#ProjectId').val());

    $.ajax({

        url: actionUrl,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            $('#js-create-form').html('');
            let packageForm = '';
            packageForm = '<div class="form-group row">' +
                '<label for="Price">Reward</label>' +
                '<input type="text" class="form-control" id="Reward" placeholder="Enter package Reward">' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="example-number-input">Price</label>' +
                '<input class="form-control" type="number" value="0" id="Price">' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="example-number-input">ProjectId</label>' +
                '<input class="form-control" type="number" value="' + data.projectId + '" id="ProjectId">' +
                '</div>' +
                '<button id="js-package-create-button" onclick="addAnotherPackage()" type="button" class="btn btn-primary ml-auto">Add another package</button>' +
                '<button id="js-package-create-finish-button" onclick="stopAdding();" type="button" class="btn btn-primary ml-auto">Finish</button>';
            $('#js-create-form').append(packageForm);
        },
        error: function () {
            alert('error');
        }
    });
};

$('#js-package-create-finish-button').on()
//stop adding packages
function stopAdding() {
    let projectId = $('#ProjectId').val();
    let actionUrl = '/api/package/project/' + projectId;

    var formData = new FormData();

    formData.append("Price", $('#Price').val());
    formData.append("Reward", $('#Reward').val());
    formData.append("ProjectId", $('#ProjectId').val());

    $.ajax({

        url: actionUrl,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            $('#create-project-modal').hide();
            window.open("/home/creator", "_self");
        }
    });
};

//Project Page
function GoToProject(id) {
    let actionUrl = '/api/project/' + id;

    $.ajax({
        url: actionUrl,
        contentType: 'application/json',
        type: "GET",
        success: function (data) {
            $('#creator-content').empty();
            let content = '';
            content += '<row class=text-center>' +
                '<h2>Project info for: ' + data.title + '</h4 >' +
                '</row>' +
                '<row class="justify-content-center">' +
                '<div style="width:50%; margin:auto;" >' +
                '<div id="carouselExampleControls"  class="carousel slide justify-content-center" data-ride="carousel">' +
                '  <div class="carousel-inner">' +
                '    <div class="carousel-item active">' +
                '      <img class="d-block w-100 m-auto" style="height:300px;  border-radius:5%;" src="/uploadedimages/' + data.photo + '" alt="First slide">' +
                '    </div>' +
                '<div class="embed-responsive embed-responsive-16by9">' +
                '    <iframe class="embed-responsive-item" src="/uploadedvideos/' + data.video + '" allowfullscreen></iframe>' +
                '</div>' +
                '    <div class="carousel-item">' +
                '      <img class="d-block w-100" style="height:300px;" src="..." alt="Second slide">' +
                '    </div>' +
                '  </div>' +
                '  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">' +
                '    <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                '    <span class="sr-only">Previous</span>' +
                '  </a>' +
                '  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">' +
                '    <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                '    <span class="sr-only">Next</span>' +
                '  </a>' +
                '</div>' +
                '</div>' +
                '</row>' +
                '<row class="mt-2 justify-content-center text-center">' +
                '<p>' +
                '<button class="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseExample"' +
                'aria-expanded="false" aria-controls="collapseExample">' +
                'Edit project' +
                '</button>' +
                '</p>' +
                '<div class="collapse justify-content-center" id="collapseExample">' +
                '<div class="card card-body m-auto w-50">' +
                '<form>' +
                '<div class="form-group row">' +
                '<label for="Title">Title</label>' +
                '<input type="text" class="form-control" id="Title" placeholder="Enter project title">' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="Description">Description</label>' +
                '<textarea class="form-control" id="Description" rows="3"' +
                'placeholder="Enter project description"></textarea>' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="Category">Category</label>' +
                '<select class="form-control" id="Category">' +
                '<option>Technology</option>' +
                '<option>Arts</option>' +
                '<option>Design</option>' +
                '<option>Games</option>' +
                '<option>Music</option>' +
                '</select>' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="Photo">Choose a photo</label>' +
                '<input type="file" class="form-control-file" id="Photo" name="Photo">' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="project-video">Choose a video</label>' +
                '<input type="file" class="form-control-file" id="project-video">' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="Status">Status</label>' +
                '<select class="form-control" id="Status">' +
                '<option>Design</option>' +
                '<option>In development</option>' +
                '<option>Close to production</option>' +
                '</select>' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="example-number-input">Goal</label>' +
                '<input class="form-control" type="number" value="0" id="Goal">' +
                '' +
                '</div>' +
                '<button id="js-create-button" type="button" class="btn btn-primary ml-auto">Publish Project</button>' +
                '</form>' +
                '</div>' +
                '</div>' +
                '</row>';
            $('#creator-content').append(content);
        }

    });
}