import 'dotenv/config'
import express from 'express'
const app=express();
const PORT=process.env.PORT || 3000;

//middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res)=>{
    return res.send("Hello Everyone");
});

// Routes File 

import routes from './Routes/index.js';
app.use(routes);


app.listen(PORT, ()=>console.log(`Server is running on PORT ${PORT}`));