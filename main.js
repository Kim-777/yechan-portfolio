'use strict';

// variable
let currentStatus = 0; // 컴퓨터 디스플레이 0, 모바일 1
let currentSection = 1; // 현재 섹션
let navOffsetTop = null;
//  DOM
const mainSection = document.querySelectorAll('.main__section');
const navbar = document.querySelector('#navbar');

// function
const setIndexHandler = () => {
    if(window.innerWidth > 994) {
        currentStatus = 0;
        for(let section of mainSection) {
            if(!section.className.includes('noShow')) {
                section.classList.add('noShow');
            }
        }
        mainSection[currentSection].classList.remove('noShow');
    } else {
        currentStatus = 1;
        for(let section of mainSection) {
            if(section.className.includes('noShow')) {
                section.classList.remove('noShow');
            }
        }        
    }
}

const setNavOffsetTop = () => {
    navOffsetTop = navbar.offsetTop
    console.log(navOffsetTop);
}

const setNavBackground = () => {
    console.log('window.pageYOffset', window.pageYOffset, 'navOffsetTop', navOffsetTop);
    if(window.pageYOffset > navOffsetTop) {
        navbar.classList.add('navbar-background');
    } else {
        navbar.classList.remove('navbar-background');
    }
}

// event handlers

window.addEventListener('load', () => {
    setIndexHandler();
    setNavOffsetTop();
});
window.addEventListener('scroll', () => {
    setNavBackground();
})


let tmpStatus = null;
window.addEventListener('resize', () => {
    if(window.innerWidth > 994) {
        tmpStatus = 0;
    } else {
        tmpStatus = 1;
    }

    if(currentStatus === tmpStatus) {
        // console.log(currentStatus, tmpStatus);
    } else {
        setIndexHandler();
        currentStatus = tmpStatus;
    }

    if(currentStatus) {
        setNavOffsetTop();
    }
})