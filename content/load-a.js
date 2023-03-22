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
                console.log(rep);
                if (JSON.parse(rep)["values"] != undefined) {
                    for (let i = 1; i <= 6; i++) {
                        document.getElementById(`t${i}`).innerHTML = JSON.parse(rep)["values"][i][1];
                        document.getElementById(`d${i}`).innerHTML = JSON.parse(rep)["values"][i][2];
                    }
                }                        
            })
    } catch (err) {
        console.log(err);
    }
}
