CREATE TABLE personal_info (
  call_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INTEGER,
  height INTEGER,
  weight INTEGER,
  gender VARCHAR(10)
);

CREATE TABLE gait_basic (
  call_id INTEGER,
  category VARCHAR(100),
  value VARCHAR(100),
  unit VARCHAR(50),
  PRIMARY KEY (call_id, category)
);

CREATE TABLE gait_cycle_sample (
  call_id INTEGER,
  somevalue FLOAT
);

CREATE TABLE gait_cycle_phase (
  call_id INTEGER,
  category VARCHAR(100),
  unit VARCHAR(50),
  left_mean FLOAT,
  left_sd FLOAT,
  right_mean FLOAT,
  right_sd FLOAT,
  diff_mean FLOAT,
  diff_sd FLOAT,
  PRIMARY KEY (call_id, category)
);

CREATE TABLE gait_cycle_time (
  call_id INTEGER,
  category VARCHAR(100),
  unit VARCHAR(50),
  left_mean FLOAT,
  left_sd FLOAT,
  right_mean FLOAT,
  right_sd FLOAT,
  diff_mean FLOAT,
  diff_sd FLOAT,
  PRIMARY KEY (call_id, category)
);

CREATE TABLE gait_assess (
  call_id INTEGER,
  category VARCHAR(100),
  "left" FLOAT,
  "right" FLOAT,
  result VARCHAR(100),
  PRIMARY KEY (call_id, category)
);


-- Insert mock data
INSERT INTO personal_info (name, age, height, weight, gender) VALUES
('김철수', 35, 175, 70, 'Male'),
('박영희', 28, 160, 55, 'Female'),
('이민호', 42, 180, 80, 'Male');

INSERT INTO gait_basic (call_id, category, value, unit) VALUES
(1, 'Speed', '1.2', 'm/s'),
(1, 'Cadence', '110', 'steps/min'),
(2, 'Speed', '1.0', 'm/s'),
(2, 'Cadence', '105', 'steps/min'),
(3, 'Speed', '1.3', 'm/s'),
(3, 'Cadence', '115', 'steps/min');

INSERT INTO gait_cycle_phase (call_id, category, unit, left_mean, left_sd, right_mean, right_sd, diff_mean, diff_sd) VALUES
(1, 'Initial Contact', '%', 0.5, 0.1, 0.6, 0.1, 0.1, 0.01),
(2, 'Initial Contact', '%', 0.4, 0.1, 0.5, 0.1, 0.1, 0.01),
(3, 'Initial Contact', '%', 0.6, 0.1, 0.6, 0.1, 0, 0);

INSERT INTO gait_cycle_sample (call_id, somevalue) VALUES
(1, 1.1),
(2, 2.2),
(3, 3.3);

INSERT INTO gait_cycle_time (call_id, category, unit, left_mean, left_sd, right_mean, right_sd, diff_mean, diff_sd) VALUES
(1, 'Swing Time', 's', 0.4, 0.05, 0.4, 0.05, 0, 0),
(2, 'Swing Time', 's', 0.45, 0.05, 0.5, 0.05, 0.05, 0.01),
(3, 'Swing Time', 's', 0.35, 0.05, 0.4, 0.05, 0.05, 0.01);

INSERT INTO gait_assess (call_id, category, "left", "right", result) VALUES
(1, 'Stability', 0.8, 0.9, 'Stable'),
(2, 'Stability', 0.7, 0.8, 'Unstable'),
(3, 'Stability', 0.9, 0.9, 'Stable');