


let today = new Date();
today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
let selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
let monthsGerman = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
let weekdayGerman = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const constHolidaysGerman = {"1.1": "Neujahr", "1.5": "Tag der Arbeit",  "3.10": "Tag der Deutschen Einheit", "25.12": "1. Weihnachtstag", "26.12": "2. Weihnachtstag"};
let thisYearHolidays = {};
let vorlage = document.body.querySelector(".calender > table").getElementsByTagName("tr")[1];
let events = { };

reload();

/// Lädt die Komplette Seite neu
function reload(){
    reloadGermanHolidays();
    createCalendar(selectedDate);
    createTitle();
    createInfoBox();
    createEvents();
}

/// Berechnet Alle Feiertage des Jahres
function reloadGermanHolidays(){
    thisYearHolidays = {};
    for (let key in constHolidaysGerman) {
        thisYearHolidays[key] = constHolidaysGerman[key];
    }

    let year = selectedDate.getFullYear();

    let easterSunday = getEastern(year);
    thisYearHolidays[easterSunday.getDate() + "." + (easterSunday.getMonth()+1)] = "Ostersonntag";

    let easterMonday =  new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 1);
    thisYearHolidays[easterMonday.getDate() + "." + (easterMonday.getMonth()+1)] = "Ostermontag";

    let goodFriday =  new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + -2);
    thisYearHolidays[goodFriday.getDate() + "." + (goodFriday.getMonth()+1)] = "Karfreitag";

    let himmelfahrt = new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 39);
    thisYearHolidays[himmelfahrt.getDate() + "." + (himmelfahrt.getMonth()+1)] = "Himmelfahrt";

    let whitsun = new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 49);
    thisYearHolidays[whitsun.getDate() + "." + (whitsun.getMonth()+1)] = "Pfingstsonntag";

    let pfingstmontag = new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 50);
    thisYearHolidays[pfingstmontag.getDate() + "." + (pfingstmontag.getMonth()+1)] = "Pfingstmontag";
}

/// Erzeugt den Kalender
function createCalendar(dateToDraw) {
    let startWochentag = new Date(dateToDraw.getFullYear(), dateToDraw.getMonth(), 1).getDay();
    if(startWochentag == 0) startWochentag = 7;
    startWochentag--;
    let numDays = new Date(dateToDraw.getFullYear(), dateToDraw.getMonth() + 1, 0).getDate();
    let tageVormonat = new Date(dateToDraw.getFullYear(), dateToDraw.getMonth(), 0).getDate();

    let weeksToDraw = Math.ceil((startWochentag-1+numDays)/7);

    let table = document.body.querySelector(".calender > table");
    let wochentage = table.getElementsByTagName("tr")[0];

    while (table.firstChild) {
        table.removeChild(table.lastChild);
    }
    table.appendChild(wochentage);

    let days = [];

    let aktuellerTag = -startWochentag+1;
    for (let week = 0; week < weeksToDraw; week++) {
        let tr = vorlage.cloneNode(true); //Neue Woche
        table.appendChild(tr); //Füge Woche zur Tabelle hinzu

        let kw = tr.getElementsByTagName("td")[0];
        let aktuelleKw = getKw(new Date(dateToDraw.getFullYear(), dateToDraw.getMonth(), week*7-6)); /// -6 weil der 1. Tag des Monats garantiert in der ersten Woche ist und der (2*7)-6 = 8. Tag in der zweiten Woche usw...
        kw.innerHTML = aktuelleKw; // Zahl der KW
       for (let weekday = 1;  weekday < 8; weekday++, aktuellerTag++) { // 1 = Montag - 7 = Sonntag
            let td = document.createElement("td"); // Neuer Tag
            tr.appendChild(td); // Füge Tag zur Woche hinzu

            if(aktuellerTag <= 0 ){
                td.innerHTML = tageVormonat + aktuellerTag;
                td.classList.add("otherMonth");
            } else if(aktuellerTag > numDays){
                td.innerHTML = aktuellerTag - numDays;
                td.classList.add("otherMonth");
            }else { // Es kann nur ein Tag im Aktuellen Monat ausgewählt werden.
                td.innerHTML = aktuellerTag;
                if(aktuellerTag == selectedDate.getDate()) {
                    td.classList.add("selected");
                }
            }
            if(aktuellerTag == today.getDate() &&
               dateToDraw.getMonth() == today.getMonth() &&
               dateToDraw.getFullYear() == today.getFullYear()) {
                td.classList.add("today");
            }
            if (weekday > 5) {
                td.classList.add("weekend");
            }
            if (getHoliday(dateToDraw.getMonth(), aktuellerTag) != null) {
                td.classList.add("holiday");
            }
            td.classList.add("selectable");
            td.setAttribute("onClick", "{selectedDate = new Date(" + dateToDraw.getFullYear() + ", " + dateToDraw.getMonth() + ", " + (aktuellerTag) + "); reload();} ");
        }

    }

    let month = selectedDate.getMonth();
    let year = selectedDate.getFullYear();
    let day = selectedDate.getDate();
    let monthElements = document.querySelector("#chooseMonth > ul").children;
    monthElements[0].setAttribute("onClick", "{selectedDate = new Date(" + year + ", " + (month - 1) + ", "+day+"); reload();} ");
    monthElements[1].innerHTML = monthsGerman[month];
    monthElements[2].setAttribute("onClick", "{selectedDate = new Date(" + year + ", " + (month + 1) + ", "+day+"); reload()} ");
    let yearElements = document.querySelector("#chooseYear > ul").children;
    yearElements[2].setAttribute("onClick", "{selectedDate = new Date(" + (year - 1) + ", " + month + ", "+day+"); reload()} ");
    yearElements[1].innerHTML = year;
    yearElements[0].setAttribute("onClick", "{selectedDate = new Date(" + (year + 1) + ", " + month + ", "+day+"); reload()} ");
}

/// Erzeugt den oberen Bereich der Seite
function createTitle() {
    let header = document.body.querySelector("body > h1");
    header.textContent = "Kalenderblatt vom " + selectedDate.getDate() + ". " + monthsGerman[selectedDate.getMonth()] + " " + selectedDate.getFullYear();
}


/// Erzeugt die Box Mit den Informationen zu dem Tag
function createInfoBox(){
    let infoBox = document.body.querySelector("#info");
    infoBox.innerHTML ="";
    let infoBoxContent = document.createElement("p");
    infoBoxContent.textContent = "Der "+selectedDate.getDate()+"."+(selectedDate.getMonth()+1)+"."+selectedDate.getFullYear()+" ist ein "+getGermanWeekday(selectedDate)+".";
    infoBox.appendChild(infoBoxContent);
    if(getHoliday(selectedDate) != null){
        infoBoxContent = document.createElement("p");
        infoBoxContent.textContent = "Er ist ein Feiertag: "+getHoliday(selectedDate);
        infoBox.appendChild(infoBoxContent);
    }
}

/// Holt die Historischen Ereignisse des Aktuellen Tags aus der Datenbank und Erstellt die Box neu
function createEvents() {

    fetch('events.php/?selectedDate=' + selectedDate.getDate() + "." + (selectedDate.getMonth()+1))
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        events = {};
        for(let i = 0; i < json.length; i++){
            events[json[i][0]] = json[i][1];
        }
        createEventBox();
        return events;
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

/// Erzeugt die Box mit den Historischen Ereignissen
function createEventBox() {
    let history = document.body.querySelector("#history");
    let eventsUl = history.querySelector("ul");
    let eventsTitel = history.querySelector("h3");
    eventsTitel.textContent = "Historische Ereignisse am "+selectedDate.getDate()+". "+monthsGerman[selectedDate.getMonth()];
    while (eventsUl.firstChild) {
        eventsUl.removeChild(eventsUl.lastChild);
    }
    for(key in events){
        let li = document.createElement("li");
        li.innerHTML = events[key];
        eventsUl.appendChild(li);
    }
    if(eventsUl.innerHTML == ""){
        let li = document.createElement("p");
        eventsUl.innerHTML = "Am "+selectedDate.getDate()+"."+(selectedDate.getMonth()+1)+" ist nichts besonderes passiert.";
        eventsUl.appendChild(li);  
    }
}

/// Holt den Deutschen Namen des Wochentags des angegebenen Datums
function getGermanWeekday(date){
    return weekdayGerman[date.getDay()];
}

/// Berechnet die Kalenderwoche des angegebenen Datums
function getKw(date) { 
    let J = date.getFullYear();
    let Mo = 0;
    // ersten Montag im Jahr suchen (leere Schleife):
    while (new Date(J, 0, ++Mo).getDay() != 1);
    Mo = new Date(J, 0, Mo);
    // Millisekunden pro Woche:
    let msWo = 604800000;
    return 1 + Math.ceil((date - Mo) / msWo);
}

function getHoliday(month, day) {
    for (let key in thisYearHolidays) {
        if(key == day+"."+(month+1)){
            return thisYearHolidays[key];
        }
    }
    return null;
}

function getEastern(year){
    let a = year % 19;
    let b = year % 4;
    let c = year % 7;
    let k = Math.floor(year/100);
    let p = Math.floor(k / 3);
    let q = Math.floor(k / 4);
    let m = (15 + k -p - q) % 30;
    let d = (19 * a + m) % 30;
    let n = (4 + k - q) % 7;
    let e = (2 * b + 4 * c + 6 * d + n) % 7;
    let o = 22 + d + e;
    return new Date(year ,2 ,o);
}