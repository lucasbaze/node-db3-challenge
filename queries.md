# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

SELECT ProductName, CategoryName FROM Products AS p
JOIN Categories AS c ON p.CategoryID = c.CategoryID

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

SELECT OrderID, ShipperName FROM Orders AS o
JOIN Shippers AS s
ON o.ShipperID = s.ShipperID
WHERE OrderDate < '1997-01-09'

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

SELECT ProductName, Quantity FROM OrderDetails as od
JOIN Products as p
ON od.productID = p.productID
WHERE OrderID = 10251
ORDER BY ProductName ASC

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

SELECT OrderID, CustomerName, LastName as 'Employee Last Name' FROM Orders as o
JOIN Customers as c
ON c.CustomerID = o.CustomerID
JOIN Employees as e
ON e.EmployeeID = o.EmployeeID

### (Stretch) Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

SELECT CategoryName, COUNT(ProductID) FROM Products as p
JOIN Categories as c
ON c.CategoryId = p.CategoryId
GROUP BY CategoryName

### (Stretch) Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

SELECT OrderID, COUNT(p.ProductID) as 'ItemCount' FROM OrderDetails as od
JOIN Products as p
ON p.ProductID = od.ProductID
GROUP BY OrderID
