const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// 設置模板引擎
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// 處理POST請求中間件
app.use(express.urlencoded({ extended: true }));

// 顯示主頁
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 處理保存請求
app.post('/save', (req, res) => {
    const content = req.body.content;
    // 將內容保存到文件中
    fs.appendFile('input.txt', content + '\n', (err) => {
        if (err) throw err;
        console.log('內容已保存到 input.txt');
    });
    res.redirect('/');
});

// 啟動服務器
app.listen(port, () => {
    console.log(`服務器正在運行，請訪問 http://localhost:${port}`);
});
