import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/otp', (req, res) => {
    console.log('OTP Request Received:', req.body);
    res.json({ message: 'OTP endpoint pending' });
});

app.listen(3001, () => {
    console.log('Debug Server running on 3001');
});
