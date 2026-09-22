-- ============================================================================
-- MYSQL CHEATSHEET — Based on your KIOT Fest Database (events, registrations)
-- ============================================================================
-- NOTE: SQL comments use "--" (two dashes) for a single line, or /* ... */
-- for a multi-line block. It does NOT use "//" like JavaScript does.
-- Everything after -- on a line is ignored when you run the query.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. SELECT — reading data
-- ----------------------------------------------------------------------------

-- Show every column, every row in the events table
SELECT * FROM events;

-- Show only specific columns (cleaner when you don't need everything)
SELECT title, department, date FROM events;


-- ----------------------------------------------------------------------------
-- 2. WHERE — filtering rows
-- ----------------------------------------------------------------------------

-- Only events from the CSE department
SELECT * FROM events WHERE department = 'CSE';

-- Only free events (registration_fee is 0)
SELECT * FROM events WHERE registration_fee = 0;

-- Only sold-out events (booked seats >= total seats)
-- This is the exact logic your website uses to show "Housefull"
SELECT * FROM events WHERE seats_booked >= seats_total;


-- ----------------------------------------------------------------------------
-- 3. ORDER BY and LIMIT — sorting and capping results
-- ----------------------------------------------------------------------------

-- Sort by date, earliest first (use DESC for latest-first)
SELECT * FROM events ORDER BY date ASC;

-- Top 5 most expensive events only
SELECT * FROM events ORDER BY registration_fee DESC LIMIT 5;


-- ----------------------------------------------------------------------------
-- 4. LIKE — searching inside text
-- ----------------------------------------------------------------------------

-- % means "anything can come before/after" — finds any title containing "hackathon"
SELECT * FROM events WHERE title LIKE '%hackathon%';


-- ----------------------------------------------------------------------------
-- 5. JOIN — combining two related tables
-- ----------------------------------------------------------------------------
-- Your registrations table only stores event_id, not the event's title/date/venue.
-- To see a student's registration WITH the event details, you join the two tables.
-- "r" and "e" below are just short nicknames (aliases) for the tables.

-- This is the exact query your getTicketsByRollNo function runs in db.js
SELECT r.student_name, r.roll_no, e.title, e.date, e.venue
FROM registrations r
JOIN events e ON r.event_id = e.id
WHERE r.roll_no = '22CS001';


-- ----------------------------------------------------------------------------
-- 6. GROUP BY — counting and totaling per category
-- ----------------------------------------------------------------------------

-- How many events does each department have? One row per department.
SELECT department, COUNT(*) AS total_events
FROM events
GROUP BY department;

-- Which department has the most sign-ups, ranked highest first
SELECT department, SUM(seats_booked) AS total_registrations
FROM events
GROUP BY department
ORDER BY total_registrations DESC;


-- ----------------------------------------------------------------------------
-- 7. UPDATE and DELETE — modifying data (USE CAREFULLY)
-- ----------------------------------------------------------------------------
-- Always include a WHERE clause. Without it, the change applies to EVERY row
-- in the table, which is almost never what you want.

-- Change one event's seat count
UPDATE events SET seats_total = 60 WHERE id = 3;

-- Delete one event
DELETE FROM events WHERE id = 3;


-- ----------------------------------------------------------------------------
-- 8. SAFETY HABIT — check before you change or delete
-- ----------------------------------------------------------------------------
-- Run the same WHERE as a SELECT first, to see exactly which rows it will hit,
-- BEFORE running UPDATE or DELETE with that same WHERE.

SELECT * FROM events WHERE id = 3;   -- check first: does this look right?
DELETE FROM events WHERE id = 3;     -- then delete, once you're sure

-- to see every table
USE kiot_fest_db;

SELECT 
    r.student_name,
    r.roll_no,
    r.email,
    r.phone,
    r.department AS student_dept,
    r.year_of_study,
    r.ticket_code,
    r.payment_status,
    e.title AS event_name,
    e.department AS event_dept,
    e.date,
    e.time,
    e.venue,
    e.registration_fee,
    e.seats_total,
    e.seats_booked
FROM registrations r
JOIN events e ON r.event_id = e.id
ORDER BY e.date, r.student_name;

-- see to registra one
SELECT e.title, e.date, r.student_name, r.roll_no
FROM events e
LEFT JOIN registrations r ON r.event_id = e.id
ORDER BY e.date;


---run  in terminal-----


cd kiot_fest
npm run dev