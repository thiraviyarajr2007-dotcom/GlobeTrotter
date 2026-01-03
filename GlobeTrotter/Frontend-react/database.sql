CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    destination_count INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Insert demo data
INSERT INTO users (name) VALUES ('Demo User');
INSERT INTO trips (user_id, name, start_date, end_date, destination_count) 
VALUES (1, 'Europe Adventure', '2026-02-01', '2026-02-10', 3);
