const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
})

router.post('/add', async(req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await db.query('INSERT INTO links set ?', [newLink]);
    res.redirect('/links');
})

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM links WHERE id = ?', [id]);
    res.redirect('/links');
})

router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const links = await db.query('SELECT * FROM links WHERE id = ?', [id]);
    //console.log(links[0]);
    res.render('links/edit', { link: links[0] })
})

router.post('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const updLink = {
        title,
        url,
        description
    };
    console.log(req.params);
    //console.log(id);
    //console.log(updLink);
    await db.query('UPDATE links set ? WHERE id = ?', [updLink, id]);
    res.redirect('/links');
})

router.get('/', async(req, res) => {
    const links = await db.query('SELECT * FROM links');
    res.render('links/list', { links });
})
module.exports = router;