const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Đường dẫn file và thư mục
const CSV_REGISTER_FILE = path.join(__dirname, 'Danh_Sach_Dang_Ky.csv');
const CSV_DONG_GOP_FILE = path.join(__dirname, 'Danh_Sach_Dong_Gop.csv');
const NHAT_KY_FILE = path.join(__dirname, 'nhat_ky.json');
const DONG_GOP_FILE = path.join(__dirname, 'dong_gop.json');
const LUU_NIEM_FILE = path.join(__dirname, 'luu_niem.json');

const NHAT_KY_DIR = path.join(__dirname, 'IMG', 'nhat-ky');
const DONG_GOP_DIR = path.join(__dirname, 'IMG', 'dong-gop');
const LUU_NIEM_DIR = path.join(__dirname, 'IMG', 'luu-niem');

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Đảm bảo thư mục tồn tại
[NHAT_KY_DIR, DONG_GOP_DIR, LUU_NIEM_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Khởi tạo dữ liệu nhật ký mẫu nếu chưa có
if (!fs.existsSync(NHAT_KY_FILE)) {
    const defaultNhatKy = [
        {
            id: 1,
            date: "2026-03-28",
            activity: "Học nhận biết và hái 5 loại lá thuốc nam cổ truyền",
            sharer: "Bà Triệu Thị Hòa (Lương y thôn Yên Sơn)",
            learned: "Em đã học được cách phân biệt cây Chè đắng và cây Khôi nhung trên sườn núi. Bà dặn chỉ hái lá bánh tẻ, không nhổ cả rễ để rừng còn tái sinh.",
            author: "Nguyễn Minh Châu - Lớp 11A1, THPT Ba Vì",
            image: "IMG/Người dao/lang-nghe-thuoc-nam-nguoi-dao-ba-vi-1707-1-1616.jpg",
            timestamp: "28/03/2026 16:30"
        },
        {
            id: 2,
            date: "2026-04-05",
            activity: "Nghe ông kể về ý nghĩa 10 lời răn trong Lễ Cấp sắc",
            sharer: "Nghệ nhân Dương Trung Kim (Thôn Hợp Nhất)",
            learned: "Lễ Cấp sắc không chỉ là nghi lễ tâm linh mà là bài học làm người: hiếu thuận với cha mẹ, giữ trọn chữ tín, tương trợ bà con lối xóm.",
            author: "Lý Văn Nam - Lớp 10A2",
            image: "IMG/Người dao/nhipsonghanoi.hanoimoi.com.vn-uploads-images-nguyenmai-2023-04-09-_cap-sac-4-.jpg",
            timestamp: "05/04/2026 19:45"
        },
        {
            id: 3,
            date: "2026-05-12",
            activity: "Học từ vựng xưng hô và chào hỏi tiếng Dao Quần Chẹt",
            sharer: "Ông Lý Đức Toàn (Thôn Hợp Sơn)",
            learned: "Học được các câu: 'Ông bà có khỏe không?' (Ong ba muong sin tzu bu?), 'Con đi học về rồi ạ' (Toi da hang he lo). Cả nhà rất vui khi em nói chuyện bằng tiếng Dao.",
            author: "Dương Thị Mai - Lớp 11A3",
            image: "IMG/Người dao/15.jpeg",
            timestamp: "12/05/2026 11:20"
        }
    ];
    fs.writeFileSync(NHAT_KY_FILE, JSON.stringify(defaultNhatKy, null, 2), 'utf8');
}

if (!fs.existsSync(DONG_GOP_FILE)) {
    fs.writeFileSync(DONG_GOP_FILE, '[]', 'utf8');
}

if (!fs.existsSync(LUU_NIEM_FILE)) {
    fs.writeFileSync(LUU_NIEM_FILE, '[]', 'utf8');
}

// Serve static files
app.use(express.static(__dirname));

// Function lưu file base64 an toàn
const saveBase64Image = (base64Str, targetDir, prefix) => {
    if (!base64Str) return null;
    const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return null;

    const extension = matches[1].includes('png') ? 'png' : 'jpg';
    const filename = `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}.${extension}`;
    const filePath = path.join(targetDir, filename);
    fs.writeFileSync(filePath, Buffer.from(matches[2], 'base64'));
    return path.relative(__dirname, filePath).replace(/\\/g, '/');
};

// ==========================================
// 1. API GÓC TRẢI NGHIỆM (NHẬT KÝ HỌC TẬP)
// ==========================================
app.get('/api/nhat-ky', (req, res) => {
    try {
        const data = fs.readFileSync(NHAT_KY_FILE, 'utf8');
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        console.error('Lỗi đọc nhật ký:', error);
        res.status(500).json({ error: 'Lỗi tải danh sách nhật ký trải nghiệm.' });
    }
});

app.post('/api/nhat-ky', (req, res) => {
    try {
        const { date, activity, sharer, learned, author, imageBase64 } = req.body;

        if (!activity || !sharer || !learned || !author) {
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin nhật ký trải nghiệm!' });
        }

        let savedImagePath = "IMG/Người dao/hanoimoi.com.vn-uploads-images-phananh-2020-01-21-_tet-nhay-nguoi-dao.jpg";
        if (imageBase64) {
            const saved = saveBase64Image(imageBase64, NHAT_KY_DIR, 'nhatky');
            if (saved) savedImagePath = saved;
        }

        const entries = JSON.parse(fs.readFileSync(NHAT_KY_FILE, 'utf8'));
        const newEntry = {
            id: Date.now(),
            date: date || new Date().toISOString().split('T')[0],
            activity,
            sharer,
            learned,
            author,
            image: savedImagePath,
            timestamp: new Date().toLocaleString('vi-VN')
        };

        entries.unshift(newEntry);
        fs.writeFileSync(NHAT_KY_FILE, JSON.stringify(entries, null, 2), 'utf8');

        res.status(201).json({ message: 'Tạo nhật ký trải nghiệm thành công!', data: newEntry });
    } catch (error) {
        console.error('Lỗi lưu nhật ký:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lưu nhật ký trải nghiệm.' });
    }
});

// ==========================================
// 2. API ĐÓNG GÓP TƯ LIỆU CỘNG ĐỒNG
// ==========================================
app.get('/api/dong-gop', (req, res) => {
    try {
        const data = fs.readFileSync(DONG_GOP_FILE, 'utf8');
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Lỗi tải danh sách đóng góp.' });
    }
});

app.post('/api/dong-gop', (req, res) => {
    try {
        const { fullName, phone, email, category, title, description, permissionAgreed, imageBase64 } = req.body;

        if (!fullName || !phone || !title || !description) {
            return res.status(400).json({ error: 'Vui lòng điền họ tên, số điện thoại, tiêu đề và mô tả tư liệu!' });
        }

        let savedImagePath = null;
        if (imageBase64) {
            savedImagePath = saveBase64Image(imageBase64, DONG_GOP_DIR, 'donggop');
        }

        const timestamp = new Date().toLocaleString('vi-VN');
        const newItem = {
            id: Date.now(),
            fullName,
            phone,
            email: email || '',
            category: category || 'Câu chuyện văn hóa',
            title,
            description,
            permissionAgreed: !!permissionAgreed,
            image: savedImagePath,
            status: 'Chờ duyệt & xác minh',
            timestamp
        };

        // Lưu vào JSON
        const items = JSON.parse(fs.readFileSync(DONG_GOP_FILE, 'utf8'));
        items.unshift(newItem);
        fs.writeFileSync(DONG_GOP_FILE, JSON.stringify(items, null, 2), 'utf8');

        // Ghi dòng vào CSV để theo dõi
        const safeName = `"${fullName.replace(/"/g, '""')}"`;
        const safePhone = `"${phone.replace(/"/g, '""')}"`;
        const safeTitle = `"${title.replace(/"/g, '""')}"`;
        const safeCat = `"${category ? category.replace(/"/g, '""') : 'Khác'}"`;
        const csvLine = `${timestamp},${safeName},${safePhone},${safeCat},${safeTitle},Chờ kiểm tra\n`;

        if (!fs.existsSync(CSV_DONG_GOP_FILE)) {
            const bom = '\uFEFF';
            const headers = 'Thời gian,Họ và tên,Số điện thoại,Phân loại,Tiêu đề,Trạng thái\n';
            fs.writeFileSync(CSV_DONG_GOP_FILE, bom + headers + csvLine, 'utf8');
        } else {
            fs.appendFileSync(CSV_DONG_GOP_FILE, csvLine, 'utf8');
        }

        res.status(201).json({
            message: 'Cảm ơn bạn đã gửi đóng góp! Nhóm nghiên cứu sẽ liên hệ xác minh và số hóa tư liệu.',
            data: newItem
        });
    } catch (error) {
        console.error('Lỗi tiếp nhận đóng góp:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi đóng góp tư liệu.' });
    }
});

// ==========================================
// 3. API ĐĂNG KÝ HƯỚNG DẪN VIÊN / TRẢI NGHIỆM
// ==========================================
app.post('/api/register', (req, res) => {
    try {
        const { fullName, visitorCount, phone } = req.body;
        if (!fullName || !visitorCount || !phone) {
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin.' });
        }

        const timestamp = new Date().toLocaleString('vi-VN');
        const safeName = `"${fullName.replace(/"/g, '""')}"`;
        const safePhone = `"${phone.replace(/"/g, '""')}"`;
        const line = `${timestamp},${safeName},${visitorCount},${safePhone}\n`;

        if (!fs.existsSync(CSV_REGISTER_FILE)) {
            const bom = '\uFEFF';
            const headers = 'Thời gian,Họ tên,Số người,Số điện thoại\n';
            fs.writeFileSync(CSV_REGISTER_FILE, bom + headers + line, 'utf8');
        } else {
            fs.appendFileSync(CSV_REGISTER_FILE, line, 'utf8');
        }

        res.status(200).json({ message: 'Đăng ký kết nối thành công!' });
    } catch (error) {
        console.error('Lỗi khi ghi file:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.' });
    }
});

app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 Dự án "Tiếng Dao – Kết nối di sản" đã khởi động!`);
    console.log(`🌐 Truy cập website tại: http://localhost:${PORT}`);
    console.log(`📄 Quản lý tư liệu đóng góp: ${CSV_DONG_GOP_FILE}`);
    console.log(`=================================================`);
});
