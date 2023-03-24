const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                if (JSON.parse(rep)["values"] != undefined) {
                    document.getElementById(`t7`).innerHTML = JSON.parse(rep)["values"][7][1];
                    document.getElementById(`s7`).innerHTML = JSON.parse(rep)["values"][7][2];
                    document.getElementById(`d7`).innerHTML = JSON.parse(rep)["values"][7][3];
                    for (let i = 8; i <= 10; i ++) {
                        if (JSON.parse(rep)["values"][i][1] != null) {
                            document.getElementById(`t${i}`).innerHTML = JSON.parse(rep)["values"][i][1];
                            document.getElementById(`s${i}`).innerHTML = JSON.parse(rep)["values"][i][2];
                            document.getElementById(`d${i}`).innerHTML = JSON.parse(rep)["values"][i][3];
                            document.getElementById(`mem${i}`).style.height = 'auto';
                        } else {
                            document.getElementById(`mem${i}`).style.visibility = 'hidden';
                        }
                    }
                    document.getElementById(`t11`).innerHTML = JSON.parse(rep)["values"][11][1];
                    document.getElementById(`d11`).innerHTML = JSON.parse(rep)["values"][11][3];
                }                        
            })
    } catch (err) {
        console.log(err);
    }
}
