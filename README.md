# Web_B2
ọ tên: đặng đình đạt — domain dùng: dangdinhdat.com  
Đường dẫn trên máy (ổ E):  
Apache: E:\Apache24  
Web root: E:\Apache24\dangdinhdat (chứa index.html, dangdinhdat.js, dangdinhdat.css)  
Node.js: E:\nodejs  
Node-RED workspace: E:\nodejs\nodered\work  
Node-RED service (nssm): a1-nodered  
Những việc đã làm (theo trình tự)  
# Cài Apache và cấu hình virtual host

Giải nén Apache vào E:\Apache24, chỉnh E:\Apache24\conf\httpd.conf và E:\Apache24\conf\extra\httpd-vhosts.conf cho domain dangdinhdat.com với DocumentRoot trỏ tới E:\Apache24\dangdinhdat.  
Cập nhật file hosts: 127.0.0.1 dangdinhdat.com  
Cài service: E:\Apache24\bin\httpd.exe -k install, khởi động bằng -k start.  
Kết quả: trình duyệt mở http://dangdinhdat.com hiển thị index.html.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f9c09398-e43e-4a57-893c-a6d62528d227" />  

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0de1430e-3013-477d-b279-a6d8a6ac11ae" />  

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/175fdde1-e80b-4014-8ad0-488463898eaf" />  

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/19295c54-6213-4294-a2d6-eccba3225c7e" />   

<img width="983" height="643" alt="image" src="https://github.com/user-attachments/assets/aba40abb-3105-4801-8f77-fb65764b8b75" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/29e2a19c-0feb-4876-afb7-3c3e87ef3ff8" />  

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b8b83a2d-cbbd-42e9-b916-c8525aedbdde" />  

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ef233c93-6062-4682-b682-a7155e0acc15" />






