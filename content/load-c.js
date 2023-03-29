const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init);

function init() {
    let start_c = 12;
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                if (JSON.parse(rep)["values"] != undefined) {
                    document.getElementById(`t${start_c}`).innerHTML = JSON.parse(rep)["values"][start_c][1];
                    document.getElementById(`s${start_c}`).innerHTML = JSON.parse(rep)["values"][start_c][2];
                    document.getElementById(`d${start_c}`).innerHTML = JSON.parse(rep)["values"][start_c][3];
                    for (let i = start_c + 1; i < start_c + 3; i++) {
                        document.getElementById(`t${i}`).innerHTML = JSON.parse(rep)["values"][i][1];
                        document.getElementById(`s${i}`).href = JSON.parse(rep)["values"][i][2];
                        document.getElementById(`d${i}`).innerHTML = JSON.parse(rep)["values"][i][3];
                    }
                    for (let i = start_c + 3; i < start_c + 6; i++) {
                        if (JSON.parse(rep)["values"][i][1] != null) {
                            document.getElementById(`t${i}`).innerHTML = JSON.parse(rep)["values"][i][1];
                            document.getElementById(`s${i}`).innerHTML = JSON.parse(rep)["values"][i][2];
                            document.getElementById(`d${i}`).innerHTML = JSON.parse(rep)["values"][i][3];
                            document.getElementById(`i${i}`).style.height = 'auto';
                        } else {
                            document.getElementById(`i${i}`).style.visibility = 'hidden';
                            document.getElementById(`i${i}`).style.margin = '0';
                        }
                    }
                }                        
            })
    } catch (err) {
        console.log(err);
    }
}
