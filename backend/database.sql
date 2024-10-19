-- Create the database (Note: This command should be run as a superuser in PostgreSQL)
CREATE DATABASE socialmediasports;

-- Create the users table for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(6) CHECK (gender IN ('male', 'female')) NOT NULL,
    profilePic VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    guess VARCHAR(255) NOT NULL,
    likes INT DEFAULT 0,
    user_id INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the likes table
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);


-- Create the Groups table
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    secret_code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_groups (
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    score INT DEFAULT 0,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Create the chat table
CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(255) NOT NULL UNIQUE,
    event_uuid VARCHAR(255) NOT NULL UNIQUE,
    sport_id INT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    venue_name VARCHAR(255),
    venue_location VARCHAR(255),
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
    home_team_name VARCHAR(255) NOT NULL,
    away_team_name VARCHAR(255) NOT NULL,
    home_team_mascot VARCHAR(255),
    away_team_mascot VARCHAR(255),
    home_team_abbreviation VARCHAR(10),
    away_team_abbreviation VARCHAR(10),
    home_team_conference VARCHAR(255),
    away_team_conference VARCHAR(255),
    home_team_division VARCHAR(255),
    away_team_division VARCHAR(255),
    home_team_record VARCHAR(10),
    away_team_record VARCHAR(10),
    season_type VARCHAR(255),
    season_year INT,
    broadcast VARCHAR(255),
    event_status VARCHAR(50),
    event_status_detail VARCHAR(255),
    score_home INT DEFAULT 0,
    score_away INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the guesses table
CREATE TABLE guesses (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    winner_team_id INT NOT NULL,
    point_difference INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
















