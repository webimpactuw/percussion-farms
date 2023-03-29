const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init);

function init() {
    let start_d = 18;
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                if (JSON.parse(rep)["values"] != undefined) {
                    document.getElementById(`t${start_d}`).innerHTML = JSON.parse(rep)["values"][start_d][1];
                    document.getElementById(`s${start_d}`).href = JSON.parse(rep)["values"][start_d][2];
                    document.getElementById(`d${start_d}`).innerHTML = JSON.parse(rep)["values"][start_d][3];
                    document.getElementById(`t${start_d + 1}`).innerHTML = JSON.parse(rep)["values"][start_d + 1][1];
                    document.getElementById(`d${start_d + 1}`).innerHTML = JSON.parse(rep)["values"][start_d + 1][3];
                    for (let i = start_d + 2; i < start_d + 5; i++) {                        
                        if (JSON.parse(rep)["values"][i][1] != null) {
                            document.getElementById(`t${i}`).innerHTML = JSON.parse(rep)["values"][i][1];
                            document.getElementById(`d${i}`).innerHTML = JSON.parse(rep)["values"][i][3];
                            document.getElementById(`ev${i}`).style.height = 'auto';
                        } else {
                            document.getElementById(`ev${i}`).style.margin = '0';
                        }
                    }
                }
            })
    } catch (err) {
        console.log(err);
    }
}
