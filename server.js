const app = require('./app');
const configVariable = require('./config/config');

app.listen(configVariable.PORT || 5000, () => {
    console.log('Backend Server is running')
});