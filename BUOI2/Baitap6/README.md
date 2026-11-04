# Bài 6 — Dự đoán và kiểm chứng thứ tự Event Loop

## 1. Dự đoán
Thứ tự output dự kiến trước khi chạy:
1. A: Bắt đầu
2. B: Kết thúc đồng bộ
3. nextTick
4. Promise
5. setTimeout
6. setImmediate

---

## 2. Kết quả thực tế
Khi chạy lệnh `node order.js`, output thực tế trả về như sau:
```text
A: Bắt đầu
B: Kết thúc đồng bộ
nextTick
Promise
setTimeout
setImmediate