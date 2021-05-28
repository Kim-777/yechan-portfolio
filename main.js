'use strict';

// variable
let currentStatus = 0; // 컴퓨터 디스플레이 0, 모바일 1
let currentSection = 0; // 현재 섹션
let navOffsetTop = null;

const sectionIds = ['#index', '#skill', '#project', '#contact'];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

console.log(navItems);
//  DOM
const mainSection = document.querySelectorAll('.main__section');
const navbar = document.querySelector('#navbar');
const navMenu = document.querySelector('.navbar__menu');
const arrowUp = document.querySelector('.arrow-up');
const wrapper = document.querySelector('#wrapper');

console.log(sections);

// const observerOptions = {
//     root: null, // viewport
//     rootMargin: '0px',
//     threshold: 0.3,
// }

// const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if(!entry.isIntersection && entry.intersectionRatio > 0) {
//             const index = sectionIds.indexOf(`#${entry.target.id}`);
//             let selectedIndex = 1;
//             if(entry.boundingClientRect.y < 0) {
//                 selectedIndex = index + 1;
//             } else {
//                 selectedIndex = index - 1;
//             }
//             console.log(selectedIndex);
//             const navItem = navItems[selectedIndex];
//             console.log(navItem);
//             navItems.forEach(nav => nav.classList.remove('active'));

//             navItem.classList.add('active');
//         }
//     })
// }, observerOptions);

// sections.forEach(section => observer.observe(section));

// console.log(navMenu.children);
// for(let menu of navMenu.children) {
//     console.log(menu);
// }

const mobileIndexHandler = (event) => {
    // console.log('here')
    // console.log(event.target.dataset.link);
    const target = event.target;
    const link = target.dataset.link;
    if(!link) {
        return;
    }
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}

const computerIndexHandler = (event) => {
    // console.log('here2');
    if(!event.target.dataset.index) return;
    currentSection = parseInt(event.target.dataset.index);
    for(let section of mainSection) {
        if(section.id === event.target.dataset.link.slice(1)) {
            if(section.classList.contains('noShow')) {
                section.classList.remove('noShow');
            }
        } else {
            if(!section.classList.contains('noShow')) {
                section.classList.add('noShow');
            }
        }
    }
}

const indexHandlerChange = (currentStatus) => {
    if(currentStatus) {
        navMenu.removeEventListener('click', computerIndexHandler);
        navMenu.addEventListener('click', mobileIndexHandler);
    } else {
        navMenu.removeEventListener('click', mobileIndexHandler);
        navMenu.addEventListener('click', computerIndexHandler)
    }
}


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
    // console.log(navOffsetTop);
}

const setNavBackground = () => {
    // console.log('window.pageYOffset', window.pageYOffset, 'navOffsetTop', navOffsetTop);
    if(window.pageYOffset > navOffsetTop) {
        navbar.classList.add('navbar-background');
    } else {
        navbar.classList.remove('navbar-background');
    }
}

// event handlers

window.addEventListener('load', () => {
    // console.log(window.innerWidth)
    if(window.innerWidth > 994) {
        currentStatus = 0
    } else {
        currentStatus = 1;
    }
    setIndexHandler();
    setNavOffsetTop();
    indexHandlerChange(currentStatus);
});
window.addEventListener('scroll', () => {
    setNavBackground();
    if(window.pageYOffset > 800) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
})


arrowUp.addEventListener('click', () => {
    // console.log(window.pageYOffset);
    wrapper.scrollIntoView({behavior: "smooth"});
})




window.addEventListener('resize', () => {
    let tmpStatus;
    if(window.innerWidth > 994) {
        tmpStatus = 0;
    } else {
        tmpStatus = 1;
    }

    if(currentStatus === tmpStatus) {
        console.log(currentStatus);
    } else {
        setIndexHandler();
        currentStatus = tmpStatus;
        console.log('currentStatus', currentStatus);
        indexHandlerChange(currentStatus);
    }

    if(currentStatus) {
        setNavOffsetTop();
    }
})

// nav click event
navMenu.addEventListener('click', (event) => {
    if(!event.target.dataset.index) return;
    for(let menu of navMenu.children) {
        if(menu.classList.contains('active')) {
            menu.classList.remove('active');
            break;
        }
    }

    event.target.classList.add('active');
});