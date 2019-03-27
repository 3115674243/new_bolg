
var indexrender=function () {

};
indexrender.prototype.home=function (res) {
  res.render('home', { title: 'Home' });
};
module.exports = indexrender;