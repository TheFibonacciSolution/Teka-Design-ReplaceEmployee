class TekaLogo extends HTMLElement
{
    constructor() {
        super();

    }

    connectedCallback() {
        this.innerHTML = `
<div class="nav-logo">  
        <div class="teka-logo-container teka-logo-border">
            <div class="item">
                <span>T</span>
            </div>
            <div class="item">
                <span>E</span>
            </div>
            <div class="item">
                <span>K</span>
            </div>
            <div class="item">
                <span>A</span>
            </div>
        </div>
    
</div>`;

        this.getElementsByTagName("div")[0].style = this.style;

        let p = document.getElementsByClassName("teka-logo-container")[0],
            lastClientWidth = 0;


        const proc = () => {
            lastClientWidth =  p.clientWidth;
            this.setAttribute(`thickness`, lastClientWidth*.09);

            const items = p.getElementsByClassName("item");
            const size = (lastClientWidth /2);
            const mult = 38/50;
            for (let i = 0; i < items.length; i++) {

                let s = items[i].getElementsByTagName("span")[0].style;
                s.fontSize =  `${size}px`;
                //s.lineHeight = s.height =  `${size*mult}px`;
            }
            //
            // display: inline-block;
            // font-size: 50px;
            // background-color: green;
            // /*new:*/
            // font-family: 'Times New Roman';
            // line-height: 34px;
            // height: 35px;
        }

        proc();
        const resize_ob = new ResizeObserver(function(entries) {
            // since we are observing only a single element, so we access the first element in entries array
            console.log(entries[0]);
            if(lastClientWidth ===  p.clientWidth)
                return;
            proc();
        });

        // start observing for resize
        resize_ob.observe(p);
    }

    disconnectedCallback() {

    }

    static get observedAttributes() {
        return ['thickness'];
    }



    attributeChangedCallback(name, oldValue, newValue) {
        switch (name)
        {
            case `thickness`:
                document.documentElement.style.setProperty(`--logo-border-width`, `${newValue}px`);
                break;
        }
    }
}

customElements.define('teka-logo-element',  TekaLogo);

class NavMenu extends HTMLElement
{
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = ``;

        // start observing for resize
        //resize_ob.observe(p);
    }

    disconnectedCallback() {

    }

    static get observedAttributes() {
        return [''];
    }
}

customElements.define('nav-menu-element',  NavMenu);

class Login extends HTMLElement
{
    constructor() {
        super(); // always call super() first in the constructor.
        // ...
    }

    EmptyOrValue(input) {return input === null || input === undefined ? "" : input;}


    connectedCallback() {
        // ...



        this.innerHTML = `<form>
<p>Email</p>
<input value="${this.EmptyOrValue(this.getAttribute('login-attribute'))}"/>
<p>Password</p>
<input type="password" value="${this.EmptyOrValue(this.getAttribute('password-attribute'))}"/>
<button>Login</button>
</form>`;
    }

    disconnectedCallback() {
        // ...
    }

    static get observedAttributes() {
        return ['email-attribute', 'password-attribute', 'custom-attribute'];
    }



    attributeChangedCallback(name, oldValue, newValue) {

        let setTagValue = (tag, i, val) =>
        {
            var e = this.getElementsByTagName(tag);
            var ei = e[i];
            if(ei !== undefined)
                ei.value = this.EmptyOrValue(val);
        }

        switch (name)
        {
            case 'email-attribute':
                setTagValue("input", 0,newValue);
                break;
            case 'password-attribute':
                setTagValue("input", 1,newValue);
                break;
            case 'custom-attribute':

                var it = this.getElementsByTagName("input");
                for (let i = 0; i < it.length; i++)
                    it[i].style.background = newValue;

                break;
        }
    }
}

customElements.define('login-element', Login);