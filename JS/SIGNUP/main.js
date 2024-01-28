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

let sectionPhone = document.querySelector('.sign-up form .num section');
let nameInput = document.querySelector('.sign-up form input.name');
let emailInput = document.querySelector('.sign-up form input.email');
let phoneInput = document.querySelector('.sign-up form input.phone');
let passwordInput = document.querySelector('.sign-up form input.password');
let inputsArr = [nameInput,emailInput,phoneInput,passwordInput];
let submitBtn = document.querySelector('.sign-up form input.submit');
let form = document.querySelector('.sign-up form');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if ( fullValidation() ) {
            let myRequest = new XMLHttpRequest();
            myRequest.open("GET", "./emails.json");
            myRequest.send();
            let myPromise = new Promise((res,rej) => {
                myRequest.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200 ) {
                        let dataObj = JSON.parse(this.responseText);
                        // =============================
                        for (let i = 0 ; i < dataObj.length ; i++) {
                            if (emailInput.value.toUpperCase() === dataObj[i]['mail'].toUpperCase()) {
                                res(true);
                                break;
                            }if (i === dataObj.length-1) {
                                rej(false);
                            }
                        }
                    }
                }
            }).then(
                (resVal) => {
                    console.log('=== Error Matching ===');
                    emailInput.parentElement.classList.add('active');
                    let validIcon = document.querySelector('.sign-up form div.active span.valid');
                    let notValidIcon = document.querySelector('.sign-up form div.active span.invalid');
                    let icons = [validIcon,notValidIcon];
                    icons.forEach((icon) => {icon.classList.remove('active')});
                    notValidIcon.classList.add('active');
                    notValidIcon.setAttribute('tooltip','this email is already used');
                    setTimeout(() => {
                        notValidIcon.classList.add("show");
                        document.addEventListener('click', (e) => {
                            notValidIcon.classList.remove("show");
                        })
                    }, 100);
                    emailInput.parentElement.classList.remove('active');
                }
            ).catch(()=>{
                console.log("=== sended ====");
                form.submit()
            });
    }
    else{
        console.log('=== Error ===');
    }
});

function fullValidation () {
    let valid = true;
    for (let i = 0 ; i < inputsArr.length ; i++) {
        if (customValidation(inputsArr[i]))
            continue;
        else
            valid = false;
    }
    return valid;
}
function customValidation (input) {
    input.parentElement.classList.add('active');
    let validIcon = document.querySelector('.sign-up form div.active span.valid');
    let notValidIcon = document.querySelector('.sign-up form div.active span.invalid');
    let icons = [validIcon,notValidIcon];
    icons.forEach((icon) => {icon.classList.remove('active')});
    if (input.value === '') {
        notValidIcon.classList.add('active');
        notValidIcon.setAttribute('tooltip','required');
        setTimeout(() => {
            notValidIcon.classList.add("show");
            document.addEventListener('click', (e) => {
                notValidIcon.classList.remove("show");
            })
        }, 100);
        input.parentElement.classList.remove('active');
        return false;
    }
    else {
        if (input === nameInput) {
            if (input.value.length >= 3 && containLtr(input.value)) {
                validIcon.classList.add('active');
                input.parentElement.classList.remove('active');
                return true;
            }else {
                notValidIcon.classList.add('active');
                notValidIcon.setAttribute('tooltip','invalid Name');
                setTimeout(() => {
                    notValidIcon.classList.add("show");
                    document.addEventListener('click', (e) => {
                        notValidIcon.classList.remove("show");
                    })
                }, 100);
                input.parentElement.classList.remove('active');
                return false;
            }
        }
        if (input === emailInput) {
            let emailrgx = /^([a-zA-Z]){1}\w{2,}@([a-zA-Z]){2,8}\.([a-zA-Z]){2,5}/ig;
            if (emailrgx.test(input.value)) {
                validIcon.classList.add('active');
                input.parentElement.classList.remove('active');
                return true;
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
                input.parentElement.classList.remove('active');
                return false;
            }
        }
        if (input === phoneInput) {
            let phonergx = /^([1-9]{1}0)\d{3}(\-|\_|\\|\/)?\d{3}(\-|\_|\\|\/)?\d{4}$/ig;
            if (phonergx.test(input.value)) {
                validIcon.classList.add('active');
                input.parentElement.classList.remove('active');
                return true;
            }else {
                notValidIcon.classList.add('active');
                notValidIcon.setAttribute('tooltip','invalid Phone Number');
                setTimeout(() => {
                    notValidIcon.classList.add("show");
                    document.addEventListener('click', (e) => {
                        notValidIcon.classList.remove("show");
                    })
                }, 100);
                input.parentElement.classList.remove('active');
                return false;
            }
        }
        if (input === passwordInput) {
            if (input.value.length <= 7) {
                notValidIcon.classList.add('active');
                notValidIcon.setAttribute('tooltip','Week password');
                setTimeout(() => {
                    notValidIcon.classList.add("show");
                    document.addEventListener('click', (e) => {
                        notValidIcon.classList.remove("show");
                    })
                }, 100);
                input.parentElement.classList.remove('active');
                return false;
            }
            else{
                if (containLtr(input.value)){
                    if (containNum(input.value)){
                        validIcon.classList.add('active');
                        input.parentElement.classList.remove('active');
                        return true;
                    }else {
                        notValidIcon.classList.add('active');
                        notValidIcon.setAttribute('tooltip','Password Must Contain [0:9]');
                        setTimeout(() => {
                            notValidIcon.classList.add("show");
                            document.addEventListener('click', (e) => {
                                notValidIcon.classList.remove("show");
                            })
                        }, 100);
                        input.parentElement.classList.remove('active');
                        return false;
                    }
                }else {
                    notValidIcon.classList.add('active');
                    notValidIcon.setAttribute('tooltip','Password Must Contain [a-z]');
                    setTimeout(() => {
                        notValidIcon.classList.add("show");
                        document.addEventListener('click', (e) => {
                            notValidIcon.classList.remove("show");
                        })
                    }, 100);
                    input.parentElement.classList.remove('active');
                    return false;
                }
            }
        }
    }
}
inputsArr.forEach ( (input) => {
    input.addEventListener('blur', () => {
        customValidation(input);
    });
});

inputsArr.forEach ( (input) => {
    input.addEventListener('input', (ev) => {
        input.parentElement.classList.add('active');
        let validIcon = document.querySelector('.sign-up form div.active span.valid');
        let notValidIcon = document.querySelector('.sign-up form div.active span.invalid');
        let icons = [validIcon,notValidIcon];
        icons.forEach((icon) => {icon.classList.remove('active')});
        input.parentElement.classList.remove('active');
    });
    input.addEventListener('focus', (ev) => {
        input.parentElement.classList.add('active');
        let validIcon = document.querySelector('.sign-up form div.active span.valid');
        let notValidIcon = document.querySelector('.sign-up form div.active span.invalid');
        let icons = [validIcon,notValidIcon];
        icons.forEach((icon) => {icon.classList.remove('active')});
        input.parentElement.classList.remove('active');
    });
});

phoneInput.addEventListener('keydown', (ev) => {
    if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        ev.preventDefault();
    }
    if (phoneInput.value.length >= 12 ) {
        if (ev.key != "Backspace" && ev.key != "ArrowLeft" && ev.key != "ArrowRight") {
            ev.preventDefault();
        }
    }
})
phoneInput.addEventListener('focus', () => {
    phoneInput.classList.add('focused');
})
phoneInput.addEventListener('blur', () => {
    phoneInput.classList.remove('focused');
})
