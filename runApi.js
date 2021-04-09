const createAndAppend = (name, parent, options = {}) => {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([key, value]) => {
    key === 'text' ? elem.textContent = value : elem.setAttribute(key, value)
    }
  );
  return elem;
}

const applyUser = (user) => {
  const userObject = JSON.parse(user);
  const div = document.getElementById('inject-user');
  div.textContent = userObject.name;
  console.log(userObject);
}

const createAndApplyLi = (name, parent, user) => {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  elem.innerHTML = user.name;
  
  const onclickAttribute = document.createAttribute('onclick');
  onclickAttribute.value = `applyUser('${JSON.stringify(user)}')`;
  elem.setAttributeNode(onclickAttribute);
  
  return elem;
}

const runUsers = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    const ul = createAndAppend('ul', document.body);
    data.map(user => createAndApplyLi('li', ul, user)); 
    const div = createAndAppend('div', document.body);
    const elementId = document.createAttribute('id');
    elementId.value = 'inject-user';
    div.setAttributeNode(elementId);
     
  } catch (err) {
    console.error(err.message);
  }
}

window.addEventListener('load', runUsers);