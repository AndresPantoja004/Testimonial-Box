class TestimonialBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 400px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: var(--bg-color, #ffffff);
          color: var(--text-color, #333);
        }

        .testimonial-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 10px;
        }

        h3 {
          margin: 0;
          color: var(--name-color, #222);
        }

        p {
          font-size: 0.95rem;
          color: var(--comment-color, #555);
        }

        .stars {
          margin-top: 10px;
          color: var(--star-color, #f9be01);
          font-size: 1.2rem;
        }

        .user-info-container {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-around;
        }

        .info-user {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .info-user span {
          font-weight: bold;
          color: var(--comment-color, #555);
        }

        .separator {
          width: 100%;
          height: 2px;
          background-color: var(--star-color, #f9be01);
          margin: 15px 0;
        }

        ::slotted([slot="cite"]),
        ::slotted([slot="insti"]),
        ::slotted([slot="coment"]) {
          color: var(--comment-color, #555);
        }
      </style>

      <div class="testimonial-container">
        <div class="user-info-container">
          <div class="avatar-container">
            <img id="avatar" src="" alt="Foto de la persona">
            <h3><slot name="name">Anónimo</slot></h3>
          </div>
          <div class="info-user">
            <span>Institución</span>
            <slot name="insti">Sin institución</slot>
          </div>
        </div>

        <div class="separator"></div>

        <p><slot name="coment">Sin comentario.</slot></p>
        <div class="stars" id="stars"></div>

        <slot></slot>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['name', 'avatar', 'coment', 'resenia', 'insti'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const avatar = this.getAttribute('avatar') || 'https://png.pngtree.com/png-clipart/20230823/original/pngtree-user-avatar-icon-profile-silhouette-picture-image_8204639.png';
    const resenia = parseInt(this.getAttribute('resenia')) || 0;

    this.shadowRoot.getElementById('avatar').src = avatar;

    const starsContainer = this.shadowRoot.getElementById('stars');
    const starCount = Math.min(resenia, 5);
    starsContainer.innerHTML = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
  }
}

customElements.define('testimonial-box', TestimonialBox);
