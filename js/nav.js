const siteHeader = document.querySelector('.site-header');
const mainNav = document.querySelector('.main-nav');
const hamburger = document.querySelector('.hamburger');
const drawer = document.getElementById('drawer');
const drawerClose = document.querySelector('.drawer-close');

// 배경 클릭 시 닫기를 위한 오버레이 생성
const overlay = document.createElement('div');
overlay.className = 'drawer-overlay';
document.body.appendChild(overlay);

/* 1. 데스크탑: 메가 드롭다운 */
if (mainNav) {
    mainNav.addEventListener('mouseenter', () => siteHeader.classList.add('mega-open'));
    mainNav.addEventListener('mouseleave', () => siteHeader.classList.remove('mega-open'));
}

/* 2. 스크롤 시 헤더 상태 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
    } else {
        siteHeader.classList.remove('scrolled');
    }
});

/* 3. 모바일 드로어 제어 */
function toggleDrawer(isOpen) {
    if (isOpen) {
        drawer.classList.add('open');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 스크롤 방지
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        drawer.classList.remove('open');
        overlay.style.display = 'none';
        document.body.style.overflow = ''; // 스크롤 복구
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

if (hamburger) {
    hamburger.addEventListener('click', () => toggleDrawer(true));
}

if (drawerClose) {
    drawerClose.addEventListener('click', () => toggleDrawer(false));
}

// 배경(오버레이) 클릭 시 닫기
overlay.addEventListener('click', () => toggleDrawer(false));

// 화면 크기가 커지면 열려있던 모바일 메뉴 강제로 닫기
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        toggleDrawer(false);
    }
});