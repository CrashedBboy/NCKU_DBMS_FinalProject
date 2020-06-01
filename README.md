# NCKU_DBMS_FinalProject

School final project of course 'Database Management System' @ NCKU.

## Topic

```
Administrator console for PTT (discussion forum)
```

## Screenshots

![board information](https://github.com/CrashedBboy/NCKU_DBMS_FinalProject/blob/master/docs/board-info.jpg?raw=true)

## Project Requirements
* implement a DBMS using all of the listed SQLs:
  - SELECT
  - DELETE
  - INSERT
  - UPDATE
  - IN, NOT IN
  - EXISTS, NOT EXISTS
  - COUNT, SUM, MAX, MIN, AVG, HAVING
* provide 2 methods of operation:
    - GUI
    - RAW SQL execution (input arbitary SQL command)
* Design an ER Model
    - at least 5 entities
        * each entity has at least 3 attributes
        * each entity has a key attribute
    - two-way relationship & three-way relationship

## How to run

This project is developed using Node.js with SQLite3 under Express.js web framework.

1. clone this repository
2. run `npm install`
3. run `npm start`
4. open web browser, visit `http://localhost:3000`
