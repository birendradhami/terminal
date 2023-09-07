
const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));
    
    
app.addEventListener("keypress", async function(event){
  if(event.key === "Enter"){
    await delay(150);
   getInputValue();
   
    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("click", function(event){
  const input = document.querySelector("input");
  input.focus();
})


async function open_terminal(){
  createText("Hint 'H'");
  await delay(700);
  new_line();
}


function new_line(){
  
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path")
  span2.textContent = "/CUI";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);
  const div = document.createElement("div");
  div.setAttribute("class", "type")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
  
}

// function color(){
//   var input = document.getElementById('app');
//   input.style.backgroundColor = 'pink';
//   input.style.textDecorationColor ='black';
//  }

function removeInput(){
  const div = document.querySelector(".type");
  app.removeChild(div);
}
async function getInputValue(){
  
  const value = document.querySelector("input").value;
  if(value === "H"){
    trueValue(value);
    createText("Commands")
    createText("| about | projects | skills | contact | gui |")
    
  }
  else if(value=== "about"){
    trueValue(value);
    createText("My name is Birendra Dhami. Message for futher details - @sbirendradhami")
  }

  //  else if(value === "light theme"){
  //    color();
  //  }

  else if(value === "projects"){
    trueValue(value);
    createText("Download CV to get Projects")
  }
  else if(value === "skills"){
    trueValue(value);
    createText("PL : HTML, CSS, JS, C++, C#, Python, PhP, MySQL ")
  }
  else if(value === "contact"){
    trueValue(value);
    createText("<a href='https://github.com/birendradhami' target='_blank'><i class='fab fa-github white'></i> github.com/birendradhami</a>")
    createText("<a href='https://www.linkedin.com/in/sbirendradhami/' target='_blank'><i class='fab fa-linkedin-in white'></i> linkedin.com/in/sbirendradhami</a>")
  }
  else if(value === "download cv"){
  
      window.open("assets/downloads/BirendraCV.pdf")
      createText("Down-Loading")
    }

  else if (value === "gui"){
    window.open("https://birendradhami.github.io/bsdhami")
  }
  
  else if(value === "clear"){
    document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
  }
  else{
    falseValue(value);
    createText(`command not found: ${value}`)
  }
}

function trueValue(value){
  
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess")
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value){
  
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error")
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text, classname){
  const p = document.createElement("p");
  
  p.innerHTML =
  text
  ;
  app.appendChild(p);
}

function createCode(code, text){
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML =
 `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
}

open_terminal();