'use strict';

// variable
let currentStatus = 0; // 컴퓨터 디스플레이 0, 모바일 1
let currentSection = 0; // 현재 활성화된 section
let currentProject = null;
let heightExceptSections = computeHeightExceptSections();
let sectionsHeight = [];
let prevScrollHeight = heightExceptSections; // mobile scroll event를 위한 변수. 
let nowPointer = window.pageYOffset + parseInt(window.innerHeight/2);

console.log(heightExceptSections);

const sectionIds = ['#index', '#skill', '#project', '#contact'];
const projects = ['disney', 'linkedin', 'amazon'];


const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
const logoBoxs = projects.map(id => document.querySelector(`[data-project="${id}"]`));
console.log('logoBoxs', logoBoxs);
//  DOM
const mainSection = document.querySelectorAll('.main__section');
const navbar = document.querySelector('#navbar');
const navMenu = document.querySelector('.navbar__menu');
const arrowUp = document.querySelector('.arrow-up');
const wrapper = document.querySelector('#wrapper');

let currentNav = navItems[currentSection]; // 현재 선택된 nav
currentNav.classList.add('active');


function computeHeightExceptSections () {

    console.log(document.querySelector('#navbar').offsetHeight);
    console.log(document.querySelector('aside').offsetHeight);
    console.log(parseInt(getComputedStyle(document.querySelector('#wrapper')).paddingTop));
    
    return document.querySelector('#navbar').offsetHeight + document.querySelector('aside').offsetHeight + parseInt(getComputedStyle(document.querySelector('#wrapper')).paddingTop);

}


const clearCurrentProject = () => {
    currentProject.classList.remove('active');
    currentProject = null;
}

const goToCurrentSection = (currentStatus) => {
    if (currentStatus) {
        console.log(mainSection[currentSection]);
        console.log('gotoCurrentMobile')
        setTimeout(() => {
            mainSection[currentSection].scrollIntoView({behavior: 'smooth'});
        }, 400);
    } else {
        console.log(currentSection);
        console.log('????')
        for (let section of sections) {
            if(section === mainSection[currentSection]) {
                console.log(section);
                section.classList.remove('noShow');
            } else {
                section.classList.add('noShow');
            }
        }
    }
}

const mobileIndexHandler = (event) => {
    // console.log('here')
    // console.log(event.target.dataset.link);
    const target = event.target;
    const link = target.dataset.link;

    if(!link) {
        return;
    }

    currentSection = parseInt(target.dataset.index);
    const scrollTo = document.querySelector(link);
    console.log('mobile currentSection', currentSection);
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

function computeSectionsHeight() {

    let prevAllHeight = heightExceptSections;

    for(let section of sections) {
        prevAllHeight += section.offsetHeight;
        sectionsHeight.push(prevAllHeight);
    }

    // console.log(sectionsHeight);
}


// event handlers

window.addEventListener('load', () => {
    console.log('load');
    if(window.innerWidth > 994) {
        currentStatus = 0
    } else {
        currentStatus = 1;
        computeSectionsHeight();
        if(window.pageYOffset > 800) {
            arrowUp.classList.add('visible');
        }
    }


    setIndexHandler();
    indexHandlerChange(currentStatus);
});


let tmpIndex = 0;

function scrollLoop() {

    prevScrollHeight = heightExceptSections;

    if(!currentStatus) {
        console.log('모바일 창이 아닌 경우 이벤트 X');
        return;
    }
    // console.log('currentSection',currentSection)
    nowPointer = window.pageYOffset + parseInt(window.innerHeight/2);

    for(let i = 0; i < currentSection; i++) {
        prevScrollHeight += sections[i].offsetHeight;
        // console.log(`sections[i].offsetHeight ${i}`, sections[i].offsetHeight);
    }

    // console.log(prevScrollHeight);

    if(nowPointer > prevScrollHeight + sections[currentSection].offsetHeight) {
        currentNav.classList.remove('active');
        currentSection++;
        currentNav = navItems[currentSection];
        currentNav.classList.add('active');
    }

    if(nowPointer < prevScrollHeight) {
        if(currentSection === 0) return;
        currentNav.classList.remove('active');
        currentSection--;
        currentNav = navItems[currentSection];
        currentNav.classList.add('active');
    }

    console.log(nowPointer);


    if(window.pageYOffset > 800) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }

}

window.addEventListener('scroll', scrollLoop);


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
        sectionsHeight = [];
        
        heightExceptSections = computeHeightExceptSections()
        console.log(heightExceptSections)

        computeSectionsHeight();
    }

    if(currentStatus === tmpStatus) {
        console.log('currentStatus', currentStatus);
    } else {
        setIndexHandler();
        currentStatus = tmpStatus;
        console.log('currentStatus', currentStatus);
        indexHandlerChange(currentStatus);
        goToCurrentSection(currentStatus);

        if(currentProject) {
            clearCurrentProject();
        }
    }

})

// nav click event
navMenu.addEventListener('click', (event) => {
    if(!event.target.dataset.index) return;

    currentNav.classList.remove('active');

    event.target.classList.add('active');
    currentNav = event.target;
    currentSection = parseInt(event.target.dataset.index);
    console.log(currentSection);
});

//logoBoxs click event
logoBoxs.map(logobox => {
    logobox.addEventListener('click', () => {
        console.log('dataset-project', logobox.dataset.project);
        currentProject = document.querySelector(`[data-name="${logobox.dataset.project}"]`);
        currentProject.classList.add('active');
    })
})