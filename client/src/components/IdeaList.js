import IdeasApi from "../services/ideasApi";

class IdeaList {
    #ideaList;
    #ideas;
    #validTags;

    constructor() {
        this.#ideaList = document.getElementById('idea-list');
        this.#ideas = [];
        this.getIdeas();

        this.#validTags = new Set();
        this.#validTags.add('technology');
        this.#validTags.add('education');
        this.#validTags.add('health');
        this.#validTags.add('inventions');
        this.#validTags.add('business');
    }

    async getIdeas() {
        try {
            const { data } = await IdeasApi.getIdeas();
            this.#ideas = data.data;

            this.render();

        } catch (error) {   
            console.log(error);
        }
    }

    addIdeaToList(idea) {
        this.#ideas.push(idea);
        this.render();
    }

    getTagsClass(tag) {
        tag = tag.toLowerCase();
        let tagClass = '';

        if (this.#validTags.has(tag)) {
            tagClass = `tag-${tag}`
        } else {
            tagClass = ''
        }

        return tagClass;
    }

    render() {
        this.#ideaList.innerHTML = this.#ideas.map(idea => {
            const tagClass = this.getTagsClass(idea.tag);
            
            return `<div class="card">
                <button class="delete"><i class="fas fa-times"></i></button>
                <h3>${idea.text}</h3>
                <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
                <p>
                Posted on <span class="date">
                    ${idea.date.split('T')[0]} ${idea.date.split('T')[1].split('.')[0]}
                </span> by
                <span class="author">${idea.username}</span>
                </p>
                </div>
            `
        }).join('');
    }
}

export default IdeaList;