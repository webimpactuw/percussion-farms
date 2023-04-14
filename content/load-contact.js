const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init);

function init() {
    let start_e = 23;
    let img_start = 51;
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                sheet_data = JSON.parse(rep)["values"];
                if (sheet_data != undefined) {
                    // Load text
                    for (let i = start_e; i < start_e + 2; i++) {
                        document.getElementById(`t${i}`).innerHTML = sheet_data[i][1];
                        document.getElementById(`d${i}`).innerHTML = sheet_data[i][3];
                    }

                    // Load images
                    document.getElementById('img-25').src = sheet_data[img_start][3];
                    document.getElementById('img-25').alt = sheet_data[img_start][1];
                }
            })
    } catch (err) {
        console.log(err);
        document.body.remove();
        alert("Error loading page!");
    }
}
