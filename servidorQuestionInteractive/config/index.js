process.env.PORT = process.env.PORT || 4000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==================
// Vencimiento del token
// ==================
// 60 segundos
// 60 minutos
// 24 horas
// = 30 días

process.env.EXPIRATION_TOKEN = '1 h'

// ==================
// SEED de autenticación
// ==================

process.env.SEED = process.env.SEED || 'este-es-seed-desarrollo';