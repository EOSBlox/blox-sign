import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './ecc.js';
/**
 * `blox-sign`
 * Signs and verify any data given a private key
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BloxSign extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      message: {
        type: String,
      },
      privateKey: {
        type: String,
        observer: "_sign"
      },
      publicKey: {
        type: String,
        observer: "_verify"
      },
      verification: {
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      signature: {
        type: String,
        reflectToAttribute: true,
        notify: true,
      }
    };
  }

  _sign(){
    this.generate(this.message, this.privateKey)
  }
  _verify(){
    this.verify(this.signature, this.message, this.publicKey)
  }

  generate(message, privateKey) {
    return new Promise((resolve, reject) => {
      const ecc = eosjs_ecc;
      if (message && privateKey && ecc.isValidPrivate(privateKey)) {
        const signature = ecc.sign(message, privateKey);
        resolve({signature, privateKey});
      } else {
        reject(Error('Missing or incorect arguments'));
      }
    });
  }


  verify(signature, message, publicKey) {
    return new Promise((resolve, reject) => {
      const ecc = eosjs_ecc;
      if (signature && message && publicKey && ecc.isValidPublic(publicKey)) {
        ecc.verify(signature, message, publicKey)
        .then((verified) => {
          if (verified === true) {
            resolve({status: 200, publicKey: publicKey});
          } else {
            ecc.recover(signature, message)
            .then((publicKey) => {
              resolve({status: 400, publicKey: publicKey});
            })
            .catch((error) => {
              reject(Error(error));
            });
          }
        })
        .catch((error) => {
          reject(Error(error));
        });
      } else {
        reject(Error('Missing or incorect arguments'));
      }
    });
  }

} window.customElements.define('blox-sign', BloxSign);
