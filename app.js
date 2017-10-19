var styles = {
  buttons: {
    color: '#fff',
    marginRight: '5px',
    outline: 'none',
    backgroundColor: '#37a2e5',
    border: 'none',
    padding: '7px 10px',
    cursor: 'pointer'
  },
  content: {
    marginTop: '25px'
  },
  input: {
    marginRight: '15px'
  }
};

var wrap = document.createElement('div');
var contentWrap = document.createElement('div');


function addStyles(styles, el) {
  for ( var attr in styles ) {
    el.style[attr] = styles[attr];
  }
}

// function createTabs() {
//   var tabs = [{name: 'Dynamic', href: 'new-page.html'}, 'Greedy', 'Fib !Matrix', 'Fib Matrix'];

//   var nav = document.createElement('nav');

//   for ( var i = 0; i < tabs.length; i++ ) {
//     var button = document.createElement('a');

//     button.innerText = tabs[i].name;

//     //addStyles(styles.buttons, button);

//     button.setAttribute('href', tabs[i].href)

//     button.setAttribute('class', 'btn btn-primary')

//     nav.appendChild(button);
//     wrap.appendChild(nav);
//   }
  
  
}

function clearContent() {
  while (contentWrap.hasChildNodes()) {
      contentWrap.removeChild(contentWrap.lastChild);
  }
}


function runAlgorithm(tab) {
  var n = Number(document.querySelector('input').value);
  var output = document.querySelector('#content p');
  
  if ( tab == '!matrix' ) {
    // run your matrix algorithm based on the input's value
    
    
    // Perform the algorithm on n
    console.log(n);
    
    n += 10;  

  }
  
  
  output.innerText = n;
}

function showContent(tab) {
  clearContent();
  
  var input = document.createElement('input');
  var submit = document.createElement('button');
  var output = document.createElement('p');
  var clear = document.createElement('a');
  
  if ( tab == '!matrix' ) {
    input.type = 'number';
    
    submit.innerText = 'Run Fib No Matrix';
  }
  
  if ( tab == 'dynamic' ) {
    input.type = 'number';
    
    submit.innerText = 'Run Dynamic Algorithm';
  }

   if ( tab == 'Greedy' ) {
    input.type = 'number';
    
    submit.innerText = 'Run Dynamic Algorithm';
  }
  
  submit.onclick = function() { runAlgorithm(tab); }
  clear.onclick = clearContent;
  
  clear.innerText = 'Reset';
  
  addStyles(styles.input, input);
  contentWrap.appendChild(input);
  contentWrap.appendChild(submit);
  contentWrap.appendChild(output);
  contentWrap.appendChild(clear);
}

function getContent(text) {  
  switch(text) {

    case 'Dynamic':
      showContent('dynamic');
      break;
    case 'Fib !Matrix':
      showContent('fibbonacci');
      break;
    case 'Greedy':
      showContent('greedy');
      break;
    case 'Fib Matrix':
      showContent('matrix');
      break;
    
  }
}

function handleEvent(el) {
  if ( el.tagName == 'BUTTON' )
    getContent(el.innerText);
}

function setListeners() {
  document.querySelector('nav').onclick = function(e) {
    if ( e.target.tagName == 'BUTTON' ) {
      handleEvent(e.target);
    }
  }
}

// Function to start/initialize the application
function init() {
  contentWrap.id = 'content';
  addStyles(styles.content, contentWrap);
  
  createTabs();
  
  wrap.appendChild(contentWrap);
  document.body.appendChild(wrap);
  setListeners();
}

init();





