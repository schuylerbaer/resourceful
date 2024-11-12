# Favorite Phish Shows

## Resource

**Show**

Attributes:

* date (string)
* location (string)
* rating (integer)
* notes (string)
* standout jams (string)

## Schema

```sql
CREATE TABLE reviews (
id INTEGER PRIMARY KEY,
date TEXT,
location TEXT,
rating INTEGER,
notes TEXT,
jams TEXT);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve review collection | GET    | /reviews
Retrieve review member     | GET    | /reviews/*\<id\>*
Create review member       | POST   | /reviews
Update review member       | PUT    | /reviews/*\<id\>*
Delete review member       | DELETE | /reviews/*\<id\>*
