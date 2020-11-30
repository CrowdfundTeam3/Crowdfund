// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

if (getUserId()) {
    $('#logout-btn').show();
    $('#user-log-in').hide();
    $('#user-sign-up').hide();
}


function getUserId() {
    return localStorage.getItem('userId');
}


function isNullOrWhitespace(input) {
    if (typeof input === 'undefined' || input == null) return true;
    return input.replace(/\s/g, '').length < 1;
}


//The amount of time to delay between automatically cycling an item.
$('#recipeCarousel').carousel({
    interval: 10000
})

$('.carousel .carousel-item').each(function () {
    var minPerSlide = 3;
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});


$('#clicked-category-button ul li a').on('click', (e) => {

    let element = $(e.currentTarget);
    let category = element.html();
    categoryUrl = '/api/project/bycategory/' + category;
    viewProjects(categoryUrl);
});

$('#search-button').on('click', () => {

    let searchterm = $('#search-input').val();
    if (isNullOrWhitespace(searchterm)) {
        searchtermUrl = '/api/project/getall';
    }
    else {
        searchtermUrl = '/api/project/search/' + searchterm;
    }
    viewProjects(searchtermUrl);
});

function viewProjects(input) {
    let title = $('#title').val();
    let description = $('#description').val();
    let photo = $('#photo').val();

    actionUrl = input;
    console.log(actionUrl);

    let requestData = {
        title: title,
        description: description,
        photo: photo
    };
    $.ajax(
        {
            url: actionUrl,
            type: 'GET',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function (projects) {
                $('#project-list').html('');

                for (let i = 0; i < projects.length; i++) {
                    $('#project-list').append(`

                        <div class="card col-9 col-sm-5 col-md-4 col-lg-3 text-center p-0 d-inline-block my-2 mr-sm-2" style="height:400px;">
                            <img class="card-img-top" src="/uploadedimages/${projects[i].photo}" alt="Card image cap" width="286" height="180">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${projects[i].title}
                                </h5>
                                <p class="card-text">
                                    ${projects[i].description}
                                </p>
                                <a class="btn btn-secondary">Details</a>
                            </div>
                        </div>
                `);
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("Error from server: " + errorThrown);
            }
        }
    );
}

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
                localStorage.setItem('userId', data.id)
                window.open("/home", "_self")
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("Error from server: " + errorThrown);
            }
        }
    );
}

$('#login-user').on('click', function () {

    let actionUrl = '/api/user/login';
    let LoginOptions = {
        Email: $('#email2').val(),
        Password: $('#password2').val()
    };

    $.ajax({
        url: actionUrl,
        contentType: 'application/json',
        type: "POST",
        data: JSON.stringify(LoginOptions),
        success: function (data) {
            if (data.id == "0") {
                alert("Login denied");

            } else {
                localStorage.setItem('userId', data.id);
                alert("Correct");
            }
            window.open("/Home/Index", "_self");
            localStorage.setItem('userId', data.id)
            window.open("/", "_self");
        },
        error: function () {
            alert('Login denied');
        }
    });
});

$('#logout-btn').on('click', function () {
    localStorage.removeItem('userId')
    window.open("/", "_self");
});

$('#creator-content').ready(function () {
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
                    percent = Math.round(percent * 10) / 10;
                    projectCards += '<div class="card col-9 col-sm-5 col-md-4 col-lg-3 text-center p-0 d-inline-block my-2 mr-2" style="height:400px;">' +
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


//backer page

$('#backer-content').ready(function () {
    let userId = getUserId();
    $.ajax({
        url: '/api/project/backer/' + userId,
        contentType: 'application/json',
        type: 'GET',
        success: function (data) {
            let projectCards = '';
            if (data == null) {
                $('#js-my-projects2').append('<p>You dont have any projects yet</p>');
            } else {
                data.forEach(project => {
                    percent = 100 * (project.currentFund) / project.goal;
                    percent = Math.round(percent * 10) / 10;
                    projectCards += '<div class="card col-9 col-sm-5 col-md-4 col-lg-3 text-center p-0 d-inline-block my-2 mr-2" style="height:400px;">' +
                        '<img class="card-img-top" height="200" src="/uploadedimages/' + project.photo + '" alt="Card image cap">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + project.title + '</h5>' +
                        '<p class="card-text" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;>"' + project.description + '</p>' +
                        '<p>' + project.currentFund + ' of ' + project.goal + ' funded!</p>' +
                        '<div class="progress">' +
                        '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"></div>' +
                        '</div>' +
                        '<button id="js-go-to-project" onclick="projectDetails(' + project.id + ')" class="col-12 btn btn-dark text=light" style="position:absolute; bottom:0px; left:0px;">Project\'s page</button> ' +
                        '</div> ' +
                        '</div >';
                });
                $('#js-my-projects2').append(projectCards);
            }
        }

    });
});


//Create project
$('#js-create-button').on('click', function () {
    let actionUrl = '/api/project';
    var inputPhoto = document.getElementById('Photo');
    var photoFiles = inputPhoto.files;
    var inputVideo = document.getElementById('Video');
    var videoFiles = inputVideo.files;

    var formData = new FormData();

    for (var i = 0; i != photoFiles.length; i++) {
        formData.append("Photo", photoFiles[0]);
    }
    for (var i = 0; i != videoFiles.length; i++) {
        formData.append("Video", videoFiles[0]);
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
                    '<input class="form-control" type="number" value="' + data.id + '" id="ProjectId">' +
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
            let temp = 100 * (data.currentFund) / data.goal;
            percent = Math.round(temp * 10) / 10;
            console.log(percent);
            $('#creator-content').html('');
            let content = '';

            content += '<div class="container align-items-center mt-3">' +
                '<div class="row">' +
                '<button class="btn btn-info col-md-2 ml-auto mr-2" type="button" data-toggle="modal" data-target="#update-project-modal">' +
                'Edit project </button>' +
                '<button class="btn btn-success col-md-2 mr-2" type="button" data-toggle="modal" data-target="#add-packages-modal">' +
                'Add package</button>' +
                '<button class="btn btn-danger col-md-2" type="button" data-toggle="modal" data-target="#delete-project-modal">' +
                'Delete project </button>' +
                '</div>' +
                '</div>' +
                '<div class=" row mt-5">' +
                '<div id="projectCarousel" class="carousel p-0 slide col-md-6" data-ride="carousel">' +
                '<div class="carousel-inner">' +
                '<div class="carousel-item active" style="height:50vh;">' +
                '<img class="d-block img-fluid w-100 m-auto" style="max-width:100%; height:inherit;"' +
                'src="/uploadedimages/' + data.photo + '" alt="First slide">' +
                '</div>' +
                '<div class="carousel-item" style=" height:50vh;">' +
                '<div class="embed-responsive embed-responsive-16by9" style="max-width:100%; height:inherit;">' +
                '<iframe class="embed-responsive-item" src="/uploadedvideos/' + data.video + '"' +
                'allowfullscreen></iframe>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<a class="carousel-control-prev" href="#projectCarousel" role="button" data-slide="prev">' +
                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                '<span class="sr-only">Previous</span>' +
                '</a>' +
                '<a class="carousel-control-next" href="#projectCarousel" role="button" data-slide="next">' +
                '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span>' +
                '</a>' +
                '</div>' +
                '<div class="col-md-6 border p-3">' +
                '<h3>' + data.title + '</h3>' +
                '<h6>' + data.category + '</h6>' +
                '<p class="mt-3 inline-block">' + data.description + '</p>' +
                '<div>' +
                '<p class="mt-5">This project has been backed <strong>' + data.timesFunded + '</strong> times!</p>' +
                '<p>Status: <strong>' + data.status + '</strong></p>' +
                '<p><strong>' + data.currentFund + '&euro;</strong> of <strong>' + data.goal + '&euro;</strong></p>' +
                '<div class="progress" style="background-color: #aaa;">' +
                '<div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"><strong>' + percent + '%</strong></div>' +
                '</div>' +
                //'<a href="#package-content" class="btn btn-success mt-3">Back this project!</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="package-content" class="row mt-5 justify-content-center">' +
                'this is where packages go' +
                '</div>' +
                '</div>' +
                '<div class="modal fade" id="update-project-modal" tabindex="-1" role="dialog"' +
                ' aria-labelledby="UpdateProjectModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog" role="document">' +
                '<div class="modal-content p-3">' +
                '<div class="modal-header">' +
                '<h5 class="modal-title" id="exampleModalLabel">Edit Project</h5>' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body">' +
                '<form id="js-update-form">' +
                '<div class="form-group row">' +
                '<label for="Title">Title</label>' +
                '<input type="text" class="form-control" id="Title" value="' + data.title + '">' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="Description">Description</label>' +
                '<textarea class="form-control" id="Description" rows="3"' +
                '>' + data.description + '</textarea>' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="Category">Category</label>' +
                '<select class="form-control" id="Category" value="' + data.category + '">' +
                '<option>Technology</option>' +
                '<option>Arts</option>' +
                '<option>Design</option>' +
                '<option>Games</option>' +
                '<option>Music</option>' +
                '</select>' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="Status">Status</label>' +
                '<select class="form-control" id="Status" value="' + data.status + '">' +
                '<option>Design</option>' +
                '<option>In development</option>' +
                '<option>Close to production</option>' +
                '</select>' +
                '</div>' +
                '<div class="form-group div row">' +
                '<label for="example-number-input">Goal</label>' +
                '<input class="form-control" type="number" value="' + data.goal + '" id="Goal">' +
                '</div>' +
                '<input class="d-none form-control" type="number" value="' + data.id + '" id="projectId">' +
                '<input class="d-none form-control" type="text" value="' + data.photo + '" id="projectPhoto">' +
                '<input class="d-none form-control" type="text" value="' + data.video + '" id="projectVideo">' +
                '<div class="text-center">' +
                '<button onclick="updateProject();" type="button" class="btn btn-primary">Update' +
                'Project</button>' +
                '</div>' +
                '</form>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="modal" id="delete-project-modal" tabindex="-1" role="dialog">' +
                '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h5 class="modal-title">Delete project?</h5>' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body text-center">' +
                '<h5 class="card-title">Title:' + data.title + '</h5>' +
                '<p>Status:' + data.status + '</p>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>' +
                '<button type="button" onclick="deleteProject(' + data.id + ');"  class="btn btn-danger">Delete</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="modal" id="add-packages-modal" tabindex="-1" role="dialog">' +
                '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h5 class="modal-title">Add package</h5>' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body p-5">' +
                '<div class="form-group row">' +
                '<label for="Price">Reward</label>' +
                '<input type="text" class="form-control" id="Reward" placeholder="Enter package Reward">' +
                '</div>' +
                '<div class="form-group row">' +
                '<label for="example-number-input">Price</label>' +
                '<input class="form-control" type="number" value="0" id="Price">' +
                '</div>' +
                '<div class="form-group row">' +
                '<input class="form-control d-none" type="number" value="' + data.id + '" id="ProjectId">' +
                '</div>' +
                '<div class="d-flex justify-content-around"> '+
                //'<button id="js-package-create-button" onclick="addAnotherPackage()" type="button" class="btn btn-primary">Add another package</button>' +
                '<button id="js-package-create-finish-button" onclick="stopAdding();" type="button" class="btn btn-success mx-auto" style="position:absolute; bottom:20px; width:70%;">Add</button>'+
                '<div>'+
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            $('#creator-content').append(content);

            getCreatorPackages(data.id);
            $('#change-button').html('');
            $('#change-button').append(' <button  class="col-12 btn btn-danger text=light" style="position:absolute; bottom:0px; left:0px;" data-toggle="modal" data-target="#fundPackageModal" >Remove</button> ');

        }
    });
}

function getCreatorPackages(id) {
    let actionUrl = '/api/package/project/' + id;

    $.ajax({
        url: actionUrl,
        contentType: 'application/json',
        type: "GET",
        success: function (data) {
            $('#package-content').html('');
            let content = '';
            data.forEach(package => {
                content += '<div class="card text-center col-md-3 my-2 mr-2" style="min-height: 200px;">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + package.price + '&euro;</h5>' +
                    '<p class="card-text">' + package.reward + '</p>' +
                    '<div id="change-button">' +
                    '<button onclick="remove(' + package.id + ',' + package.projectId + ',' + package.price + ');" class="col-12 btn btn-danger text=light" style="position:absolute; bottom:0px; left:0px;">Remove</button>' +
                    '</div>' +
                    '</div> ' +
                    '</div >' +
                    '<div class="modal" id="removePackageModal" tabindex="-1" role="dialog">' +
                    '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<h5 class="modal-title">Are you sure?</h5>' +
                    '<button type="button" class="close" onclick="$(removePackageModal).hide()" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '</div>' +
                    '<div id="fund-body" class="modal-body text-center">' +
                    '</div>' +
                    '<div id="fund-footer" class="modal-footer">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            })

            $('#package-content').append(content);
        }
    });
}

function remove(packageId, projectId, packagePrice) {
    $('#fund-body').html('');
    $('#fund-footer').html('');
    $('#fund-body').append(' <p>You are about to delete a package witch costs</p>' +
        '< h5 class= "card-title" > ' + packagePrice + ' & euro;</h5 > ');
    $('#fund-footer').append('<button type="button" class="btn btn-secondary" onclick="$(removePackageModal).hide()">Cancel</button>' +
        '<button type="button" onclick="removePackage(' + packageId + ', ' + projectId + ');"  class="btn btn-danger">Remove package</button>');
    $('#removePackageModal').show();
}

function removePackage(packageId, projectId) {
    $.ajax(
        {
            url: '/api/package/' + packageId,
            contentType: 'application/json',
            type: "DELETE",
            success: function (data) {
                console.log(data);
                $('#removePackageModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                GoToProject(projectId);
            }
        });
}

function deleteProject(projectId) {
    $.ajax(
        {
            url: '/api/project/' + projectId,
            contentType: 'application/json',
            type: "DELETE",
            success: function (data) {
                $('#delete-project-modal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                window.open("/home/creator", "_self");
            }
        });
}

function updateProject() {
    var formData = new FormData();

    console.log($('#projectPhoto').val());
    formData.append("Title", $('#Title').val());
    formData.append("Description", $('#Description').val());
    formData.append("Category", $('#Category').val());
    formData.append("Status", $('#Status').val());
    formData.append("CreatorId", getUserId());
    formData.append("Goal", $('#Goal').val());
    formData.append("Photo", $('#projectPhoto').val());
    formData.append("Video", $('#ProjectVideo').val());
    $.ajax(
        {
            url: '/api/project/' + $('#projectId').val(),
            data: formData,
            processData: false,
            contentType: false,
            type: "PUT",
            success: function (data) {
                $('#update-project-modal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                GoToProject(data.id);
            }
        });
}

function projectDetails(id) {
    let actionUrl = '/api/project/' + id;

    $.ajax({
        url: actionUrl,
        contentType: 'application/json',
        type: "GET",
        success: function (data) {
            let temp = 100 * (data.currentFund) / data.goal;
            percent = Math.round(temp * 10) / 10;
            console.log(percent);
            $('#projects-content').html('');
            $('#project-list').html('');
            let content = '';
            content += '<div class="container align-items-center mt-3">' +
                '<div class=" row mt-5">' +
                '<div id="projectCarousel" class="carousel p-0 slide col-md-6" data-ride="carousel">' +
                '<div class="carousel-inner">' +
                '<div class="carousel-item active" style="height:50vh;">' +
                '<img class="d-block img-fluid w-100 m-auto" style="max-width:100%; height:inherit;"' +
                'src="/uploadedimages/' + data.photo + '" alt="First slide">' +
                '</div>' +
                '<div class="carousel-item" style=" height:50vh;">' +
                '<div class="embed-responsive embed-responsive-16by9" style="max-width:100%; height:inherit;">' +
                '<iframe class="embed-responsive-item" src="/uploadedvideos/' + data.video + '"' +
                'allowfullscreen></iframe>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<a class="carousel-control-prev" href="#projectCarousel" role="button" data-slide="prev">' +
                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                '<span class="sr-only">Previous</span>' +
                '</a>' +
                '<a class="carousel-control-next" href="#projectCarousel" role="button" data-slide="next">' +
                '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span>' +
                '</a>' +
                '</div>' +
                '<div class="col-md-6 border p-3">' +
                '<h3>' + data.title + '</h3>' +
                '<h6>' + data.category + '</h6>' +
                '<p class="mt-3 inline-block">' + data.description + '</p>' +
                '<div>' +
                '<p class="mt-5">This project has been backed <strong>' + data.timesFunded + '</strong> times!</p>' +
                '<p>Status: <strong>' + data.status + '</strong></p>' +
                '<p><strong>' + data.currentFund + '&euro;</strong> of <strong>' + data.goal + '&euro;</strong></p>' +
                '<div class="progress" style="background-color: #aaa;">' +
                '<div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"><strong>' + percent + '%</strong></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="package-content" class="row mt-5 justify-content-center">' +
                'this is where packages go' +
                '</div>' +
                '</div>'
            $('#projects-content').append(content);
            getPackages(data.id);
        }
    });
}


function getPackages(id) {
    let actionUrl = '/api/package/project/' + id;

    $.ajax({
        url: actionUrl,
        contentType: 'application/json',
        type: "GET",
        success: function (data) {
            $('#package-content').html('');
            let content = '';
            data.forEach(package => {
                content += '<div class="card text-center col-md-3 my-2 mr-2" style="min-height: 200px;">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + package.price + '&euro;</h5>' +
                    '<p class="card-text">' + package.reward + '</p>' +
                    '<div id="change-button">' +
                    '<button  onclick="fund(' + package.id + ',' + package.projectId + ',' + package.price +');" class="col-12  btn btn-success text=light" style="position:absolute; bottom:0px; left:0px; ">Buy</button> ' +
                    '</div>' +
                    '</div> ' +
                    '</div >' +
                    '<div class="modal" id="fundPackageModal" tabindex="-1" role="dialog">' +
                    '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<h5 class="modal-title">Are you sure?</h5>' +
                    '<button type="button" class="close" onclick="$(fundPackageModal).hide()" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '</div>' +
                    '<div id="fund-body" class="modal-body text-center">' +
                    '</div>' +
                    '<div id="fund-footer" class="modal-footer">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            })

            $('#package-content').append(content);
        }
    });
}

function fund(packageId, projectId, packagePrice) {
    $('#fund-body').html('');
    $('#fund-footer').html('');
    $('#fund-body').append(' <h5 class= "card-title"> You\'ll be charged ' + packagePrice + ' &euro;</h5> ');
    $('#fund-footer').append('<button type="button" class="btn btn-secondary" onclick="$(fundPackageModal).hide()">Cancel</button>' +
        '<button type="button" onclick="fundPackage(' + packageId + ', ' + projectId + ');"  class="btn btn-success">Get package</button>');
    $('#fundPackageModal').toggle();
}

function fundPackage(id, projectId) {
    let actionUrl = '/api/user/' + getUserId() + '/package/' + id;

    $.ajax({
        url: actionUrl,
        contentType: 'application/json',
        type: "POST",
        success: function (data) {
            projectDetails(projectId);
            $('#fundPackageModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });
}
