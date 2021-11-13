# 1. Toán tử EXISTS trong SQL Server.

## 1.1 EXISTS trong sub-query.

Toán tử `EXISTS` là toán tử logic, nó sẽ kiểm tra một sub-query có trả về bất kỳ record nào hay không. **Trả về `TRUE` nếu sub-query trả về một hoặc nhiều bản ghi**.

Ta lưu ý ngay cả khi truy vấn con trả về một giá trị `NULL` thì toán tử `EXIST` vẫn trả về là `TRUE`.

Ví dụ trong lệnh bên dưới kết quả trả về sẽ là `TRUE`

```SQL
    EXISTS (SELECT NULL)
```

Ta có 2 table là `customer` và `order`

![picture](./images/.PNG)

Ta có yêu cầu là Hãy tìm ra các **customer** nào có nhiều hơn 2 **order**.

```SQL
    SELECT c.customer_id,
        c.first_name,
        c.last_name
    FROM sales.customers c
    WHERE EXISTS
    (
        SELECT *
        FROM sales.orders o
        WHERE o.customer_id = c.customer_id
        GROUP BY o.customer_id
        HAVING COUNT(*) > 2
    )
    ORDER BY c.first_name,
            c.last_name;
```

## 1.2 Toán tử `EXISTS` với toán tử `IN`

## 1.3 Toán tử `EXISTS` với mệnh đề `JOIN`

Toán tử `EXISTS` tả về là `TRUE` hoặc `FALSE`.

Mệnh đề `JOIN` trả về bản ghi từ bảng khác.

Ta dùng toán tử `EXISTS1 để kiểm tra truy vấn con đó có trả về bất kỳ bản ghi nào không và dừng ngay khi có bất kỳ một giá trị nào, và không xét tới các record khác.

Mệnh đề `JOIN` để mở rộng tập kết quả bằng cách kết hợp nó với các bảng khác qua các cột liên quan.

# 2. Toán tử ANY trong SQL Server.

Toán tử `ANY` là một toán tử logic so sánh một giá trị với một tập các giá trị cột đơn trả về bởi một sub-query.
