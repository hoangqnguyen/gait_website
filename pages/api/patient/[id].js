import { Pool } from 'pg';
import { config } from 'dotenv';

config(); // Load .env variables

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export default async (req, res) => {
    const { id } = req.query;
    try {
        const personalInfo = await pool.query('SELECT * FROM personal_info WHERE call_id = $1', [id]);
        const gaitBasic = await pool.query('SELECT * FROM gait_basic WHERE call_id = $1', [id]);
        const gaitCycleSample = await pool.query('SELECT * FROM gait_cycle_sample WHERE call_id = $1', [id]);
        const gaitCyclePhase = await pool.query('SELECT * FROM gait_cycle_phase WHERE call_id = $1', [id]);
        const gaitCycleTime = await pool.query('SELECT * FROM gait_cycle_time WHERE call_id = $1', [id]);
        const gaitAssess = await pool.query('SELECT * FROM gait_assess WHERE call_id = $1', [id]);

        res.json({
            personalInfo: personalInfo.rows,
            gaitBasic: gaitBasic.rows,
            gaitCycleSample: gaitCycleSample.rows,
            gaitCyclePhase: gaitCyclePhase.rows,
            gaitCycleTime: gaitCycleTime.rows,
            gaitAssess: gaitAssess.rows,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
