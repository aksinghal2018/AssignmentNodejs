import http from 'http'
import fs from 'fs'
http.createServer(function (req, res) {
    if (req.method == "GET" && req.url == '/addemployee') {
        const data = fs.readFileSync('index.html').toString()
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
        res.end()
    }
    if(req.method=='POST' &&  req.url == '/addemployee'){
        var body = "";
        req.on('data', function (chunk) {
            
          body += chunk;
        });
        req.on('end', function () {
          console.log('POSTed: ' + body);
          const data=body.split("&")
          const dataset=[]
          data.map(item=>{
              const itemdata=item.split('=')
              dataset.push(itemdata)
              
          })
          console.log(dataset[0][1])
          const data2=(JSON.parse('{'+'"'+dataset[0][0]+'"'+':'+'"'+dataset[0][1]+'"'+','+'"'+dataset[1][0]+'"'+':'+'"'+dataset[1][1]+'"'+','+'"'+dataset[2][0]+'"'+':'+'"'+dataset[2][1]+'"'+','+'"'+dataset[3][0]+'"'+':'+'"'+dataset[3][1]+'"'+'}'))
          const data3 = JSON.parse(fs.readFileSync('product.txt').toString())
            data3.push(data2)
            fs.writeFileSync('product.txt',JSON.stringify(data3))  
            
        });
        res.end('<h1 style="margin:20px">Employee Registerd</h1>')
    }
    if(req.url == '/'){
        const data = JSON.parse(fs.readFileSync('product.txt').toString())
        const data1=fs.readFileSync('productdata.txt').toString()
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data1)
        res.write('<table class="table"><thead class="thead-dark"><tr><th>#</th><th>Name</th><th>Age</th><th>City</th><th>Salary</th></tr><thead><tbody class="thead-light>')
        data.map((item,index)=>{
            return(
            res.write(`<tr class="table"><td>${index+1}</td><td>${item.name}</td><td>${item.age}</td><td>${item.city}</td><td>${item.salary}</td></tr>`))
        })
        res.write('</tbody></table>')
        res.end(' </div></body></html>')
    }
}).listen(6677)