module.exports = function(app){
    require('./hiring')(app);
    require('./user')(app);
};