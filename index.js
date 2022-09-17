const inquirer = require('inquirer'); 

const fs = require('fs');

const fse = require('fs-extra');
// const { createBrotliDecompress } = require('zlib');

let empdata = [];

var htmlscript = "";




// this is the initial function to inquire about the managers information

function addmagr(){
    inquirer.prompt([
    {
        type: 'input',
        message: 'What is your name, Team Manager?',
        name: 'input1'
    },
    {
        type: 'input',
        message: 'What is your employee ID?',
        name: 'input2'
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'input3'
    },
    {
        type: 'input',
        message: 'What is your office number? ',
        name: 'input4'
    },

])
.then((answer) =>{
    let mgrdata = JSON.stringify(answer); 
    empdata.push(mgrdata);

    addadl();
});
};

function addintern() { 
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your name, Intern?',
            name: 'input1'
        },
        {
            type: 'input',
            message: 'What is your employee ID?',
            name: 'input2'
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'input3'
        },
        {
            type: 'input',
            message: 'What school do you go to? ',
            name: 'input4'
        },
    ])
    .then((answer)=>{
        const interdata = JSON.stringify(answer);
        empdata.push(interdata);
        console.log(empdata);
        addadl();
    })
}


function addengineer() { 
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your name, Engineer?',
            name: 'input1'
        },
        {
            type: 'input',
            message: 'What is your employee ID?',
            name: 'input2'
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'input3'
        },
        {
            type: 'input',
            message: 'What is your Github name?',
            name: 'input4'
        },
    ])
    .then((answer)=>{
        const engineerdata = JSON.stringify(answer);
        empdata.push(engineerdata);
        console.log(empdata);
        addadl();
    })
}


function addadl() { 
    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to add another employee? If so, what type??',
            choices: ['Intern','Engineer','No more employees'],
            name: 'type'
        },
    ])
    .then((answer)=>{
        if( answer.type === 'Intern'){
            addintern()
        } else if ( answer.type === 'Engineer'){
            addengineer();
        } else {
            console.log("Thanks for participating in this joyous event!")
            makehtml();
            writedoc();
        }


    })
}

addmagr();


function writedoc(){

    makehtml();
    fs.writeFile("./public/index.html", htmlscript, (err)=>{
        if (err){
            console.log(err)
        }
    })
}

function makehtml(){
    htmlscript = 
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="./style.css">
    <title>Project10</title>
</head>
<body>
    <div class="columns">
          <p class="headerdesc"> Company Information </p>
        </div>
      </div>

    <section class = "cardsect">`

  


 
    for(var i=0; i<empdata.length; i++){
        var newdata = JSON.parse(empdata[i])
        htmlscript +=`

    <script type="text/javascript" language="javascript">
      
    var cardsect = document.querySelector(".cardsect")
      var newdiv = document.createElement("div");
      newdiv.setAttribute("class", "card");
      cardsect.appendChild(newdiv);

      var newheader = document.createElement("header");
      newheader.setAttribute("class", "card-header");
      newdiv.appendChild(newheader);

      var par1=document.createElement("p");
      par1.setAttribute("class","card-header-title");
      newheader.appendChild(par1);
      par1.innerHTML="${newdata.input1}"


      var div2 = document.createElement("div");
      div2.setAttribute("class", "card-content");
      newdiv.appendChild(div2);

      var div3 = document.createElement("div");
      div3.setAttribute("class","content");
      var p2 = document.createElement("p");
      var p3 = document.createElement("p");
      var p4 = document.createElement("p");
      div2.appendChild(div3);
      div3.appendChild(p2);
      div3.appendChild(p3);
      div3.appendChild(p4);

      p2.setAttribute("class","desc");
      p3.setAttribute("class","desc");
      p4.setAttribute("class","desc");

      p2.innerHTML="${newdata.input2}";


      var footer = document.createElement("footer");
      footer.setAttribute("class","card-footer");
      newdiv.appendChild(footer);
      var link1 = document.createElement("a");
      var link2 = document.createElement("a");

      footer.appendChild(link1);
      footer.appendChild(link2);

      link1.setAttribute("href", "https://github.com/${newdata.input4}");   
      link1.setAttribute("class", "card-footer-item");
      link2.setAttribute("class","card-footer-item")
      link1.textContent = "Github: ${newdata.input4}";
      link2.textContent = "Email: ${newdata.input3}";
      link2.setAttribute("href","mailto: ${newdata.input3}")
      </script>`}   
    htmlscript += `
    </section>
    </body>
</html>`

}



module.exports = addengineer;
module.exports = addmagr;
module.exports = addintern;