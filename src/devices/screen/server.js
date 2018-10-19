const express = require('express')
const app = express()

app.use('/', express.static('public'));

app.get('/api', (req, res) => {});

app.get('/api/cursor', (req, res) => {});
app.post('/api/cusor', (req, res) => {});

app.get('/api/cursor/x', (req, res) => {});
app.post('/api/cursor/x', (req, res) => {});

app.get('/api/cursor/y', (req, res) => {});
app.post('/api/cursor/y', (req, res) => {});


app.listen(3000, () => {
  console.log('Display Adapter listening on port 3000!');
});

module.exports = class {
    constructor() {
        this.blah = '';
    }
    
    hook(a, b) {
        
    }
}