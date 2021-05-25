let currentStatus = 0; // 컴퓨터 디스플레이 0, 모바일 1
const mainSection = document.querySelectorAll('.main__section');
let currentSection = 1; // 현재 섹션

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

window.addEventListener('load', setIndexHandler)



let tmpStatus = null;
window.addEventListener('resize', () => {
    if(window.innerWidth > 994) {
        tmpStatus = 0;
    } else {
        tmpStatus = 1;
    }

    if(currentStatus === tmpStatus) {
        console.log(currentStatus, tmpStatus);
    } else {
        setIndexHandler();
        currentStatus = tmpStatus;
    }
})