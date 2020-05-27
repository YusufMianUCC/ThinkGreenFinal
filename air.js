
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}


function submit() {
    var error = document.getElementById("error");
    error.style.display = "none";
    var li = document.createElement("li");
    var cityInputValue = document.getElementById("cityInput").value;
    if (cityInputValue===''){
        error.style.display = "block";
        setTimeout(function(){ error.style.display = "none"; }, 5000);
        return;
    }
    let cityName = document.getElementById("city-name");
    cityName.innerHTML = cityInputValue[0].toUpperCase() + cityInputValue.slice(1).toLowerCase();
    const ul = document.getElementById('output');
    const table = document.getElementById('output-table');
    table.style.display = "none";
    for(i = 6; i<table.getElementsByTagName("tr").length; i++){
        table.deleteRow(i);
    }
    ul.innerHTML = "";
    document.getElementById("success").style.display = "none";
    const url = 'http://api.waqi.info/feed/' + cityInputValue + '/?token=' + 'd3ca2eb3a6ed28b2ef18996d1aa4c99c29bb22a8';
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let info = data;
            // console.log(data)
            let li = [];
            // let tr = [];
            // let table = [];
            let pm25 = 0;
            let meas = Object.entries(info.data.iaqi)
            for (i = 0; i < meas.length; i++) {
                // console.log(meas[i])
                li[i] = createNode('li');
                var row = table.insertRow(-1);
                let v = meas[i][1].v;
                let title = meas[i][0].toString();
                var name = row.insertCell(0);
                var val = row.insertCell(1);
                if (v <= 50) {
                    li[i].style.color = "green";
                    val.style.color = "green";
                } else if (v <= 100) {
                    li[i].style.color = "yellow";
                    val.style.color = "yellow";
                } else {
                    li[i].style.color = "red";
                    val.style.color = "red";
                }
                if (title === 'pm25') {
                    pm25 = v;
                }
                name.innerHTML = title;
                val.innerHTML = v;
                li[i].innerHTML = title + ": " + v.toString();
                // append(table, tr);
            }
            // console.log(li);
            let apl = document.getElementById("air-pollution-level");
            apl.innerHTML = pm25;
            let aqs = document.getElementById("air-quality-status");
            let hi = document.getElementById("health-implications");
            let cs = document.getElementById("cautionary-statement");
            var result = createNode('li');
            if (pm25 <= 50) {
                result.innerHTML = "Good Air Quality";
                aqs.innerHTML = "Good Air Quality";
                result.style.color = "green";
                aqs.style.background = "green";
                apl.style.background = "green";
                hi.innerHTML = "Air quality is considered satisfactory, and air pollution poses little or no risk.";
                cs.innerHTML = "None.";
                li.push(result)
            } else if (pm25 <= 100) {
                result.innerHTML = "Moderate Air Quality";
                aqs.innerHTML = "Moderate Air Quality";
                result.style.color = "yellow"
                aqs.style.background = "yellow";
                apl.style.background = "yellow";
                hi.innerHTML = "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
                cs.innerHTML = "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion. ";
                li.push(result)
            } else if (pm25 <= 150) {
                result.innerHTML = "Unhealthy Air Quality for Sensitive Groups";
                aqs = "Unhealthy Air Quality for Sensitive Groups";
                result.style.color = "orange"
                aqs.style.background = "orange";
                apl.style.background = "orange";
                hi.innerHTML = "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
                cs.innerHTML = "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.";
                li.push(result)
            } else if (pm25 <= 200) {
                result.innerHTML = "Unhealthy Air Quality";
                aqs.innerHTML = "Unhealthy Air Quality";
                result.style.color = "tomato"
                aqs.style.background = "tomato";
                apl.style.background = "tomato";
                hi.innerHTML = "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
                cs.innerHTML = "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit outdoor exertion.";
                li.push(result)
            } else if (pm25 <= 300) {
                result.innerHTML = "Very Unhealthy Air Quality";
                aqs.innerHTML = "Very Unhealthy Air Quality";
                result.style.color = "purple"
                aqs.style.background = "purple";
                apl.style.background = "purple";
                hi.innerHTML = "Health alert: everyone may experience more serious health effects.";
                cs.innerHTML = "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.";
                li.push(result)
            } else {
                result.innerHTML = "Hazardous Air Quality";
                aqs.innerHTML = "Hazardous Air Quality";
                result.style.color = "darkred";
                aqs.style.background = "darkred"
                apl.style.background = "darkred"
                hi.innerHTML = "Health warnings of emergency conditions. The entire population is more likely to be affected.";;
                cs.innerHTML = "Everyone should avoid all outdoor exertion.";
                li.push(result)
            }
            // for (i = 0; i < li.length; i++) {
            //     append(ul, li[i]);
            // }
            document.getElementById("success").style.display = "block";
            table.style.display = "block";
            setTimeout(function(){ document.getElementById("success").style.display = "none"; }, 5000);
            return;
        })
        .catch(function (err) {
            console.log(err);
            error.style.display = "block";
            setTimeout(function(){ error.style.display = "none"; }, 5000);
        });
}
