Architecture:

+-----------------------+
|  AAP Controller       |
|                       |
|  AWX/AAP Jobs         |
|      |                |
|      v                |
| /var/www/html/        |
|   index.html          |
|   checklist.html      |
|   inventory.html      |
|                       |
|  Apache (httpd)       |
+-----------------------+
       |
       v
http://controller-ip/


Step - 1: Install Apache on Controller

sudo dnf install -y httpd
sudo systemctl enable --now httpd
sudo systemctl status httpd


Step - 2: Open Firewall

sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload
sudo firewall-cmd --list-services


Step - 3: Test Web Server
echo "<h1>AAP Report Server</h1>" | sudo tee /var/www/html/index.html
http://<controller-ip>


Step - 4: Create Report Directory

sudo mkdir -p /var/www/html/reports
sudo chmod -R 755 /var/www/html/reports


Step - 5: Create Landing Page (index.html)

<html>
<head>
<title>AAP Reports</title>
</head>
<body>
<h1>Inventory Reports</h1>
<ul>
<li><a href="/reports/checklist.html">Checklist Report</a></li>
<li><a href="/reports/unreachable.html">Unreachable Servers</a></li>
</ul>
</body>
</html>


Step - 6: SELinux

getenforce
sudo restorecon -Rv /var/www/html


Step - 7: Use Controller Hostname

http://aap-controller.domain.com/ 

