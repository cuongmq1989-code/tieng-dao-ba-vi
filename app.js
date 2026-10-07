/**
 * TIẾNG DAO – KẾT NỐI DI SẢN (BA VÌ DIGITAL)
 * Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll & Mobile Navigation
    const header = document.getElementById('main-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.style.display === 'flex';
            navMenu.style.display = isOpen ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'rgba(15, 18, 23, 0.98)';
            navMenu.style.padding = '1.5rem';
        });
    }

    // 2. Hero Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 6000);
    }

    // 3. Tab switching (Section 3: Kho tư liệu số)
    const repoTabs = document.querySelectorAll('.repo-tabs .tab-btn');
    const repoContents = document.querySelectorAll('.tab-content');

    repoTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            repoTabs.forEach(b => b.classList.remove('active'));
            repoContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.dataset.tab;
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // 4. Tiếng Dao Vocabulary Data & Interactive Search/Filter
    const vocabData = [
        {
            dao: "Muồng tản zang",
            phonetic: "[Muồng tản dang]",
            meaning: "Chào bạn / Chào mọi người",
            category: "chao-hoi",
            example: "Lời chào thân mật khi gặp gỡ người cùng trang lứa hoặc khách đến bản."
        },
        {
            dao: "Ong ba muong sin tzu bu?",
            phonetic: "[Ông bà mường xỉn chù bu?]",
            meaning: "Ông bà có khỏe không ạ?",
            category: "gia-dinh",
            example: "Câu hỏi thăm sức khỏe lễ phép của con cháu dành cho ông bà lớn tuổi."
        },
        {
            dao: "Nhịa diêu tzu",
            phonetic: "[Nhìa diêu chù]",
            meaning: "Ăn cơm / Mời ăn cơm",
            category: "gia-dinh",
            example: "Lời mời dùng bữa ấm cúng trong mâm cơm gia đình người Dao."
        },
        {
            dao: "Toi da hang he lo",
            phonetic: "[Tôi đa hàng hè lo]",
            meaning: "Con đi học về rồi ạ",
            category: "gia-dinh",
            example: "Câu chào thưa gửi của học sinh khi trở về nhà sau buổi học."
        },
        {
            dao: "Pèng Vương",
            phonetic: "[Bàn Vương]",
            meaning: "Thủy tổ Bàn Vương của người Dao",
            category: "phong-tuc",
            example: "Vị thủy tổ thiêng liêng được người Dao tôn kính và thờ phụng trong Lễ Cấp sắc."
        },
        {
            dao: "Qúa tăng",
            phonetic: "[Quá tăng]",
            meaning: "Lễ Cấp sắc (Trưởng thành tâm linh)",
            category: "phong-tuc",
            example: "Đại lễ đánh dấu sự trưởng thành về nhân cách, đạo đức của người đàn ông Dao."
        },
        {
            dao: "Dọi ngàn",
            phonetic: "[Dọi ngàn]",
            meaning: "Lấy thuốc / Bốc thuốc nam",
            category: "cay-thuoc",
            example: "Nghề gia truyền lên rừng già Ba Vì hái lá thảo dược chữa bệnh cứu người."
        },
        {
            dao: "Dèng tảy",
            phonetic: "[Dèng tẩy]",
            meaning: "Cây thuốc tắm thảo dược",
            category: "cay-thuoc",
            example: "Bài thuốc tắm lá đun nước thơm nức giúp hồi phục thể lực và lưu thông khí huyết."
        },
        {
            dao: "Nhiệt, Nẩy, Pủa, Pêi, Ẩm",
            phonetic: "[Nhất, Nhị, Tam, Tứ, Ngũ]",
            meaning: "Một, Hai, Ba, Bốn, Năm (Số đếm)",
            category: "so-dem",
            example: "Hệ thống số đếm cơ bản trong giao tiếp hàng ngày của người Dao Quần Chẹt."
        },
        {
            dao: "Độ, Clang, Háo, Chuống, Chiếp",
            phonetic: "[Lục, Thất, Bát, Cửu, Thập]",
            meaning: "Sáu, Bảy, Tám, Chín, Mười (Số đếm)",
            category: "so-dem",
            example: "Dùng khi đếm số lượng nông sản, vật dụng và ngày tháng."
        },
        {
            dao: "Tziang bu",
            phonetic: "[Chiềng bu]",
            meaning: "Dãy núi / Rừng Ba Vì",
            category: "phong-tuc",
            example: "Rừng núi linh thiêng che chở cho bao thế hệ đồng bào Dao Quần Chẹt."
        },
        {
            dao: "Lồm chui",
            phonetic: "[Lồm chùi]",
            meaning: "Dòng suối trong / Nguồn nước mát",
            category: "phong-tuc",
            example: "Dòng suối nguồn nuôi dưỡng cây cỏ thảo dược và đời sống bản làng."
        }
    ];

    const vocabGrid = document.getElementById('vocab-grid');
    const vocabSearchInput = document.getElementById('vocab-search');
    const filterChips = document.querySelectorAll('.filter-chip');

    const renderVocab = (items) => {
        if (!vocabGrid) return;
        vocabGrid.innerHTML = '';

        if (items.length === 0) {
            vocabGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--muted);">Không tìm thấy từ vựng phù hợp. Hãy thử tìm từ khác!</div>`;
            return;
        }

        items.forEach(v => {
            const card = document.createElement('div');
            card.className = 'vocab-card';
            card.innerHTML = `
                <div class="vocab-header">
                    <div>
                        <div class="vocab-dao">${v.dao}</div>
                        <div class="vocab-phonetic">${v.phonetic}</div>
                    </div>
                    <button class="vocab-audio-btn" title="Nghe phát âm" data-phrase="${v.dao}">
                        🔊
                    </button>
                </div>
                <div class="vocab-meaning">${v.meaning}</div>
                <div class="vocab-example">${v.example}</div>
            `;
            vocabGrid.appendChild(card);
        });

        // Add TTS speech synthesis to pronunciation buttons
        document.querySelectorAll('.vocab-audio-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const phrase = btn.dataset.phrase;
                speakPhrase(phrase);
            });
        });
    };

    const speakPhrase = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'vi-VN';
            utterance.rate = 0.85;
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Trình duyệt của bạn chưa hỗ trợ phát âm tự động.');
        }
    };

    if (vocabGrid) {
        renderVocab(vocabData);

        let currentCategory = 'all';

        const filterAndSearch = () => {
            const query = (vocabSearchInput ? vocabSearchInput.value : '').toLowerCase().trim();
            const filtered = vocabData.filter(item => {
                const matchesCat = currentCategory === 'all' || item.category === currentCategory;
                const matchesQuery = item.dao.toLowerCase().includes(query) ||
                                     item.meaning.toLowerCase().includes(query) ||
                                     item.phonetic.toLowerCase().includes(query);
                return matchesCat && matchesQuery;
            });
            renderVocab(filtered);
        };

        if (vocabSearchInput) {
            vocabSearchInput.addEventListener('input', filterAndSearch);
        }

        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                currentCategory = chip.dataset.category;
                filterAndSearch();
            });
        });
    }

    // 5. GÓC TRẢI NGHIỆM (T3 - TRẢI NGHIỆM) Logic
    const journalGrid = document.getElementById('journal-grid');
    const openJournalModalBtn = document.getElementById('open-journal-modal');
    const journalModal = document.getElementById('journal-modal');
    const closeJournalModalBtn = document.getElementById('close-journal-modal');
    const journalForm = document.getElementById('journal-form');
    const journalImgInput = document.getElementById('journal-img-input');
    const journalImgPreview = document.getElementById('journal-img-preview');

    let journalBase64 = null;

    const defaultJournals = [
        {
            id: 1,
            date: "2026-03-28",
            activity: "Học nhận biết và hái 5 loại lá thuốc nam cổ truyền",
            sharer: "Bà Triệu Thị Hòa (Lương y thôn Yên Sơn)",
            learned: "Em đã học được cách phân biệt cây Chè đắng và cây Khôi nhung trên sườn núi. Bà dặn chỉ hái lá bánh tẻ, không nhổ cả rễ để rừng còn tái sinh.",
            author: "Nguyễn Minh Châu - Lớp 11A1, THPT Ba Vì",
            image: "IMG/Người dao/lang-nghe-thuoc-nam-nguoi-dao-ba-vi-1707-1-1616.jpg"
        },
        {
            id: 2,
            date: "2026-04-05",
            activity: "Nghe ông kể về ý nghĩa 10 lời răn trong Lễ Cấp sắc",
            sharer: "Nghệ nhân Dương Trung Kim (Thôn Hợp Nhất)",
            learned: "Lễ Cấp sắc không chỉ là nghi lễ tâm linh mà là bài học làm người: hiếu thuận với cha mẹ, giữ trọn chữ tín, tương trợ bà con lối xóm.",
            author: "Lý Văn Nam - Lớp 10A2",
            image: "IMG/Người dao/nhipsonghanoi.hanoimoi.com.vn-uploads-images-nguyenmai-2023-04-09-_cap-sac-4-.jpg"
        },
        {
            id: 3,
            date: "2026-05-12",
            activity: "Học từ vựng xưng hô và chào hỏi tiếng Dao Quần Chẹt",
            sharer: "Ông Lý Đức Toàn (Thôn Hợp Sơn)",
            learned: "Học được các câu: 'Ông bà có khỏe không?' (Ong ba muong sin tzu bu?), 'Con đi học về rồi ạ' (Toi da hang he lo). Cả nhà rất vui khi em nói chuyện bằng tiếng Dao.",
            author: "Dương Thị Mai - Lớp 11A3",
            image: "IMG/Người dao/15.jpeg"
        }
    ];

    const renderJournalCards = (data) => {
        journalGrid.innerHTML = '';
        if (!data || data.length === 0) {
            journalGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--muted);">Chưa có nhật ký trải nghiệm nào. Hãy là người đầu tiên chia sẻ!</div>`;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'journal-card';
            card.innerHTML = `
                <img src="${item.image || 'IMG/Người dao/15.jpeg'}" alt="${item.activity}" class="journal-img" onerror="this.src='IMG/Người dao/15.jpeg'">
                <div class="journal-body">
                    <div class="journal-date">📅 ${item.date}</div>
                    <h4>${item.activity}</h4>
                    <div class="journal-sharer">👤 Người hướng dẫn: <strong>${item.sharer}</strong></div>
                    <div class="journal-learned">💡 <em>"${item.learned}"</em></div>
                    <div class="journal-author">✍️ ${item.author}</div>
                </div>
            `;
            journalGrid.appendChild(card);
        });
    };

    const loadJournals = async () => {
        if (!journalGrid) return;
        try {
            const res = await fetch('/api/nhat-ky');
            if (!res.ok) throw new Error('API not available');
            const data = await res.json();
            renderJournalCards(data);
        } catch (error) {
            // Static hosting fallback from localStorage or default
            const localSaved = JSON.parse(localStorage.getItem('dao_journals') || '[]');
            renderJournalCards([...localSaved, ...defaultJournals]);
        }
    };

    if (journalGrid) loadJournals();

    if (openJournalModalBtn && journalModal) {
        openJournalModalBtn.addEventListener('click', () => {
            journalModal.classList.add('active');
        });
    }

    if (closeJournalModalBtn && journalModal) {
        closeJournalModalBtn.addEventListener('click', () => {
            journalModal.classList.remove('active');
        });
    }

    if (journalModal) {
        journalModal.querySelector('.modal-backdrop').addEventListener('click', () => {
            journalModal.classList.remove('active');
        });
    }

    if (journalImgInput) {
        journalImgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                journalBase64 = event.target.result;
                if (journalImgPreview) {
                    journalImgPreview.innerHTML = `<img src="${journalBase64}" style="max-height: 120px; border-radius: 8px; margin-top: 10px; border: 1px solid var(--secondary);">`;
                }
            };
            reader.readAsDataURL(file);
        });
    }

    if (journalForm) {
        journalForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = journalForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang lưu nhật ký...';

            const payload = {
                id: Date.now(),
                date: document.getElementById('jn-date').value || new Date().toISOString().split('T')[0],
                activity: document.getElementById('jn-activity').value,
                sharer: document.getElementById('jn-sharer').value,
                learned: document.getElementById('jn-learned').value,
                author: document.getElementById('jn-author').value,
                image: journalBase64 || "IMG/Người dao/15.jpeg",
                imageBase64: journalBase64
            };

            try {
                const res = await fetch('/api/nhat-ky', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    alert('🎉 Tạo nhật ký trải nghiệm thành công!');
                } else {
                    throw new Error('Fallback to local');
                }
            } catch (error) {
                // Save to localStorage for static host
                const localSaved = JSON.parse(localStorage.getItem('dao_journals') || '[]');
                localSaved.unshift(payload);
                localStorage.setItem('dao_journals', JSON.stringify(localSaved));
                alert('🎉 Tạo nhật ký trải nghiệm thành công!');
            } finally {
                journalForm.reset();
                if (journalImgPreview) journalImgPreview.innerHTML = '';
                journalBase64 = null;
                journalModal.classList.remove('active');
                loadJournals();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Lưu Nhật Ký Trải Nghiệm';
            }
        });
    }

    // 6. BẢN ĐỒ DI SẢN BA VÌ (Leaflet Map)
    const mapElement = document.getElementById('bavi-heritage-map');
    if (mapElement && typeof L !== 'undefined') {
        const map = L.map('bavi-heritage-map').setView([21.0950, 105.3580], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const heritageSpots = [
            {
                id: 'yen-son',
                title: 'Thôn Yên Sơn - Làng nghề Thuốc Nam người Dao',
                coords: [21.0925, 105.3520],
                desc: 'Trung tâm bảo tồn tri thức cây thuốc nam bản địa với hơn 300 loài thảo dược tự nhiên quý hiếm.',
                type: 'Không gian cộng đồng & Nghề truyền thống'
            },
            {
                id: 'hop-nhat',
                title: 'Thôn Hợp Nhất - Không gian Văn hóa & Chữ Nôm Dao',
                coords: [21.1020, 105.3610],
                desc: 'Nơi lưu giữ các thư tịch cổ chữ Nôm Dao, nghệ thuật múa chuông và sinh hoạt văn nghệ cộng đồng.',
                type: 'Không gian truyền dạy'
            },
            {
                id: 'hop-son',
                title: 'Thôn Hợp Sơn - Vườn Thảo Dược & Du Lịch Sinh Thái',
                coords: [21.0880, 105.3680],
                desc: 'Địa điểm tổ chức các hoạt động trải nghiệm thực địa: học hái lá thuốc, dệt chàm thêu hoa văn thổ cẩm.',
                type: 'Điểm trải nghiệm học tập'
            },
            {
                id: 'nha-van-hoa',
                title: 'Nhà Văn Hóa Dân Tộc Dao Ba Vì',
                coords: [21.0965, 105.3550],
                desc: 'Không gian sinh hoạt văn hóa chung, nơi tổ chức các kỳ đại lễ và lớp truyền dạy tiếng Dao cho thanh thiếu niên.',
                type: 'Địa điểm sinh hoạt văn hóa'
            },
            {
                id: 'vqg-bavi',
                title: 'Vườn Quốc Gia Ba Vì - Rừng Thảo Dược Đại Ngàn',
                coords: [21.0833, 105.3667],
                desc: 'Hệ sinh thái rừng nguyên sinh, cái nôi nuôi dưỡng kho tàng thảo dược của người Dao qua hàng trăm năm.',
                type: 'Không gian tự nhiên di sản'
            }
        ];

        const markers = {};

        heritageSpots.forEach(spot => {
            const customMarker = L.marker(spot.coords).addTo(map)
                .bindPopup(`
                    <div style="font-family: inherit; font-size: 0.9rem; line-height: 1.5;">
                        <h4 style="color: #8b1e1e; margin-bottom: 4px; font-weight: 700;">${spot.title}</h4>
                        <p style="color: #4b5563; margin-bottom: 4px;"><strong>Phân loại:</strong> ${spot.type}</p>
                        <p style="color: #374151;">${spot.desc}</p>
                    </div>
                `);
            markers[spot.id] = customMarker;
        });

        // Sidebar list click to pan
        const locationItems = document.querySelectorAll('.map-location-item');
        locationItems.forEach(item => {
            item.addEventListener('click', () => {
                locationItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const spotId = item.dataset.spot;
                const spot = heritageSpots.find(s => s.id === spotId);
                if (spot && markers[spotId]) {
                    map.flyTo(spot.coords, 14, { duration: 1.2 });
                    markers[spotId].openPopup();
                }
            });
        });
    }

    // 7. QR CODE GENERATION & DOWNLOAD
    const qrCards = document.querySelectorAll('.qr-card');
    qrCards.forEach(card => {
        const targetSection = card.dataset.target;
        const qrImg = card.querySelector('.qr-img');
        const downloadBtn = card.querySelector('.btn-download-qr');
        
        // Base URL for linking
        const currentUrl = window.location.origin + window.location.pathname + '#' + targetSection;
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}&color=8b1e1e&bgcolor=ffffff`;
        
        if (qrImg) qrImg.src = qrApiUrl;

        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const a = document.createElement('a');
                a.href = qrApiUrl;
                a.target = '_blank';
                a.download = `QR-${targetSection}.png`;
                a.click();
            });
        }
    });

    // 8. THƯ VIỆN HÌNH ẢNH & ÂM THANH (Filter & Lightbox)
    const mediaFilterBtns = document.querySelectorAll('.media-filter-btn');
    const mediaCards = document.querySelectorAll('.media-item-card');

    mediaFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mediaFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const type = btn.dataset.type;

            mediaCards.forEach(card => {
                if (type === 'all' || card.dataset.type === type) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 9. ĐÓNG GÓP TƯ LIỆU CỘNG ĐỒNG Form Logic
    const contributeForm = document.getElementById('contribute-form');
    const contributeImgInput = document.getElementById('cb-image');
    let contributeBase64 = null;

    if (contributeImgInput) {
        contributeImgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                contributeBase64 = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    if (contributeForm) {
        contributeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('cb-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang gửi tư liệu...';

            const payload = {
                fullName: document.getElementById('cb-name').value,
                phone: document.getElementById('cb-phone').value,
                email: document.getElementById('cb-email').value,
                category: document.getElementById('cb-category').value,
                title: document.getElementById('cb-title').value,
                description: document.getElementById('cb-desc').value,
                permissionAgreed: document.getElementById('cb-permission').checked,
                imageBase64: contributeBase64
            };

            try {
                const res = await fetch('/api/dong-gop', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    const result = await res.json();
                    alert('🎉 ' + result.message);
                } else {
                    throw new Error('Fallback');
                }
            } catch (error) {
                // Static host fallback
                const localContributions = JSON.parse(localStorage.getItem('dao_contributions') || '[]');
                localContributions.unshift(payload);
                localStorage.setItem('dao_contributions', JSON.stringify(localContributions));
                alert('🎉 Cảm ơn bạn đã gửi đóng góp! Nhóm nghiên cứu sẽ liên hệ xác minh và số hóa tư liệu.');
            } finally {
                contributeForm.reset();
                contributeBase64 = null;
                submitBtn.disabled = false;
                submitBtn.textContent = 'Gửi Tư Liệu Đóng Góp';
            }
        });
    }
});
