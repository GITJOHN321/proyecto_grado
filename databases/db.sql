CREATE TABLE user_base(
    user_id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL,
    double_factor BOOLEAN DEFAULT FALSE,
    status BOOLEAN DEFAULT FALSE,
    telephone INTEGER, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE jacs (
    user_id INTEGER PRIMARY KEY,
    id_verify BOOLEAN DEFAULT FALSE,
    personery VARCHAR(50) UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_base(user_id) ON DELETE CASCADE
);
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    user_last_name VARCHAR(50) NOT NULL,
    birthdate DATE NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_base(user_id) ON DELETE CASCADE
);
CREATE TABLE roles(
    rol_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    jac_id INTEGER NOT NULL,
    user_id INTEGER UNIQUE, 
    rolname VARCHAR(50) UNIQUE NOT NULL,
    FOREIGN KEY (jac_id) REFERENCES jacs(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);


CREATE TABLE publications(
    publication_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    jac_id INTEGER NOT NULL, 
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    public BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (jac_id) REFERENCES jacs(user_id) ON DELETE CASCADE
);
CREATE TABLE comments(
    comment_id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    publication_id INTEGER NOT NULL, 
    user_id INTEGER NOT NULL, 
    content TEXT NOT NULL, 
    status BOOLEAN DEFAULT TRUE, 
    FOREIGN KEY (publication_id) REFERENCES publications(publication_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user_base(user_id) ON DELETE CASCADE
);