const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init);

function init() {
    let start_e = 23;
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                if (JSON.parse(rep)["values"] != undefined) {
                    for (let i = start_e; i < start_e + 2; i++) {
                        document.getElementById(`t${i}`).innerHTML = JSON.parse(rep)["values"][i][1];
                        document.getElementById(`d${i}`).innerHTML = JSON.parse(rep)["values"][i][3];
                    }
                }
            })
    } catch (err) {
        console.log(err);
        document.body.remove();
        alert("Error loading page!");
    }
}
