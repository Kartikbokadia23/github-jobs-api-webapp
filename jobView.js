const params = new URLSearchParams(window.location.search)
var id = params.get('id')

getJobData(id)

function getJobData(jobId){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        getDescription(this.responseText)
        }
    }
    xhttp.open("GET",`https://jobs.github.com/positions/${jobId}.json`,true);
    xhttp.send();
}

function getDescription(data){
    jsonData = JSON.parse(data)
    console.log(jsonData)

    var str = jsonData.how_to_apply.slice(jsonData.how_to_apply.indexOf('http'),jsonData.how_to_apply.indexOf('">'))
    console.log(str)

    document.getElementsByTagName('img')[0].src = jsonData.company_logo
    document.getElementsByClassName('job-view-title')[0].innerHTML = jsonData.company
    document.getElementsByTagName('a')[0].href = jsonData.company_url

    document.getElementsByClassName('job-title')[0].innerHTML = jsonData.title
    document.getElementsByClassName('job-type')[0].innerHTML = jsonData.type
    document.getElementsByClassName('job-location')[0].innerHTML = jsonData.location
    document.getElementsByTagName('a')[1].href = str


    document.getElementsByClassName('description-body')[0].innerHTML += jsonData.description
    document.getElementsByClassName('description-body')[0].innerHTML += jsonData.how_to_apply
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