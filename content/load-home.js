const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init);

function init() {
    let start_a = 1;
    let length_a = 6;
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                if (JSON.parse(rep)["values"] != undefined) {
                    for (let i = start_a; i < start_a + length_a; i++) {
                        document.getElementById(`t${i}`).innerHTML = JSON.parse(rep)["values"][i][1];
                        document.getElementById(`d${i}`).innerHTML = JSON.parse(rep)["values"][i][3];
                    }
                    document.getElementById('s18').href = JSON.parse(rep)["values"][18][2];
                }                        
            })
    } catch (err) {
        console.log(err);
        document.body.remove();
        alert("Error loading page!");
    }
}
