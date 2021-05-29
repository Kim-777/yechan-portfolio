'use strict';

// variable
let currentStatus = 0; // 컴퓨터 디스플레이 0, 모바일 1
let currentSection = 0; // 현재 섹션 index로 하는 게 편할듯
let currentProject = null;

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

let currentNav = navItems[currentSection];
currentNav.classList.add('active');


console.log('mainSection[0]', mainSection[0]);

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

const clearCurrentProject = () => {
    currentProject.classList.remove('active');
    currentProject = null;
}

const goToCurrentSection = (currentStatus) => {
    if (currentStatus) {
        setTimeout(() => {
            mainSection[currentSection].scrollIntoView({behavior: 'smooth'});
        }, 300);
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


// event handlers

window.addEventListener('load', () => {
    // console.log(window.innerWidth)
    if(window.innerWidth > 994) {
        currentStatus = 0
    } else {
        currentStatus = 1;
        if(window.pageYOffset > 800) {
            arrowUp.classList.add('visible');
        }
    }


    setIndexHandler();
    indexHandlerChange(currentStatus);
});

window.addEventListener('scroll', () => {
    
    if(!currentStatus) {
        console.log('모바일 창이 아닌 경우 이벤트 X');
        return;
    }

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
        for(let section of sections) {
            console.dir(section.offsetHeight);
        }
        console.dir(document.querySelector('aside'));
    }

    if(currentStatus === tmpStatus) {
        console.log(currentStatus);
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
    // for(let menu of navMenu.children) {
    //     if(menu.classList.contains('active')) {
    //         menu.classList.remove('active');
    //         break;
    //     }
    // }

    event.target.classList.add('active');
    currentNav = event.target;
});

//logoBoxs click event
logoBoxs.map(logobox => {
    logobox.addEventListener('click', () => {
        console.log('dataset-project', logobox.dataset.project);
        currentProject = document.querySelector(`[data-name="${logobox.dataset.project}"]`);
        currentProject.classList.add('active');
    })
})