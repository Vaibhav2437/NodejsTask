const express =require('express')
const app =express();
//use middleware
app.use(express.json());
const emp =[
    {"id" : 1 , "fname" : "Jhon" , "email" :"jhon@gmail.com","city" : "london", "contact" :7765489653},
    {"id" : 2 , "fname" : "Henery" , "email" :"Henery@gmail.com","city" : "Barcelona", "contact" :8967594598},
    {"id" : 3, "fname" : "Kenny" , "email" :"kenny@gmail.com","city" : "Paris", "contact" :8657431254},
    {"id" : 4 , "fname" : "Alyce" , "email" :"Alyce@gmail.com","city" : "Tokyo", "contact" :9876954326},
    {"id" : 5 , "fname" : "Adam" , "email" :"Adam@gmail.com","city" : "Dubai", "contact" :7865483498}
]
//Get taskS
app.get('/tasks', (req, res) => {
    let { page = 1, limit = 10, fname } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    let filteredTasks = emp;
    if (fname) {
        filteredTasks = filteredTasks.filter(task => task.fname.toLowerCase().includes(fname.toLowerCase()));
    }
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    res.status(200).json(filteredTasks.slice(startIndex, endIndex));
});
//to access specified id 
app.get('/tasks/:id', (req,res)=>{
    const empget = emp.find((e)=>e.id === parseInt(req.params.id))
    if(empget){
        res.status(200).res.send(empget)
    }else{
        res.status(404).send("Employee Not Found")
    }
})
//Submit data using post method
app.post('/tasks',(req,res)=>{ 
        const newEmp ={
            id :emp.length + 1,
            fname : req.body.fname,
            email: req.body.email,
            city :req.body.city,
            contact : req.body.contact
        }
        emp.push(newEmp)
        res.status(200).res.send(newEmp)
    })

//update records put method
app.put('/tasks/:id',(req,res)=>{
    const empget = emp.find((e)=>e.id === parseInt(req.params.id))
    if(empget){
        empget.fname = req.body.fname,
       empget.email = req.body.email,
        empget.city = req.body.city,
        empget.contact = req.body.contact
        res.send(empget)
    }else{
            res.status(404).send('Emplyees Not Found')
    }
})
app.delete('/tasks/:id',(req,res)=>{
    const empget = emp.find((e)=>e.id === parseInt(req.params.id))
    if(empget){
        const index = emp.indexOf(empget)
        emp.splice(index,1)
        res.send(empget)
    }else{
        res.status(404).send('Emplyees Not Found')
    }
})
app.listen(8900,()=>{
    console.log('8900 port is running')
})