function navClick(key) {
    let navLeft = document.querySelector('.nav > .left'),
        navRight = document.querySelector('.nav > .right');
    
    navLeft.querySelector('.active').classList.remove('active');
    navRight.querySelector('.active').classList.remove('active');

    navLeft.querySelector(`span[data-config='${key}']`).classList.add('active');
    navRight.querySelector(`span[data-config='${key}']`).classList.add('active');
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav > .left')) {return;}
    if (!e.target.closest('span[data-config]:not(.active)')) {return;}

    navClick(e.target.closest('span[data-config]').getAttribute('data-config'));
});