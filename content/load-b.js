const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init);

function init() {
    let start_b = 7;
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                if (JSON.parse(rep)["values"] != undefined) {
                    document.getElementById(`t${start_b}`).innerHTML = JSON.parse(rep)["values"][start_b][1];
                    document.getElementById(`s${start_b}`).innerHTML = JSON.parse(rep)["values"][start_b][2];
                    document.getElementById(`d${start_b}`).innerHTML = JSON.parse(rep)["values"][start_b][3];
                    for (let i = start_b + 1; i < start_b + 4; i++) {
                        if (JSON.parse(rep)["values"][i][1] != null) {
                            document.getElementById(`t${i}`).innerHTML = JSON.parse(rep)["values"][i][1];
                            document.getElementById(`s${i}`).innerHTML = JSON.parse(rep)["values"][i][2];
                            document.getElementById(`d${i}`).innerHTML = JSON.parse(rep)["values"][i][3];
                            document.getElementById(`mem${i}`).style.height = 'auto';
                        } else {
                            document.getElementById(`mem${i}`).style.visibility = 'hidden';
                        }
                    }
                    document.getElementById(`t${start_b + 4}`).innerHTML = JSON.parse(rep)["values"][start_b + 4][1];
                    document.getElementById(`d${start_b + 4}`).innerHTML = JSON.parse(rep)["values"][start_b + 4][3];
                }                        
            })
    } catch (err) {
        console.log(err);
    }
}
