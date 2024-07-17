class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
                width: 100%;
                background-color: #131842;
                color: #ECCEAE;
                position: fixed;
            }

            div {
                padding: 8px 60px;
            }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `      
            <div>
                <h1 class="brand-name">NotesApp</h1>
            </div>
        `;
    }
}

customElements.define('app-bar', AppBar);