const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init, ['blocking', 'responseHeaders', 'extraHeaders']);

console.log(API_KEY);

function init() {
    let start_a = 1;
    let length_a = 6;
    let img_start = 27;
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                let sheet_data = JSON.parse(rep)["values"];
                if (sheet_data != undefined) {
                    // Load text
                    for (let i = start_a; i < start_a + length_a; i++) {
                        document.getElementById(`t${i}`).innerHTML = sheet_data[i][1];
                        document.getElementById(`d${i}`).innerHTML = sheet_data[i][3];
                    }
                    document.getElementById('s18').href = sheet_data[18][2];

                    // Load images
                    for (let i = img_start; i < img_start + 9; i++) {
                        if (sheet_data[i][3]) {
                            document.getElementById(`img-${i - img_start + 1}`).alt = sheet_data[i][1];
                            document.getElementById(`img-${i - img_start + 1}`).src = sheet_data[i][3];
                        }
                    }
                    // SOON: Check if fresh sheet has an image
                }                        
            })
    } catch (err) {
        console.log(err);
        document.body.remove();
        alert("Error loading page!");
    }
}
