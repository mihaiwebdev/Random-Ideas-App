import IdeasApi from '../services/ideasApi';
import IdeaList from './IdeaList';

class IdeaForm {
    #modalForm;
    #form;
    #ideaList;

    constructor() {
        this.#modalForm = document.getElementById('form-modal');
        this.#form = '';   
        this.#ideaList = new IdeaList();
    }

    addEventListener() {
        this.#form.addEventListener('submit', this.submitForm.bind(this));
    }

    async submitForm(e) {
        e.preventDefault();

        const idea = {
            text: this.#form.elements.text.value,
            tag: this.#form.elements.tag.value,
        }
        
        if (idea.text === '' || idea.tag === '') {
            alert('Please fill in all fields');
        }
        
        const { data } = await IdeasApi.createIdea(idea);
        this.#ideaList.addIdeaToList(data.data);

        this.#form.elements.tag.value = '';
        this.#form.elements.text.value = '';

        document.dispatchEvent(new Event('closemodal'));

    }

    render() {
        this.#modalForm.innerHTML = 
        `<form id="idea-form">
            <div class="form-control">
                <label for="idea-text">User: <span id=username>mihai</span></label>
            </div>
            <div class="form-control">
                <label for="idea-text">What's Your Idea?</label>
                <textarea name="text" id="idea-text"></textarea>
            </div>
            <div class="form-control">
                <label for="tag">Tag</label>
                <input type="text" name="tag" id="tag" />
            </div>
            <button class="btn" type="submit" id="submit">Submit</button>
        </form>`;

        this.#form = document.getElementById('idea-form');
        this.addEventListener();
    }
}

export default IdeaForm;