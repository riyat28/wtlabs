const fs=require('fs');
const http=require('http');
const url=require('url');
const mysql=require('mysql');
const path=require('path');
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
    if(parsedURL.pathname.startsWith('/public'))
    {
        const filepath=path.join(__dirname,parsedURL.pathname);
        fs.readFile(filepath,(err,data)=>{
            if(err)
            {
                res.writeHead(404,{'Content-type':'text/plain'});
                res.end('File not found');
            }
            else
            {
                const contenttype=getContentType(filepath);
                res.writeHead(200,{'Content-type':contenttype});
                res.end(data);
            }
        })
    }
    else if(parsedURL.pathname ==='/')
    {
        const filePath=path.join(__dirname,'views','index.html');
        fs.readFile(filePath,'utf-8',(err,data)=>{
            if(err)
            {
                res.writeHead(500,{'Content-type':'text/plain'});
                res.end('Internal Server Error');
            }
            else
            {
                res.writeHead(200,{'Content-type':'text/html'});
                res.end(data);
            }
        })
    }  
    else if(parsedURL.pathname==='/calculate' && req.method==='POST')
    {
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk;
        })
        req.on('end',()=>{
            console.log(body);
            const formData=new URLSearchParams(body);
            const cnmidsem=parseInt(formData.get('cnmidsem'));
            const wtmidsem=parseInt(formData.get('wtmidsem'));
            const daamidsem=parseInt(formData.get('daamidsem'));
            const sdmmidsem=parseInt(formData.get('sdmmidsem'));
            const edimidsem=parseInt(formData.get('edimidsem'));
            
            const cnendsem=parseInt(formData.get('cnendsem'));
            const wtendsem=parseInt(formData.get('wtendsem'));
            const daaendsem=parseInt(formData.get('daaendsem'));
            const sdmendsem=parseInt(formData.get('sdmendsem'));
            const ediendsem=parseInt(formData.get('ediendsem'));

            let totalmarks=(cnmidsem*0.30+cnendsem*0.70)+(wtmidsem*0.30+wtendsem*0.70)+(daamidsem*0.30+daaendsem*0.70)+
            (sdmmidsem*0.30+sdmendsem*0.70)+(edimidsem*0.30)+(ediendsem*0.70);

            //$cgpa=(($total_marks/5)+7.5)/10;
            let cgpa=((totalmarks/5)+7.5)/10;

            connection.connect((err)=>{
                if(err)
                {
                    console.error('Error Connecting to Database',err);
                    return;
                }

                console.log('Connection done successfully');
                const sql='INSERT INTO marks_node (cnmidsem,wtmidsem,daamidsem,sdmmidsem,edimidsem,cnendsem,wtendsem,daaendsem,sdmendsem,ediendsem,totalmarks,cgpa) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ';
                connection.query(sql,[cnmidsem,wtmidsem,daamidsem,sdmmidsem,edimidsem,cnendsem,wtendsem,daaendsem,sdmendsem,ediendsem,totalmarks,cgpa],(err,result)=>{
                    if(err)
                    {
                        console.error('Error in inserting data into table',err);
                        return;
                    }
                    console.log('Data inserted successfully',result);

                    connection.end();
                })
            })
            const result=`
            <div class="result">
            <h1>Result</h1>
            <h2>Total marks:${totalmarks.toFixed(2)}.</p>
            <h2>CGPA:${cgpa.toFixed(2)}</p>
            </div>`;
            res.writeHead(200,{'Content-type':'views/html'});
            res.end(result);

        })
    }
    else
    {
        res.writeHead(404,{'Content-type':'text/plain'});
        res.end('Not found');
    }
})
server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

function getContentType(filePath)
{
    const extname=path.extname(filePath);
    switch(extname)
    {
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