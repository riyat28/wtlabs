
const fs=require('fs');
const http=require('http');
const path=require('path');
const url=require('url');
const mysql=require('mysql');
const PORT=3000;

const dbconfig={
    host:'localhost',
    user:'root',
    password:'',
    database:'form',
    port:3307
};

const connection=mysql.createConnection(dbconfig);

const server=http.createServer((req,res)=>{
    const parsedURL=url.parse(req.url,true);

    if(parsedURL.pathname.startsWith('/public')){
        const filePath=path.join(__dirname,parsedURL.pathname);
        fs.readFile(filePath,(err,data)=>{
            if(err){
                res.writeHead(404,{'Content-type':'text/plain'});
                res.end('File not found');
            }
            else
            {
                const contentType=getContentType(filePath);
                res.writeHead(200,{'Content-Type':contentType});
                res.end(data);
            }
        })
    }
    else if(parsedURL.pathname==='/'){
        const filePath=path.join(__dirname,'views','index.html');
        fs.readFile(filePath,'utf-8',(err,data)=>{
            if(err){
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end('Internal Server Error');
            }
            else
            {
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        })
    }
    else if(parsedURL.pathname==='/calculate' && req.method==="POST"){
        let body="";
        req.on('data',(chunk)=>{
            body+=chunk;
        })
        req.on('end',()=>{
            console.log(body);
            const formData=new URLSearchParams(body);
            const firstname=formData.get('firstname');
            const mobileno=formData.get('mobileno');
            const units=parseInt(formData.get('units'));
            let units_first=3.50;
            let units_second=4.00;
            let units_third=5.20;
            let units_fourth=6.50;
            let bill;
            let runits;
            if(units>0 && units<=50)
            {
                bill=units*units_first;
            }
            else if(units>50 && units<=150)
            {
                runits=units-50;
                bill=50*units_first+runits*units_second;
            }
            else if(units>150 && units<=250)
            {
                runits=units-100;
                bill=50*units_first+100*units_second+runits*units_third;
            }
            else
            {
                runits=units-250;
                bill=50*units_first+100*units_second+100*units_third+runits*units_fourth;
            }

            connection.connect((err)=>{
                if(err)
                {
                    console.error('Error with connecting database',err);
                    return;
                }
                console.log('Connection created successfully');
                
                const sql = 'INSERT INTO bill_node (firstname, mobileno, units,bill) VALUES (?, ?, ?,?)';
                connection.query(sql, [firstname, mobileno, units,bill], (err, result) => {
                    if (err) {
                        console.error('Error inserting data into MySQL:', err);
                        return;
                    }
                    console.log('Data inserted into MySQL:', result);

                    // Continue with your response handling here

                    // Close the MySQL connection when done
                    connection.end();
                })
            })
            

            const result = `
            <div class="result">
                <p>Name: ${firstname}</p>
                <p>Mobile No: ${mobileno}</p>
                <h2>Bill Amount</h2>
                <p>Units Consumed: ${units}</p>
                <p>Total Amount: Rs. ${bill.toFixed(2)}</p>
            </div>
        `;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(result);
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
})

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})


function getContentType(filePath){
    const extname=path.extname(filePath);
    switch (extname){
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'application/octet-stream';

    }
}