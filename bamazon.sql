
CREATE DATABASE Bamazon;
USE Bamazon;
create table products (
item_id int not null auto_increment,
product_name varchar(50) not null,
dept_name varchar(50) not null,
price decimal(10,2) not null,
stock_quantity integer not null,
primary key (item_id)
)



INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES  ('Rimmel Blush', 'Cosmetics', 3.75, 50),
		('Bed Head Gel', 'Cosmetics', 5.25, 30),
		('Beef Jerkey', 'Grocery', 5.99, 30),
		('Ziploc Sandwhich Bags', 'Grocery', 2.25, 30),
		('Artichoke', 'Produce', 0.35, 50),
		('Hass Avacado', 'Produce', 0.50, 75),
		('Kraft Mayo', 'Grocery', 4.45, 50),
		('Horizon Organic Milk', 'Grocery', 4.50, 20),
		('Huggies Wipes', 'Children', 5.75, 75),
		('Hershey_s Chocolate Syrup', 'Grocery', 3.99, 50),
		('Pampers Baby Wipes', 'Children', 4.50, 40),
		('Basketball', 'Sports', 12.75, 15),
		('Boce Set', 'Sports', 17.99, 10),
		('Yellow Shirt', 'Clothing', 5.99, 20),
		('Nike Shorts', 'Clothing', 15.99, 50),
		('Pedigree Dog Food', 'Pet', 12.25, 15),
		('Brown Leash', 'Pet', 12.50, 20),
		('Ibuprophen', 'Pharmacy', 4.99, 50),
		('Chapstick', 'Pharmacy', 1.25, 50),
		('Blue Bell Ice Cream', 'Grocery', 3.99, 40);