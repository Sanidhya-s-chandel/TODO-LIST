const express = require("express")
const app = express()
fs = require("fs")
app.set('view engine' , 'ejs')

app.get('/',function(req,res){
    fs.readdir('./uploads',function(err,files){
        if (err) throw err
        res.render('home',{files:files})
    })
    })
   

app.get('/add',function(req,res){
    res.render('add')
})

app.get('/addTask',function(req,res){
    const title = req.query.title
    const description = req.query.description
    fs.writeFile(`./uploads/${title}`,description,function(err){
        if (err) throw err
        res.redirect('/')
    })
})

app.get('/viewTask/:title',function(req,res){
    fs.readFile(`./uploads/${req.params.title}`,"utf-8",function(err,data){
        if (err) throw err
        res.send(`${data}`)
    })
})

app.get('/deleteTask/:title',function(req,res){
    fs.unlink(`./uploads/${req.params.title}`,function(err){
        if (err) throw err 
        res.redirect('/')
    })
})

app.get('/edit/:title',function(req,res){
    fs.readFile(`./uploads/${req.params.title}`,"utf-8",function(err,data){
        if (err) throw err 
        res.render('edit',{
            title:req.params.title,
            description:data
        })
    })

})

app.get("/editsval/:oldtitle",function(req,res){
    oldtitle = req.params.oldtitle
    title = req.query.title
    description = req.query.description
    fs.rename(`./uploads/${oldtitle}`,`./uploads/${title}`,function(err){
        if (err) throw err
        fs.writeFile(`./uploads/${title}`,description,function(err){
            if (err) throw err 
            res.redirect('/')
        })
    })
})
app.listen(3000)