const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./db_connection");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    const sql = "SELECT * FROM produk";
    db.query(sql, (err, result) => {
        if (err) throw err;
        const data = JSON.parse(JSON.stringify(result));
        return res.render("index", { data });
    })
});

app.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM produk WHERE produk_id = " + id;
    db.query(sql, (err, result) => {
        if (err) throw err;
        const data = JSON.stringify(result);
        return res.json(data);
    });
});

app.post("/tambah", (req, res) => {
    const { nama, keterangan, harga, jumlah } = req.body;
    const sql = `INSERT INTO produk (nama_produk, keterangan, harga, jumlah) VALUES ('${nama}', '${keterangan}', ${harga}, ${jumlah})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result) res.redirect("/");
    });
});

app.get("/hapus/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM produk WHERE produk_id = " + id;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result) res.redirect("/"); 
    });
});

app.post("/ubah", (req, res) => {
    const { produk_id, nama, keterangan, harga, jumlah} = JSON.parse(JSON.stringify(req.body));
    const sql = `UPDATE produk SET nama_produk = '${nama}', keterangan = '${keterangan}', harga = ${harga}, jumlah = ${jumlah} WHERE produk_id = ${produk_id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result) res.redirect("/");
    })
});

app.listen(3000, () => {
    console.log("App running on port 3000");
});