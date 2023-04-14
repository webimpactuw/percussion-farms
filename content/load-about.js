const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init);
function init() {
    let start_b = 7;
    let img_start = 37;
    let coll_start = 32;
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                let sheet_data = JSON.parse(rep)["values"];
                if (sheet_data != undefined) {
                    // Load text
                    document.getElementById(`t${start_b}`).innerHTML = sheet_data[start_b][1];
                    document.getElementById(`s${start_b}`).innerHTML = sheet_data[start_b][2];
                    document.getElementById(`d${start_b}`).innerHTML = sheet_data[start_b][3];
                    for (let i = start_b + 1; i < start_b + 4; i++) {
                        if (sheet_data[i][1] != null) {
                            document.getElementById(`t${i}`).innerHTML = sheet_data[i][1];
                            document.getElementById(`s${i}`).innerHTML = sheet_data[i][2];
                            document.getElementById(`d${i}`).innerHTML = sheet_data[i][3];
                            document.getElementById(`mem${i}`).style.height = 'auto';
                        } else {
                            document.getElementById(`mem${i}`).style.visibility = 'hidden';
                        }
                    }
                    document.getElementById(`t${start_b + 4}`).innerHTML = sheet_data[start_b + 4][1];
                    document.getElementById(`d${start_b + 4}`).innerHTML = sheet_data[start_b + 4][3];

                    // Load images
                    for (let i = img_start; i < img_start + 3; i++) {
                        if (sheet_data[i][3]) {
                            document.getElementById(`img-${i - img_start + 11}`).src = sheet_data[i][3];
                            document.getElementById(`img-${i - img_start + 11}`).alt = sheet_data[i][1];
                        }
                    }
                    document.getElementById(`img-14`).src = sheet_data[img_start + 3][3];
                    document.getElementById(`img-14`).alt = sheet_data[img_start + 3][1];
                    for (let i = coll_start; i < coll_start + 4; i++) {
                        document.getElementById(`img-${i - coll_start + 6}`).src = sheet_data[i][3];
                        document.getElementById(`img-${i - coll_start + 6}`).alt = sheet_data[i][1];
                    }
                }
            })
    } catch (err) {
        console.log(err);
        document.body.remove();
        alert("Error loading page!");
    }
}
