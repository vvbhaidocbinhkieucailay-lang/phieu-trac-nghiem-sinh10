# Phiếu ôn tập Sinh học 10 · Mã 101

**[Mở phiếu làm bài](https://vvbhaidocbinhkieucailay-lang.github.io/phieu-trac-nghiem-sinh10/)**

Trang ôn tập được lưu trên GitHub Pages. Học sinh có Internet mở link bằng điện thoại hoặc máy tính; máy của giáo viên không cần bật. Không cần đăng nhập GitHub.

## Cấu trúc và chấm điểm

| Phần | Số lượng | Điểm |
|---|---|---|
| A · Một đáp án A–D | 12 câu × 0,25 | 3 |
| B · Đúng–sai | 2 câu, mỗi câu 4 ý × 0,25 | 2 |
| C · Trả lời ngắn | 8 câu × 0,25 | 2 |
| II · Tự luận | 3 câu × 1 | Giáo viên chấm riêng 3 điểm |

Điểm tự động hiển thị **trên 7**, không quy đổi thành điểm trên 10. Phần đúng–sai chấm từng ý độc lập, không dùng thang lũy tiến. Thời gian gợi ý 45 phút; không tự khóa khi hết giờ.

## Học sinh sử dụng

1. Mở link, nhập thông tin bài làm nếu muốn.
2. Chọn đáp án trong ô tròn; câu ngắn có thể gõ số hoặc mở **Tô từng chữ số**. Bốn cột hỗ trợ chữ số, dấu âm và dấu phẩy thập phân. Đề 101 hiện dùng số nguyên dương.
3. Bấm **Nộp bài và xem điểm**. Bài thiếu câu sẽ có thông báo trước khi nộp.
4. Xem đáp án, giải thích; tải kết quả dạng văn bản hoặc in/lưu PDF. Có thể làm lại để luyện tập.

Chọn **Hiện nội dung câu hỏi** để chuyển giữa bài có câu hỏi và phiếu tô gọn.

## Lưu bài và phạm vi

Bài làm tự lưu trong trình duyệt trên thiết bị học sinh. Đổi thiết bị, xóa dữ liệu trình duyệt hoặc dùng chế độ riêng tư có thể làm mất tiến độ. Trang **chưa gửi bài hay điểm về giáo viên**, chưa có bảng điểm chung. Học sinh có thể tải bản kết quả để gửi bằng kênh giáo viên quy định.

Đây là bản ôn tập: đáp án nằm trong mã nguồn công khai và lời giải xuất hiện sau nộp. Không dùng làm hệ thống kiểm tra cần giữ bí mật đáp án. Phần tự luận được lưu cùng bài làm nhưng không chấm tự động.

## Nguồn và hiệu chỉnh nội dung

Hình thức dựa trên phiếu giấy “12 2 8 tự luận phách.pdf”. Giữ các phần đáp án; bỏ số phách, chữ ký và dấu định vị quét giấy khi chuyển sang trực tuyến.

Nội dung dựa trên đề ôn tập Sinh học 10 mã 101 và đáp án đã duyệt trong dự án; cấu trúc theo ma trận giữa học kì I năm 2026–2027. Bản trực tuyến ngày 21/10/2026 chỉnh **A.8** từ kiến thức về tế bào sang tính phân cực và vai trò dung môi của nước, đúng vị trí Bài 4/Thông hiểu trong ma trận. Đáp án vẫn là **C**, lời giải đã cập nhật. Các tệp Word mẫu được giữ nguyên; khi in lại đề cần đồng bộ hiệu chỉnh này.

## Cập nhật và kiểm tra

- `exam-data.js`: câu hỏi, đáp án, giải thích.
- `scoring.js`: kiểm tra số và chấm điểm.
- `app.js`: tương tác, lưu bài và xuất kết quả.
- `index.html`, `style.css`: giao diện.
- Chạy `node test-scoring.cjs` để kiểm tra chấm đúng, chấm trắng, điểm độc lập từng ý, số âm/thập phân và cột bỏ trống.
- Xem thử bằng máy chủ HTTP, ví dụ `python -m http.server 8000`, rồi mở địa chỉ máy chủ trên máy đang chạy.
- Khi đổi mã đề hoặc nội dung đáp án, đổi đồng bộ mã hiển thị và khóa lưu bài trong `app.js` để không dùng nhầm lượt làm cũ.

GitHub Pages xuất bản từ nhánh `main`, thư mục gốc `/`. Cập nhật tệp và đẩy commit lên `main`; chờ tác vụ Pages hoàn tất. Tệp `.nojekyll` giữ cách phục vụ trang tĩnh. Không có dịch vụ máy chủ của giáo viên hoặc thư viện bên ngoài cần chạy kèm.
