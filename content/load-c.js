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
                    document.getElementById(`t12`).innerHTML = JSON.parse(rep)["values"][12][1];
                    document.getElementById(`s12`).innerHTML = JSON.parse(rep)["values"][12][2];
                    document.getElementById(`d12`).innerHTML = JSON.parse(rep)["values"][12][3];
                    document.getElementById(`t13`).innerHTML = JSON.parse(rep)["values"][13][1];
                    document.getElementById(`s13`).href = JSON.parse(rep)["values"][13][2];
                    document.getElementById(`d13`).innerHTML = JSON.parse(rep)["values"][13][3];
                    document.getElementById(`t14`).innerHTML = JSON.parse(rep)["values"][14][1];
                    document.getElementById(`s14`).href = JSON.parse(rep)["values"][14][2];
                    document.getElementById(`d14`).innerHTML = JSON.parse(rep)["values"][14][3];
                    for (let i = 15; i <= 17; i ++) {
                        if (JSON.parse(rep)["values"][i][1] != null) {
                            console.log('worked '+ i);
                            document.getElementById(`t${i}`).innerHTML = JSON.parse(rep)["values"][i][1];
                            document.getElementById(`s${i}`).innerHTML = JSON.parse(rep)["values"][i][2];
                            document.getElementById(`d${i}`).innerHTML = JSON.parse(rep)["values"][i][3];
                            document.getElementById(`i${i}`).style.height = 'auto';
                        } else {
                            document.getElementById(`i${i}`).style.visibility = 'hidden';
                        }
                    }
                }                        
            })
    } catch (err) {
        console.log(err);
    }
}
