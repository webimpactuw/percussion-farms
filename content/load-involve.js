const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
const query = encodeURIComponent("Select *");
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + 
    '/values/' + SHEET_NAME + '?alt=json&key=' + API_KEY;
document.addEventListener('DOMContentLoaded', init);

function init() {
    let start_d = 18;
    let img_start = 47;
    try {
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                sheet_data = JSON.parse(rep)["values"];
                if (sheet_data != undefined) {
                    // Load text
                    document.getElementById(`t${start_d}`).innerHTML = sheet_data[start_d][1];
                    document.getElementById(`s${start_d}`).href = sheet_data[start_d][2];
                    document.getElementById(`d${start_d}`).innerHTML = sheet_data[start_d][3];
                    document.getElementById(`t${start_d + 1}`).innerHTML = sheet_data[start_d + 1][1];
                    document.getElementById(`d${start_d + 1}`).innerHTML = sheet_data[start_d + 1][3];
                    for (let i = start_d + 2; i < start_d + 5; i++) {                        
                        if (sheet_data[i][1] != null) {
                            document.getElementById(`t${i}`).innerHTML = sheet_data[i][1];
                            document.getElementById(`d${i}`).innerHTML = sheet_data[i][3];
                            document.getElementById(`ev${i}`).style.height = 'auto';
                        } else {
                            document.getElementById(`ev${i}`).style.margin = '0';
                        }
                    }

                    // Load images
                    for (let i = img_start; i < img_start + 4; i++) {
                        if (sheet_data[i][3]) {
                            document.getElementById(`img-${i - img_start + 21}`).src = sheet_data[i][3];
                            document.getElementById(`img-${i - img_start + 21}`).alt = sheet_data[i][1];
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
