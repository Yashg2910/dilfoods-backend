# dilfoods-backend
Backend POS for food system

Steps to reproduce:
1. git clone https://github.com/Yashg2910/dilfoods-backend.git
2. Go to the root of the directory and run "npm install", to install relevant packages.
3. Run the application using, "npm start".

Instructions:
1. Types of Users:
  * Staff: 
    - These can manage the menu items (Add. Edit, Delete, View)
    - These can View all the orders by the customers.
    - cannot* create any new orders.
  * Customer:
    - Can View all the menu items
    - Can view only their orders
    - Can create and place new orders using mobile OTP


2. On start, the backend will create 4 sample users to test the application:
  - Staff User: email: 'staff@dilfoods.com', password: 'staff123'
  - Customer-1:  email: 'customer@dilfoods.com', password: 'customer123'
  - Customer-3: email: 'customer3@dilfoods.com', phone: "9999999999", password: 'customer123'
  - Admin: email: admin@dilfoods.com, password: admin123
