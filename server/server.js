const app = require('./app');
const port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log('서버 기동 :' + port);
});
