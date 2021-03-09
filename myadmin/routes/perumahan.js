const { text } = require('express');
var express = require('express');
var router = express.Router();

//var authentication_mdl = require('../middlewares/authentication');
var session_store;
/* GET Customer page. */
router.get('/',/*authentication_mdl.is_login,*/ function(req, res, next) {
 req.getConnection(function(err,connection){
 var query = connection.query('SELECT * FROM tperumahan',function(err,rows)
 {
 if(err)
 var errornya = ("Error Selecting : %s ",err );
 req.flash('msg_error', errornya);
 res.render('perumahan/list',{title:"Perumahan",data:rows,session_store:req.session});
 });
 //console.log(query.sql);
 });
 });
module.exports = router;
router.post('/add', /*authentication_mdl.is_login,*/ function(req, res, next)
{
 req.assert('pemilik', 'Please fill the data').notEmpty();
 var errors = req.validationErrors();
 if (!errors) {
 v_pemilik = req.sanitize( 'pemilik' ).escape().trim();
 v_alamat = req.sanitize( 'alamat' ).escape().trim();
 v_phone = req.sanitize( 'phone' ).escape().trim();
 v_NIK = req.sanitize( 'NIK' ).escape();
 var tperumahan = {
 pemilik: v_pemilik,
 alamat: v_alamat,
 phone: v_phone,
 NIK : v_NIK
}
 var insert_sql = 'INSERT INTO tperumahan SET ?';
 req.getConnection(function(err,connection){
 var query = connection.query(insert_sql, tperumahan, function(err, result){
 if(err)
 {
 var errors_detail = ("Error Insert : %s ",err );
 req.flash('msg_error', errors_detail);
 res.render('perumahan/add-perumahan',
 {
 pemilik: req.param('pemilik'),
 alamat: req.param('alamat'),
 phone: req.param('phone'),
 NIK: req.param('NIK'),
 });
 }else{
 req.flash('msg_info', 'Create data success');
 res.redirect('/perumahan');
 }
 });
 });
 }else{
 console.log(errors);
 errors_detail = "Sory there are error <ul>";
 for (i in errors)
 {
 error = errors[i];
 errors_detail += '<li>'+error.msg+'</li>';
 }
 errors_detail += "</ul>";
 req.flash('msg_error', errors_detail);
 res.render('perumahan/add-perumahan',
 {
 name: req.param('pemilik'),
 address: req.param('alamat')
 });
 }
});
router.get('/add', function(req, res, next) {

 res.render( 'perumahan/add-perumahan',
 {
 title: 'Add New Perumahan',
 pemilik: '',
 phone: '',
 alamat:'',
 NIK:''
 });
});
router.get('/edit/(:id_pemilik)', /*authentication_mdl.is_login,*/ function(req,res,next){
 req.getConnection(function(err,connection){
 var query = connection.query('SELECT * FROM tperumahan where id_pemilik='+req.params.id_pemilik,function(err,rows)
 {
 if(err)
 {
 var errornya = ("Error Selecting : %s ",err );
 req.flash('msg_error', errors_detail);
 res.redirect('/perumahan');
 }else
 {
 if(rows.length <=0)
 {
 req.flash('msg_error', "Rumah can't be find!");
 res.redirect('/perumahan');
 }
 else
 {
 console.log(rows);
 res.render('perumahan/edit',{title:"Edit ",data:rows[0]});

 }
 }

 });
 });
 });
 router.put('/edit/(:id_pemilik)', /*authentication_mdl.is_login,*/ function(req,res,next){
 req.assert('pemilik', 'Please fill data').notEmpty();
 var errors = req.validationErrors();
 if (!errors) {
 v_pemilik = req.sanitize( 'pemilik' ).escape().trim();
 v_alamat = req.sanitize( 'alamat' ).escape().trim();
 v_phone = req.sanitize( 'phone' ).escape().trim();
 v_NIK = req.sanitize( 'NIK' ).escape();
 var tperumahan = {
 pemilik: v_pemilik,
 alamat: v_alamat,
 phone: v_phone,
 NIK : v_NIK
 }

 var update_sql = 'update tperumahan SET ? where id_pemilik = '+req.params.id_pemilik;
 req.getConnection(function(err,connection){
 var query = connection.query(update_sql, tperumahan, function(err, result){
 if(err)
 {
 var errors_detail = ("Error Update : %s ",err );
 req.flash('msg_error', errors_detail);
 res.render('perumahan/edit',
 {
 pemilik: req.param('pemilik'),
 alamat: req.param('alamat'),
 phone: req.param('phone'),
 NIK: req.param('NIK'),
 });
 }else{
 req.flash('msg_info', 'Update data success');
 res.redirect('/perumahan/edit/'+req.params.id_pemilik);
 }
 });
 });
 }else{
 console.log(errors);
 errors_detail = "Sory there are error<ul>";
 for (i in errors)
 {
 error = errors[i];
 errors_detail += '<li>'+error.msg+'</li>';
 }
 errors_detail += "</ul>";
 req.flash('msg_error', errors_detail);
 res.render('perumahan/add-perumahan',
 {

 name: req.param('pemilik'),
 address: req.param('alamat')
 });
 }
 });
 router.delete('/delete/(:id_pemilik)',/*authentication_mdl.is_login,*/ function(req, res, next) {
 req.getConnection(function(err,connection){
 var tperumahan = {
 id_pemilik: req.params.id_pemilik,
 }

 var delete_sql = 'delete from tperumahan where ?';
 req.getConnection(function(err,connection){
 var query = connection.query(delete_sql, tperumahan, function(err, result){
 if(err)
 {
 var errors_detail = ("Error Delete : %s ",err);
 req.flash('msg_error', errors_detail);
 res.redirect('/perumahan');
 }
 else{
 req.flash('msg_info', 'Delete Data Success');
 res.redirect('/perumahan');
 }
 });
 });
 });
});