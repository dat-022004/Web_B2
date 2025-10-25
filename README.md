# Web_B2
# Họ tên: đặng đình đạt — domain dùng: dangdinhdat.com  
Đường dẫn trên máy (ổ E):  
Apache: E:\Apache24  
Web root: E:\Apache24\dangdinhdat (chứa index.html, dangdinhdat.js, dangdinhdat.css)  
Node.js: E:\nodejs  
Node-RED workspace: E:\nodejs\nodered\work  
Node-RED service (nssm): a1-nodered  
# Tự đánh giá theo tiêu chí đề  
Cài Apache: hoàn thành  
Cài Node.js & Node-RED: hoàn thành  
Cài các thư viện Node-RED (mssql-plus, mysql, telegrambot, moment, influxdb, duckdns, cron-plus): hoàn thành  
Nhập dữ liệu demo vào SQL Server: hoàn thành  
Tạo API /timkiem trên Node-RED và test: hoàn thành  
Front-end gọi API và hiển thị kết quả: hoàn thành  
Phần trình bày (2.7): đầy đủ, có chứng cứ (screenshot, config, mã)  
=> Tự chấm: 10/10  
# Cài Apache và cấu hình virtual host
Giải nén Apache vào E:\Apache24, chỉnh E:\Apache24\conf\httpd.conf và E:\Apache24\conf\extra\httpd-vhosts.conf cho domain dangdinhdat.com với DocumentRoot trỏ tới E:\Apache24\dangdinhdat.  
Cập nhật file hosts: 127.0.0.1 dangdinhdat.com  
Cài service: E:\Apache24\bin\httpd.exe -k install, khởi động bằng -k start.  
Kết quả: trình duyệt mở http://dangdinhdat.com hiển thị index.html.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f9c09398-e43e-4a57-893c-a6d62528d227" />  

# Cài Node.js và Node-RED  
Cài nodejs vào E:\nodejs (bản v20.19.5).  
Cài Node-RED: npm install -g --unsafe-perm node-red --prefix "E:\nodejs\nodered".  
Tạo run-nodered.cmd để set PATH rồi chạy red.js; dùng nssm để tạo service a1-nodered và start service.  
Kết quả: Node-RED chạy như service, truy cập admin tại http://localhost:1880 sau khi bật adminAuth.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0de1430e-3013-477d-b279-a6d8a6ac11ae" />  

# Cấu hình bảo mật Node-RED  
Sửa E:\nodejs\nodered\work\settings.js, bật adminAuth, thay password bằng chuỗi mã hóa.  
Restart service để áp dụng; kiểm tra login admin thành công.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/19295c54-6213-4294-a2d6-eccba3225c7e" />   

# Cơ sở dữ liệu MSSQL  
Tạo database (db: [db_name]) và bảng mẫu (table: [table_name]) với các cột id, name, email, note; nhập ~xx bản ghi test để thử search.  
Ghi lại thông số kết nối: ip, port, username, password, db_name, table_name.  
<img width="983" height="643" alt="image" src="https://github.com/user-attachments/assets/aba40abb-3105-4801-8f77-fb65764b8b75" />


# Tạo API bằng Node-RED  
Flow chính gồm: http in (GET /timkiem) → function (tiền xử lý, lấy q từ query) → mssql node (parameterized query) → http response (status 200, Content-Type: application/json).  
Ví dụ gọi: http://localhost:1880/timkiem?q=thi trả về JSON danh sách kết quả.  
Đảm bảo dùng parameterized query trong node mssql để tránh SQL injection.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/29e2a19c-0feb-4876-afb7-3c3e87ef3ff8" />  

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b8b83a2d-cbbd-42e9-b916-c8525aedbdde" />  

# Front-end  
index.html: form tìm kiếm + hiển thị kết quả.  
dangdinhdat.js: bắt event submit, fetch('http://dangdinhdat.com/timkiem?q='+encodeURIComponent(q)) hoặc fetch('http://localhost:1880/timkiem?q=...') tùy cấu hình CORS, xử lý JSON và render bảng/kết quả.  
dangdinhdat.css: style cá nhân, responsive cơ bản.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ef233c93-6062-4682-b682-a7155e0acc15" />  

# Những khó khăn và cách giải quyết
Virtual host không hiện do sai DocumentRoot → kiểm tra lại đường dẫn và quyền file, restart apache.  
Node-RED không khởi động như service do PATH thiếu node.exe → dùng run-nodered.cmd để set PATH trước khi chạy.  
Kết nối MSSQL lỗi authentication/port → bật TCP/IP, dùng SQL Authentication, mở firewall cổng.  
Ban đầu query dùng ghép chuỗi → đổi sang parameterized query để an toàn.  
# Hiểu biết rút ra  
Nắm được quy trình triển khai web server tĩnh trên Apache và mapping domain cục bộ.  
Hiểu cấu trúc flow trong Node-RED và cách tạo API nhanh, debug qua node debug.  
Biết cách kết nối Node-RED đến MSSQL và trả JSON cho client.  
Nhận thức bảo mật cơ bản: adminAuth cho Node-RED, tránh SQL injection, kiểm soát service.  







