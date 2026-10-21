# Phiếu ôn tập Sinh học 10 mã 103

**[Mở phiếu mã 103](https://vvbhaidocbinhkieucailay-lang.github.io/phieu-trac-nghiem-sinh10/)**

GitHub Pages lưu trang để học sinh có Internet làm bài bằng điện thoại hoặc máy tính; máy giáo viên không cần bật. Không cần đăng nhập GitHub.

## Cấu trúc

| Phần | Số lượng | Điểm |
|---|---|---|
| A · Một đáp án A–D | 12 câu × 0,25 | 3 |
| B · Đúng–sai | 2 câu, mỗi câu 4 ý × 0,25 | 2 |
| C · Chọn các ý đúng, ghi số thứ tự | 8 câu × 0,25 | 2 |
| II · Tự luận | 3 câu × 1 | Giáo viên chấm riêng 3 điểm |

Tự chấm **trên 7**, đúng–sai chấm từng ý độc lập. Thời gian gợi ý 45 phút, không tự khóa khi hết giờ. Nhận biết 4 điểm, thông hiểu 3 điểm, vận dụng 3 điểm. Điểm Bài 1–6: 0,5; 1,5; 2; 2; 3,5; 0,5.

## Nội dung và nguồn

Câu hỏi, tình huống khác mã 101–102; biên soạn từ ngân hàng Sinh học 10 giữa học kì I năm 2026–2027 và đối chiếu ma trận, bảng đặc tả. Sáu hình mới: thời gian chiếu sáng, hoạt tính enzyme, cấp độ tổ chức sống, polysaccharide, suất ăn và vạch DNA. Hình/số liệu là mô hình giả định phục vụ bài tập, không phải kết quả nghiên cứu thực nghiệm công bố.

Cả 8 câu C yêu cầu **ghi liền số thứ tự các ý đúng theo thứ tự tăng dần**, ví dụ `134`; không ghi `3` để biểu thị số lượng ý đúng. Không dùng dấu âm, dấu phẩy, số lặp hay thứ tự đảo. Bốn cột tô số đồng bộ với ô nhập. Mỗi câu có 4 ý đánh số 1–4; đúng định dạng chưa có nghĩa là đúng đáp án.

Bảng đặc tả xếp A.8 ở Bài 4/TH với yêu cầu giải thích tế bào là đơn vị cấu trúc và chức năng, dù tên chủ đề là nguyên tố hóa học và nước. Mã 103 theo yêu cầu cụ thể này. Ghi chú trước đây suy từ tên chủ đề để đổi A.8 sang nước là chưa đầy đủ; không dùng suy luận đó để ra đề mới.

**[Bản 101 lưu riêng để tham khảo lịch sử](https://vvbhaidocbinhkieucailay-lang.github.io/phieu-trac-nghiem-sinh10/ma-101/)** giữ nội dung đã xuất bản trước, không tự đổi thành 103.

## Sử dụng và lưu bài

1. Mở link, nhập thông tin nếu muốn, làm các câu A–D, đúng–sai và đọc hình để trả lời phần C.
2. Bấm **Nộp bài và xem điểm**; trang nhắc nếu thiếu, chặn chuỗi C sai định dạng.
3. Xem đáp án, giải thích; tải kết quả văn bản hoặc in/lưu PDF; có thể làm lại.

Bài làm lưu trong trình duyệt học sinh, khóa lưu riêng cho mã 103. Đổi thiết bị, xóa dữ liệu hoặc dùng chế độ riêng tư có thể mất tiến độ. Trang **chưa tự gửi bài/điểm về giáo viên**, chưa có bảng điểm chung. Có thể tải kết quả để gửi theo kênh giáo viên quy định.

Đây là bản ôn tập: đáp án trong mã nguồn công khai, lời giải hiện sau nộp. Tự luận lưu cùng bài làm nhưng không chấm tự động.

## Cập nhật và kiểm tra

- `exam-data.js`: nội dung, đáp án, giải thích, mô tả hình.
- `images/`: sáu hình SVG.
- `scoring.js`: kiểm tra số/chuỗi chọn ý, chấm điểm.
- `app.js`: tương tác, lưu, xuất kết quả.
- `index.html`, `style.css`: giao diện; `ma-101/`: bản 101 dùng khóa và tệp cũ.

Chạy `node test-scoring.cjs`: kiểm tra 7/7, bài trắng, từng ý đúng–sai, chuỗi tăng dần, nhầm số lượng, đảo/lặp/thập phân/cột trống. Xem thử qua HTTP, kiểm tra hình trên điện thoại và máy tính. Đổi đề phải đổi mã, khóa lưu và phiên bản đường dẫn CSS/JS để lấy tệp mới.

GitHub Pages xuất bản từ nhánh `main`, thư mục gốc `/`. Đẩy commit, chờ Pages hoàn tất và kiểm tra link công khai. Không cần chạy máy chủ của giáo viên.

## Giao diện và hướng dẫn tô

Giao diện phần đầu dùng tiêu đề “Ôn tập Sinh học 10” và “Luyện tập và tự đánh giá kiến thức”, phân biệt ba dạng bằng xanh dương, cam, tím. `interface.css` quản lý màu và bố cục đáp ứng. Mục Hướng dẫn tô có ô A–D tô thử ngoài bài làm và mẫu tô chuỗi 134. Nút Xem hướng dẫn tô mở mục này; có thể thu gọn. Khi sửa giao diện, giữ khóa lưu bài và dữ liệu đáp án, đồng thời đổi phiên bản CSS/JS để trình duyệt tải bản mới.
