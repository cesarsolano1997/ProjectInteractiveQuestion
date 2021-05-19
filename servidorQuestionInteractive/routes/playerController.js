const express = require('express')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()

app.post('/player', (req,res) => {

    let token = jwt.sign({
        user: 'csolano'
    }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN })

    res.json({
        ok: true,
        user: 'csolano',
        token
    })
})

module.exports = app;