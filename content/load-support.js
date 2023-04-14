const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init);

function init() {
    let start_c = 12;
    let img_start = 41;
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                let sheet_data = JSON.parse(rep)["values"];
                if (sheet_data != undefined) {
                    // Load text
                    document.getElementById(`t${start_c}`).innerHTML = sheet_data[start_c][1];
                    document.getElementById(`s${start_c}`).innerHTML = sheet_data[start_c][2];
                    document.getElementById(`d${start_c}`).innerHTML = sheet_data[start_c][3];
                    for (let i = start_c + 1; i < start_c + 3; i++) {
                        document.getElementById(`t${i}`).innerHTML = sheet_data[i][1];
                        document.getElementById(`s${i}`).href = sheet_data[i][2];
                        document.getElementById(`d${i}`).innerHTML = sheet_data[i][3];
                    }
                    for (let i = start_c + 3; i < start_c + 6; i++) {
                        if (sheet_data[i][1] != null) {
                            document.getElementById(`t${i}`).innerHTML = sheet_data[i][1];
                            document.getElementById(`s${i}`).innerHTML = sheet_data[i][2];
                            document.getElementById(`d${i}`).innerHTML = sheet_data[i][3];
                            document.getElementById(`i${i}`).style.height = 'auto';
                        } else {
                            document.getElementById(`i${i}`).style.visibility = 'hidden';
                            document.getElementById(`i${i}`).style.margin = '0';
                        }
                    }

                    // Load images
                    for (let i = img_start; i < img_start + 6; i++) {
                        if (sheet_data[i][3]) {
                            document.getElementById(`img-${i - img_start + 15}`).src = sheet_data[i][3];
                            document.getElementById(`img-${i - img_start + 15}`).alt = sheet_data[i][1];
                        }
                    }

                }                        
            })
    } catch (err) {
        console.log(err);
        document.body.remove();
        alert("Error loading page!");
    }
}
