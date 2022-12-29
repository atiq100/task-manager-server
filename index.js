const  express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.get('/',(req, res)=>{
    res.send('task manager server running')
})

app.listen(port, () =>{
    console.log(`task manager server running on port ${port}`);
})