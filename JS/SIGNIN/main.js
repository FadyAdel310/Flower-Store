function containLtr (str) {
    let check = false;
    let strgx = /[a-z|A-Z|^\s]/ig;
    for (let i = 0 ; i < str.length ; i++) {
        if (strgx.test(str[i])){
            check = true;
        }
    }
    return check;
}
function containNum(str) {
    let check = false;
    let strgx = /[0-9]/ig;
    for (let i = 0 ; i < str.length ; i++) {
        if (strgx.test(str[i])){
            check = true;
        }
    }
    return check;
}

let emailInput = document.querySelector('.sign-in form input.email');
let passwordInput = document.querySelector('.sign-in form input.password');
let inputsArr = [emailInput,passwordInput];
let submitBtn = document.querySelector('.sign-in form input.submit');
let myForm = document.querySelector('.sign-in form');

submitBtn.addEventListener('click', (e) => {
    inputsArr.forEach ( (input) => {
        input.parentElement.classList.add('active');
        let validIcon = document.querySelector('.sign-in form div.active span.valid');
        let notValidIcon = document.querySelector('.sign-in form div.active span.invalid');
        let icons = [validIcon,notValidIcon];
        icons.forEach((icon) => {icon.classList.remove('active')});
        input.parentElement.classList.remove('active');
    });
    e.preventDefault();
    if ( fullValidation() ){
        let myRequest = new XMLHttpRequest();
        myRequest.open("GET", "./emails.json");
        myRequest.send();
        let dataObj;
        let myPromise = new Promise((res,rej) => {
            myRequest.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200 ) {
                    dataObj = JSON.parse(this.responseText);
                    let exist = false;
                    for (let i = 0 ; i < dataObj.length ; i++) {
                        if (emailInput.value.toUpperCase() === dataObj[i]['mail'].toUpperCase()) {
                            exist = true;
                            res(i);
                            break;
                        }
                    }
                    if (exist === false) {
                        rej(false);
                    }
                }
            }
        }).then(
            (mailIndex) => {
                let mail = dataObj[mailIndex]['mail'];
                let pass = dataObj[mailIndex]['pass'];
                if (passwordInput.value === pass) {
                    console.log("== sended ==");
                    myForm.submit()
                }else {
                    passwordInput.parentElement.classList.add('active');
                    let validIcon = document.querySelector('.sign-in form div.active span.valid');
                    let notValidIcon = document.querySelector('.sign-in form div.active span.invalid');
                    let icons = [validIcon,notValidIcon];
                    icons.forEach((icon) => {icon.classList.remove('active')});
                    notValidIcon.classList.add('active');
                    notValidIcon.setAttribute('tooltip','Wrong Password');
                    setTimeout(() => {
                        notValidIcon.classList.add("show");
                        document.addEventListener('click', (e) => {
                            notValidIcon.classList.remove("show");
                        })
                    }, 100);
                    passwordInput.parentElement.classList.remove('active');
                }
            }
        ).catch(
            (rejVal) => {
                emailInput.parentElement.classList.add('active');
                let validIcon = document.querySelector('.sign-in form div.active span.valid');
                let notValidIcon = document.querySelector('.sign-in form div.active span.invalid');
                let icons = [validIcon,notValidIcon];
                icons.forEach((icon) => {icon.classList.remove('active')});
                notValidIcon.classList.add('active');
                notValidIcon.setAttribute('tooltip','this email is NOT Exist');
                setTimeout(() => {
                    notValidIcon.classList.add("show");
                    document.addEventListener('click', (e) => {
                        notValidIcon.classList.remove("show");
                    })
                }, 100);
                emailInput.parentElement.classList.remove('active');
            }
        );
    }
    else{
        console.log('=== validation Error ===');
    }
    
});

function fullValidation () {
    emailInput.parentElement.classList.add('active');
    let validIcon = document.querySelector('.sign-in form div.active span.valid');
    let notValidIcon = document.querySelector('.sign-in form div.active span.invalid');
    let icons = [validIcon,notValidIcon];
    icons.forEach((icon) => {icon.classList.remove('active')});
    
    if (emailInput.value === '') {
        notValidIcon.classList.add('active');
        notValidIcon.setAttribute('tooltip','required');
        setTimeout(() => {
            notValidIcon.classList.add("show");
            document.addEventListener('click', (e) => {
                notValidIcon.classList.remove("show");
            })
        }, 100);
        emailInput.parentElement.classList.remove('active');
        return false;
    }
    else {
        let emailrgx = /^([a-zA-Z]){1}\w{2,}@([a-zA-Z]){2,8}\.([a-zA-Z]){2,5}/ig;
        if (emailrgx.test(emailInput.value)) {
            emailInput.parentElement.classList.remove('active');
            if (passwordInput.value === '') {
                passwordInput.parentElement.classList.add('active');
                let validIcon = document.querySelector('.sign-in form div.active span.valid');
                let notValidIcon = document.querySelector('.sign-in form div.active span.invalid');
                let icons = [validIcon,notValidIcon];
                icons.forEach((icon) => {icon.classList.remove('active')});
                notValidIcon.classList.add('active');
                notValidIcon.setAttribute('tooltip','required');
                setTimeout(() => {
                    notValidIcon.classList.add("show");
                    document.addEventListener('click', (e) => {
                        notValidIcon.classList.remove("show");
                    })
                }, 100);
                passwordInput.parentElement.classList.remove('active');
                return false;
            }else {
                return true;
            }
        }
        else {
            notValidIcon.classList.add('active');
            notValidIcon.setAttribute('tooltip','invalid Email');
            setTimeout(() => {
                notValidIcon.classList.add("show");
                document.addEventListener('click', (e) => {
                    notValidIcon.classList.remove("show");
                })
            }, 100);
            emailInput.parentElement.classList.remove('active');
            return false;
        }
    }
}

inputsArr.forEach ( (input) => {
    input.addEventListener('input', (ev) => {
        input.parentElement.classList.add('active');
        let validIcon = document.querySelector('.sign-in form div.active span.valid');
        let notValidIcon = document.querySelector('.sign-in form div.active span.invalid');
        let icons = [validIcon,notValidIcon];
        icons.forEach((icon) => {icon.classList.remove('active')});
        input.parentElement.classList.remove('active');
    })
});
