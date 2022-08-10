const modal = document.querySelector('#modal');
const modalHeader = modal.querySelector('h2');
const modalContent = modal.querySelector('article');
const modalExit = modal.querySelector('i a');

const fields = [
    { tag: 'input', attributes: { type: 'text', name: 'title', placeholder: 'Title' } },
    { tag: 'input', attributes: { type: 'text', name: 'Name', placeholder: 'Name' } },
    { tag: 'textarea', attributes: { name: 'abstract', placeholder: 'Write Your Post Here...' } },
    { tag: 'input', attributes: { type: 'submit', value: 'Publish' } }
]

async function loadModalFor(category, id) {
    modalContent.innerHTML = '';
    modal.style.display = 'block';
    if (id === 'new') {
        renderNewBlogForm();
    } else {
        const data = await getItem(category, id);
        renderBlogModal(data);
    }
}

function renderNewBlogForm(){
    modalHeader.textContent = 'Write a Post . . .';
    const form = document.createElement('form');
    fields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        form.appendChild(field);
    })
    form.onsubmit = postBlog;
    modalContent.appendChild(form);
    modalExit.href = `#blogs`;
}

async function postBlog(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        
        const response = await fetch('http://localhost:3000/blogs', options);
        const { id, err } = await response.json();
        if(err) { 
            throw Error(err) 
        } else {
            window.location.hash = `#blogs/${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}


