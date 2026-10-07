function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'vi',
        includedLanguages: 'vi,en',
        autoDisplay: false
    }, 'google_translate_element');
}

// Inject styles to completely hide the Google Translate widget and tooltips
const style = document.createElement('style');
style.innerHTML = `
    .goog-te-banner-frame.skiptranslate { display: none !important; }
    body { top: 0px !important; }
    #google_translate_element { opacity: 0 !important; overflow: hidden !important; width: 1px !important; height: 1px !important; position: absolute !important; top: -100px; }
    .goog-tooltip { display: none !important; }
    .goog-tooltip:hover { display: none !important; }
    .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
    /* Giữ nguyên định dạng cho tên riêng */
    .proper-name { font-style: normal; }
`;
document.head.appendChild(style);

function updateProperNames(isEn) {
    const names = document.querySelectorAll('.proper-name');
    names.forEach(el => {
        const vn = el.getAttribute('data-vn');
        if (!vn) return;
        
        if (isEn) {
            // Loại bỏ dấu tiếng Việt (bỏ dấu)
            const en = vn.normalize("NFD")
                         .replace(/[\u0300-\u036f]/g, "")
                         .replace(/đ/g, "d")
                         .replace(/Đ/g, "D");
            el.innerText = en;
        } else {
            el.innerText = vn;
        }
    });
}

// Hàm duyệt cây DOM an toàn để bọc tên riêng
function wrapProperNamesInDOM() {
    const properNames = [
        "Tiếng Dao – Kết nối di sản", "Tiếng Dao", "Dao Quần Chẹt", "Người Dao", 
        "Bàn Vương", "Lễ Cấp sắc", "Quá tăng", "Yên Sơn", "Hợp Nhất", "Hợp Sơn",
        "Đền Thượng", "Đền Trung", "Đền Hạ", "Khu di tích K9 - Đá Chông", 
        "Nhà thờ Đổ", "Lễ hội Tản Viên Sơn Thánh", "Ba Vì", "Sơn Tinh", "Đỉnh Vua"
    ];
    
    // Sort by length descending so "Đền Thượng" matches before "Đền"
    properNames.sort((a, b) => b.length - a.length);

    const regexStr = properNames.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp('(' + regexStr + ')', 'g');

    const walkDOM = (node) => {
        // Skip text inside scripts, styles, or already processed spans
        if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' || (node.nodeType === 1 && node.classList.contains('proper-name'))) {
            return;
        }
        if (node.nodeType === 3) { // Text node
            const text = node.nodeValue;
            if (regex.test(text)) {
                const span = document.createElement('span');
                // Thay thế tên riêng thành HTML span
                span.innerHTML = text.replace(regex, '<span class="notranslate proper-name" data-vn="$1">$1</span>');
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === 1 && node.nodeName !== 'TITLE') { // Element node (skip TITLE to prevent tab issues)
            // Need to copy childNodes to array because replacing child nodes alters the live collection
            Array.from(node.childNodes).forEach(walkDOM);
        }
    };
    
    // Start from main to avoid messing with header/meta tags
    const main = document.querySelector('main');
    if (main) walkDOM(main);
    
    // Also protect the heritage section if outside main
    const heritage = document.getElementById('heritage');
    if (heritage && !main.contains(heritage)) walkDOM(heritage);
}

function changeLanguage(langCode) {
    const selectField = document.querySelector(".goog-te-combo");
    const isEn = langCode === 'en';
    
    // Cập nhật tên riêng trước khi dịch
    updateProperNames(isEn);

    if (selectField) {
        selectField.value = langCode;
        selectField.dispatchEvent(new Event('change'));
        
        // Cố gắng kích hoạt lại lần 2 sau một khoảng thời gian ngắn nếu lần 1 chưa ăn
        setTimeout(() => {
            selectField.dispatchEvent(new Event('change'));
        }, 100);
    } else {
        // Cách dự phòng: Ghi đè Cookie và tải lại trang
        const cookieValue = "/vi/" + langCode;
        document.cookie = "googtrans=" + cookieValue + "; path=/";
        document.cookie = "googtrans=" + cookieValue + "; path=/; domain=" + window.location.hostname;
        
        window.location.reload();
    }
}

function updateActiveLanguageButton() {
    const cookie = document.cookie.match(/(?:^|;)\s*googtrans=([^;]*)/);
    let lang = 'vi'; // default
    if (cookie && cookie[1]) {
        const parts = cookie[1].split('/');
        if (parts.length > 2) {
            lang = parts[2];
        }
    }
    
    const isEn = lang === 'en';
    updateProperNames(isEn);
    
    const vnBtn = document.getElementById('lang-vn');
    const enBtn = document.getElementById('lang-en');
    
    if (vnBtn && enBtn) {
        if (isEn) {
            enBtn.classList.add('active');
            vnBtn.classList.remove('active');
        } else {
            vnBtn.classList.add('active');
            enBtn.classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Add Google Translate Script
    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);

    // Create the hidden element required by Google Translate
    const gtDiv = document.createElement('div');
    gtDiv.id = 'google_translate_element';
    gtDiv.style.opacity = '0';
    gtDiv.style.position = 'absolute';
    gtDiv.style.width = '1px';
    gtDiv.style.height = '1px';
    gtDiv.style.overflow = 'hidden';
    document.body.appendChild(gtDiv);

    // Setup Custom Buttons
    const vnBtn = document.getElementById('lang-vn');
    const enBtn = document.getElementById('lang-en');

    if (vnBtn && enBtn) {
        vnBtn.addEventListener('click', (e) => {
            e.preventDefault();
            changeLanguage('vi');
            vnBtn.classList.add('active');
            enBtn.classList.remove('active');
        });

        enBtn.addEventListener('click', (e) => {
            e.preventDefault();
            changeLanguage('en');
            enBtn.classList.add('active');
            vnBtn.classList.remove('active');
        });
    }

    // Safely wrap proper names before setting up events
    wrapProperNamesInDOM();
    
    // Set active state on load
    updateActiveLanguageButton();
});
