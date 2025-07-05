const Logger = require('./Logger')
const logger = new Logger()

logger.on('messageLogged',  (org)=> {
    console.log('Listner chqarildi.', org);
})

logger.log('message')

