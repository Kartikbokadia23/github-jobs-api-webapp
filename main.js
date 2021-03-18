var container = document.getElementById("card-body");
var page = 0;

// window.onload = (function(){
//     loadfunc()
// })

document.addEventListener("DOMContentLoaded", function(){
    loadfunc()
});

function loadfunc(){
    var description = document.getElementById("search-description").value.trim()
    var location = document.getElementById("search-location").value.trim()
    if(location.includes(" ")){
        location = location.replace(" ", "+");
    }
    var fullTime = document.getElementById("full-time-check").checked
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        container.innerHTML = "";
        document.getElementsByClassName('load')[0].style.display = "flex"
        data_scraper(this.responseText)
        }
    }
    xhttp.open("GET",`https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${fullTime}`,true);
    xhttp.send();
    
}

function data_scraper(data){
    json_data = JSON.parse(data)
    console.log(json_data.length)

    json_data.forEach(entry => {
        var card = document.createElement('div');
        card.classList = 'card';
        const content = `
            <p class = "job-type" id = "${entry.id}">${entry.type}</p>
            <img class = "job-company-logo" src = "${entry.company_logo}">
            <h3 class = "job-title">${entry.title}</h3>
            <p class = "job-company">${entry.company}</p>
            <p class = "job-location">${entry.location}</p>
        `;

        card.innerHTML = content

        card.addEventListener('click', getId);

        container.append(card) 

    });
}

function getId(){
    var jobId = this.getElementsByClassName("job-type")[0].id
    url = `http://127.0.0.1:5500/jobview.html?id=${jobId}`
    location.href = url;
}


if(document.getElementById("search-description").value == "" && document.getElementById("search-location").value == ""){
    document.getElementsByClassName('load')[0].style.display = "none"
}


function load(){
    page+=1;
    var description = document.getElementById("search-description").value.trim()
    var location = document.getElementById("search-location").value.trim()
    if(location.includes(" ")){
        location = location.replace(" ", "+");
    }
    var fullTime = document.getElementById("full-time-check").checked
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        data_scraper(this.responseText)
        }
    }
    xhttp.open("GET",`https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${fullTime}&page=${page}`,true);
    xhttp.send();
}


const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

