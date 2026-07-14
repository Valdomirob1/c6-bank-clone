const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// Mock do banco de dados
const dbPath = path.join(__dirname, 'db.json');
let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// APIs
app.post('/api/login', (req, res) => {
  const { cpf, password } = req.body;
  const user = db.users.find(u => u.taxId === cpf && u.password === password);
  if (!user) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  res.json({ token: 'mock-jwt-token', user: { name: user.name } });
});

app.post('/api/consignado/simulate', (req, res) => {
  const { amount, term, incomeType } = req.body;
  const installment = (amount * 0.0162) / (1 - Math.pow(1 + 0.0162, -term));
  res.json({
    amount,
    term,
    installment: installment.toFixed(2),
    total: (installment * term).toFixed(2),
    success: true
  });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
