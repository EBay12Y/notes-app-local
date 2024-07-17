class FooterBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._style = document.createElement("style");
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
                width: 100%;
                background-color: #131842;
            }

            div.container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 16px 20px;
                text-align: center;
            }

            .app-brand-footer {
                font-size: 20px;
                font-weight: 600;
                color: #ECCEAE;
                margin-bottom: 8px;
            }
            
            .main-footer {
                font-size: 12px;
                color: #ECCEAE;
            }

            @media (min-width: 600px) {
                div.container {
                    flex-direction: row;
                    justify-content: space-between;
                    text-align: left;
                    padding: 32px 60px;
                }

                .app-brand-footer {
                    font-size: 30px;
                    margin-bottom: 0;
                }
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
            <div class="container">
                <div class="app-brand-footer">NotesApp</div>
                <div class="main-footer">Copyright &copy; Eka Bayu Satriawan. All rights reserved.</div>
            </div>
        `;
    }
}

customElements.define('footer-bar', FooterBar);
