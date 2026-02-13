// 헤더와 푸터를 불러오는 함수
async function loadLayout() {
    try {
        const headerRes = await fetch('inc/header.html');
        const footerRes = await fetch('inc/footer.html');
        
        document.querySelector('.site-header').innerHTML = await headerRes.text();
        document.querySelector('.site-footer').innerHTML = await footerRes.text();

        // 레이아웃이 로드된 후에 메뉴 이벤트 초기화
        initNav();
    } catch (err) {
        console.error('레이아웃을 불러오는데 실패했습니다:', err);
    }
}

// 기존에 작성하신 nav 로직을 이 함수 안에 넣습니다.
function initNav() {
    const siteHeader = document.querySelector('.site-header');
    const mainNav = document.querySelector('.main-nav');
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.getElementById('drawer');
    const drawerClose = document.querySelector('.drawer-close');

    // 오버레이 생성 (중복 생성 방지)
    if (!document.querySelector('.drawer-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'drawer-overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => toggleDrawer(false, drawer, overlay, hamburger));
    }
    const overlay = document.querySelector('.drawer-overlay');

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
    if (hamburger) {
        hamburger.addEventListener('click', () => toggleDrawer(true, drawer, overlay, hamburger));
    }

    if (drawerClose) {
        drawerClose.addEventListener('click', () => toggleDrawer(false, drawer, overlay, hamburger));
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            toggleDrawer(false, drawer, overlay, hamburger);
        }
    });
}

function toggleDrawer(isOpen, drawer, overlay, hamburger) {
    if (!drawer) return;
    if (isOpen) {
        drawer.classList.add('open');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        drawer.classList.remove('open');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

// 실행
loadLayout();