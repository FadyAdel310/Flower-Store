function updateScrollColor () {
    if (document.documentElement.style.getPropertyValue('--pink') === '#c87e6b') {
        document.documentElement.style.setProperty('--pinkAlt', '#c87d6ae6')
    }
    if (document.documentElement.style.getPropertyValue('--pink') === '#e91e63') {
        document.documentElement.style.setProperty('--pinkAlt', '#e92063e6')
    }
    if (document.documentElement.style.getPropertyValue('--pink') === '#795548') {
        document.documentElement.style.setProperty('--pinkAlt', '#795649e6')
    }
}

// ===================================

let conneted = false;

// over-lay adjustment height ===========================
function heightAdjust () {
    let overLay = document.querySelector('.over-lay');
    overLay.style.height = `${document.body.offsetHeight}px`;
}
window.addEventListener('load', heightAdjust);
window.addEventListener('resize', heightAdjust);

// mobile links =============================================
let mobIcon = document.querySelector('.header .mob-icon');
let links = document.querySelector('.header .links');
document.addEventListener('click', (event)=>{
    switch (event.target) {
        case mobIcon:
            links.classList.toggle('active');
            mobIcon.classList.toggle('active');
            break;
            default:
                links.classList.remove('active');
                mobIcon.classList.remove('active');
        }
});

// profile icon and bag shop ===================================
let profIcon = document.querySelector('.header .container .icons i.profile');
let bagIcon = document.querySelector('.header .container .icons i.bag');
if (conneted){
    bagIcon.classList.remove('not-active');
}
document.addEventListener('click', (ev)=>{
    if (ev.target == profIcon ) {
        profIcon.classList.toggle('active');
    }else if (ev.target == bagIcon){
        if (conneted){
            bagIcon.classList.toggle('active');
        }else {
            bagIcon.classList.add('not-active')
        }
    }
    else {
        profIcon.classList.remove('active');
        bagIcon.classList.remove('active');
    }
});



// Main setting box =============================================
let settingMain = document.querySelector('.header i.setting-main')
let settingChild = document.querySelector('.header i.setting-child')
let settingBox = document.querySelector('.setting-box')
let closeSettingBox = document.querySelector('.setting-box i.close')
let overShadow = document.querySelector('.over-shadow');
document.addEventListener('click', (ev)=>{
    if (ev.target == settingMain || ev.target == settingChild) {
        settingMain.classList.toggle('active');
        settingBox.classList.toggle('active');
        overShadow.classList.toggle('active');
    }
    if (ev.target == overShadow || ev.target == closeSettingBox) {
        if (settingBox.classList.contains('active')) {
            settingMain.classList.remove('active');
            settingBox.classList.remove('active');
            overShadow.classList.toggle('active');
        }
    }
});

// animation setting box =============================================
let animationBtns = Array.from(document.querySelectorAll('.setting-box .animation button'));
animationBtns.forEach((btn)=>{
    btn.addEventListener('click', (event)=>{
        animationBtns.forEach((btn)=>btn.classList.remove('active'));
        event.target.classList.add('active');
        if (event.target.getAttribute('mode') == 'on'){
            document.documentElement.style.setProperty('--main-transition','0.3s');
            localStorage.setItem('animation', '0.3s');
        }
        else{
            document.documentElement.style.setProperty('--main-transition','0s');
            localStorage.setItem('animation', '0s');
        }
    });
});

if (localStorage.getItem('animation') !== null) {
    let time = localStorage.getItem('animation');
    document.documentElement.style.setProperty('--main-transition',time);
    animationBtns.forEach(btn => btn.classList.remove('active'));
    animationBtns.forEach((btn)=>{
        if (time === '0s') {
            if (btn.getAttribute('mode') === 'off')
                btn.classList.add('active');
        }else {
            if (btn.getAttribute('mode') === 'on')
                btn.classList.add('active');
        }
    });
}


// colors setting box ======================================
let colorsBtns = Array.from(document.querySelectorAll('.setting-box > .color > ul li'))
colorsBtns.forEach((btn)=>{
    btn.style.backgroundColor = btn.getAttribute('Dcolor');
    btn.addEventListener('click', (event) => {
        colorsBtns.forEach((btn)=>btn.classList.remove('active'));
        let color = event.target.getAttribute('Dcolor');
        event.target.classList.add('active');
        document.documentElement.style.setProperty('--pink',color);
        localStorage.setItem('color', color);
        updateScrollColor();
    })
});

if (localStorage.getItem('color') !== null) {
    let color = localStorage.getItem('color');
    document.documentElement.style.setProperty('--pink',color);
    colorsBtns.forEach((btn)=> {
        btn.classList.remove('active');
        if (btn.getAttribute('Dcolor') == color) {
            btn.classList.add('active');
        }
    });
}

updateScrollColor();

// landing paragraph ============================================

let myPs = Array.from(document.querySelectorAll('.landing .container p'));
let additionalP = document.querySelector('.landing .container p.additional');
let moreBtn = document.querySelector('.landing .container button');

moreBtn.addEventListener('click', ()=>{
    myPs.forEach((p) => {
        p.classList.toggle('active');
    });
    if (additionalP.classList.contains('active'))
    moreBtn.textContent = 'read less';
    else
        moreBtn.textContent = 'read more';
    
})


// stats  ============================================

function statsChange () {
    window.onscroll = function () {
        if (window.pageYOffset >= 150) {
            boxs.forEach((box) => box.classList.add('active'));
        }else {
            boxs.forEach((box) => box.classList.remove('active'));
        }
    }
}

let boxs = Array.from(document.querySelectorAll('.stats .box'));

if (window.innerWidth > `${992}`) {
    statsChange();
}else {
    boxs.forEach((box) => box.classList.add('active'));
}

// products  ============================================
let boxes = Array.from(document.querySelectorAll('.products .container .items .item'));
let slider = document.querySelector('.products .container .items');
let sliderBtns = Array.from(document.querySelectorAll('.products .action button'))
let rightBtn = document.querySelector('.products .action button.right');
let leftBtn = document.querySelector('.products .action button.left');

// Loading ================

function productsLoading () {
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET", "./products.json");
    myRequest.send();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200 ) {
            let dataObj = JSON.parse(this.responseText);
            // =============================
            for (let i = 0 ; i < dataObj.length ; i++) {
                let item = document.createElement('div');
                    item.classList.add('item');
                    item.setAttribute("index", `${dataObj[i]['index']}`)
                let myImg = document.createElement('img');
                    myImg.src = `${dataObj[i]['url']}`;
                    myImg.alt = `product-${i+1}`;
                let info = document.createElement('div');
                info.classList.add('info')
                let heading = document.createElement('h4');
                    heading.textContent = `${dataObj[i]['heading']}`;
                    let icon = document.createElement('i');
                    icon.className = 'fa-solid fa-heart' ;
                let p = document.createElement('p');
                    p.textContent = `${dataObj[i]['description']}`;
                let btn = document.createElement('button');
                    btn.textContent = `read more`;
                let fill = document.createElement('section');
                    fill.classList.add('fill');
                heading.appendChild(icon);
                info.appendChild(heading);
                info.appendChild(p);
                info.appendChild(btn);
                item.appendChild(myImg);
                item.appendChild(info);
                item.appendChild(fill);
                slider.appendChild(item);
                // boxes.push(item);
            }
        }
    }
}

productsLoading();

    // control ================

let fullNum = slider.offsetWidth ;
let minNum = 0 ;
let ratio = 0;

function collectData () {
    boxes = Array.from(document.querySelectorAll('.products .container .items .item'));
    minNum = boxes[0].offsetWidth;
    ratio = minNum / fullNum ;
    let multply = 0;
    if (ratio <= 0.25 && ratio >= 0.20) {
        multply = 4;
    }else if (ratio <= 0.333 && ratio >= 0.25) {
        multply = 3;
    }else if (ratio <= 0.5 && ratio >= 0.333) {
        multply = 2;
    }
    else if (ratio <= 1 && ratio >= 0.5) {
        multply = 1;
    }
    let counter = 0;
    let maxCounter = boxes.length - multply;
    controlData(counter,maxCounter);
}
// get data before control =====
window.addEventListener('load', collectData);
window.addEventListener('resize', collectData);

function controlData (counter , maxCounter) {
    rightBtn.addEventListener('click', () => {
        if (counter >= 0 && counter < maxCounter) {
            rightBtn.classList.add('active');
            counter++;
            boxes.forEach((box) => box.style.setProperty('transform', `translateX(calc( ${counter} * ( -100% - 50px ) ))`));
            if (counter >= maxCounter){
                rightBtn.classList.remove('active');
            }
        }else {
            rightBtn.classList.remove('active');
        }
    });
    leftBtn.addEventListener('click', () => {
        if (counter > 0 && counter <= maxCounter) {
            leftBtn.classList.add('active');
            counter--;
            boxes.forEach((box) => box.style.setProperty('transform', `translateX(calc( ${counter} * ( -100% - 50px ) ))`));
            if (counter <= 0){
                leftBtn.classList.remove('active');
            }
        }else {
            leftBtn.classList.remove('active');
        }
    });
    sliderBtns.forEach((btn) => {
        btn.addEventListener('click', ()=>{
            if (counter >= 0 && counter < maxCounter) {
                rightBtn.classList.add('active');
            }if (counter > 0 && counter <= maxCounter) {
                leftBtn.classList.add('active');
            }
        })
    });
}


window.addEventListener('load', productPurshase);

let productGallery = document.querySelector('.product-gallery');
let productGalleryCloseBtn = document.querySelector('.product-gallery .parent i.close');

function productPurshase() {
    let items = Array.from(document.querySelectorAll('.products .container .items .item'));
    items.forEach((item) => {
        item.addEventListener('click', (event) => {
            let myRequest = new XMLHttpRequest();
            let dataObj = {};
            let myProduct = event.target.parentElement;
            let itemIndex = Number(myProduct.getAttribute('index'));
            myRequest.open("GET", "./products.json");
            myRequest.send();
            myRequest.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200 ) {
                    dataObj = JSON.parse(this.responseText);
                    let targetObj = {};
                    dataObj.forEach((obj)=>{
                        if (itemIndex === obj["index"])
                            targetObj = obj;
                    });
                    fillProductGallery(targetObj);
                }
            }
        })
    });
}

function fillProductGallery(targetObj) {
    console.log(targetObj['url']);
    console.log(targetObj['heading']);
    console.log(targetObj['price']);
    let img = document.querySelector('.product-gallery .parent img');
    let title = document.querySelector('.product-gallery .parent .info h1');
    let price = document.querySelector('.product-gallery .parent .info p.price');
    let totalPrice = document.querySelector('.product-gallery .info form .data span.total-price');
    img.setAttribute('src',`${targetObj['url']}`);
    title.textContent = `${targetObj['heading']}`;
    price.textContent = `${targetObj['price']}$`;
    let productIndexInput = document.querySelector('.product-gallery .info form .hidden .indexInput');
    let totalPriceInput = document.querySelector('.product-gallery .info form .hidden .TPInput');
    let priceInput = document.querySelector('.product-gallery .info form .hidden .PInput');
    let quantityInput = document.querySelector('.product-gallery .info form .data select#QTY');
    productIndexInput.value = targetObj['index'];
    priceInput.value = targetObj['price'];
    totalPriceInput.value = targetObj['price']*(Number(quantityInput.value));
    quantityInput.value = 1;
    totalPrice.textContent = price.textContent
    quantityInput.addEventListener('input', () => {
        totalPriceInput.value = targetObj['price']*(Number(quantityInput.value));
        totalPrice.textContent = `${totalPriceInput.value}$`
    });
    productGallery.classList.add('active');
    overShadow.classList.add('active');
}
productGalleryCloseBtn.addEventListener('click', () => {
    productGallery.classList.remove('active');
    overShadow.classList.remove('active');
})


//  video ============================================

let videoBox = document.querySelector('.video .container .vid');
let video = document.querySelector('.video .container .vid video');
let videoImg = document.querySelector('.video .container .vid img');
let videoBtn = document.querySelector('.video .container .vid i');

videoBtn.addEventListener('click', () => {
    videoImg.style.zIndex = -1;
    videoBtn.style.zIndex = -1;
    video.play();
    videoBox.classList.toggle('playing')
})

video.onpause = function () {
    videoImg.style.zIndex = 2;
    videoBtn.style.zIndex = 3;
    videoBox.classList.remove('playing')
}

//  making ============================================

let making_Btns = Array.from(document.querySelectorAll('.making .section .container .info button'));

making_Btns.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        e.target.parentElement.classList.add('activation');
        let mainP = document.querySelector(`.making .section .container .info.activation p.active`);
        let alterP = document.querySelector(`.making .section .container .info.activation p.alter`);
        e.target.classList.toggle('active');
        
        if (e.target.classList.contains('active')) {
            let containerP = document.createElement('p');
            containerP.textContent = mainP.textContent;
            e.target.textContent = 'read less';
            mainP.style.opacity = 0;
            setTimeout(() => {
                mainP.textContent = `${alterP.textContent}`;
                setTimeout(() => {
                    mainP.style.opacity = 1;
                }, 0);
                setTimeout(() => {
                    alterP.textContent = containerP.textContent;
                }, 10);
            }, 100);
        }else{
            let containerP = document.createElement('p');
            containerP.textContent = mainP.textContent;
            e.target.textContent = 'read more';
            mainP.style.opacity = 0;
            setTimeout(() => {
                mainP.textContent = `${alterP.textContent}`
                setTimeout(() => {
                    mainP.style.opacity = 1;
                }, 0);
                setTimeout(() => {
                    alterP.textContent = containerP.textContent;
                }, 10);
            }, 100);
        }
        e.target.parentElement.classList.remove('activation');
    })
})


//  scroll to top ============================================

let scrollBtn = document.querySelector('body > i.scroll');

scrollBtn.addEventListener('click', () => {
    window.scrollTo(0,0);
});

window.addEventListener('scroll', function () {
    if (window.scrollY >= 773) {
        scrollBtn.classList.add('active');
    }else {
        scrollBtn.classList.remove('active');
    }
});


//  subscription ============================================

let submitBtn = document.querySelector('.contact form input[type="submit"]');
let nameInput = document.querySelector('.contact form input.name');
let mailInput = document.querySelector('.contact form input.email');
let messageInput = document.querySelector('.contact form textarea');
let inputs = [nameInput,mailInput,messageInput];
let mailEx = document.querySelector('.contact form div h6');

function notEmptyCreation (input) {
    let div = input.parentElement;
    div.classList.add('active');
    let span = document.querySelector('.contact form div.active span');
    span.classList.add('active');
    div.classList.remove('active');
}
function emptyCreation (input) {
    let div = input.parentElement;
    div.classList.add('active');
    let span = document.querySelector('.contact form div.active span');
    span.classList.remove('active');
    div.classList.remove('active');
}

function emptyChecker () {
    let valid = true;
    inputs.forEach((input) => {
        if (input.value === '') {
            valid = false;
            notEmptyCreation(input);
        }
    });
    return valid;
}

function notValidation () {
    mailEx.classList.remove('active');
}
function validation () {
    let valid = false;
    if (mailInput.value != '') {
        let mailexpr = /^([a-zA-Z]){1}\w{2,}@([a-zA-Z]){2,8}\.([a-zA-Z]){2,5}/ig;
        let mailStr = mailInput.value;
        if (mailexpr.test(mailStr)) {
            valid = true;
            mailEx.classList.remove('active');
        }else {
            valid = false;
            mailEx.classList.add('active');
        }
    }
    return valid;
}

submitBtn.addEventListener('click', (e) => {
    if (emptyChecker() && validation()) {
    }else {
        e.preventDefault();
    }
});

inputs.forEach((input) => {
    input.addEventListener('blur', () => {
        if (input.value === '') {
            notEmptyCreation(input);
            notValidation();
        }else {
            emptyCreation(input);
            validation();
        }
    })
});

