# Bài 9 — Mini hệ thống xử lý đơn hàng kết hợp toàn bộ kiến thức

## 1. Lựa chọn chuẩn Module
Trong dự án này, tôi chọn sử dụng chuẩn **CommonJS (CJS)** nhất quán cho toàn bộ các module (`require` / `module.exports`).

### Lý do chọn CommonJS:
- **Tính đồng bộ và đơn giản:** Phù hợp hoàn hảo với các mô hình cấu hình khởi tạo đồng bộ như `dotenv` và `events`.
- **Tính tương thích cao:** Hoạt động ổn định trên mọi phiên bản Node.js mà không cần cấu hình thêm trường `"type": "module"` trong `package.json`.
- **Cơ chế Cache Module:** Tối ưu hóa việc nạp các module cấu hình và dịch vụ dùng chung trong toàn bộ ứng dụng Node.js.

---

## 2. Kết quả kiểm chứng Event Loop & setTimeout
Khi chạy lệnh `node index.js`, các dòng log xuất hiện theo đúng trình tự thời gian:
1. Đơn hàng #101 được `created` ngay lập tức.
2. Đơn hàng #102 được `created` sau đó 500ms.
3. Đúng sau khoảng thời gian `PROCESSING_DELAY_MS` (2000ms), sự kiện `processed` của đơn hàng #101 được đẩy vào Macrotask queue qua `setTimeout` và in ra log.
4. Tương tự, đơn hàng #102 được `processed` chính xác sau 2000ms tính từ thời điểm nó được tạo.