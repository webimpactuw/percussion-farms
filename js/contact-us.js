(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init('IP_OQb5-0fXNXSRKO');
})();

window.onload = function() {
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        // this.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        emailjs.sendForm('service_bph6ztr', 'template_t6gbcim', this)
            .then(function() {
                let ele = document.getElementById("success-message");

                ele.style.display = "block";
                fadeOutEffect("success-message"); 
            }, function(error) {
                console.log('FAILED...', error);
                
            });
            document.getElementById("contact-form").reset();
    });
}

// function temp() {
//     document.getElementById("contact-form").addEventListener("submit", function(event) {
//         event.preventDefault();
//         let ele = document.getElementById("success-message");
//         ele.style.display = "block";
//         fadeOutEffect("success-message");
//         document.getElementById("contact-form").reset();
//     });
// } 

function fadeOutEffect(ID) {
    var fadeTarget = document.getElementById(ID);

    setTimeout(function() {
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);  
            }
        }, 100);
    }, 4000)

    setTimeout(function() {
        document.getElementById(ID).style.display = "none"; 
    }, 5000);

    fadeTarget.style.opacity = 1;
}
