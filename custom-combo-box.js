import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';

class CustomComboBox extends PolymerElement {
  static get is() {
    return 'custom-combo-box';
  }

  static get template() {
    return html`
      <vaadin-combo-box on-custom-value-set="searchTextChanged"
                        id="combo"
                        filter="{{searchText}}"
                        filtered-items="[[suggestions]]"
                        item-value-path="id"
                        item-label-path="name">
      </vaadin-combo-box>`;
  }

  static get properties() {
    return {
      suggestions: {
        type: Array,
        value: [],
        // observer: 'observeSuggestions', // TODO: uncomment to see 10 items
      },

      searchText: {
        type: String,
        observer: 'searchTextChanged',
      },
    }
  }

  get comboElement() {
    return this.$.combo;
  }

  searchTextChanged(text) {
    if (text && text.length)
      this.suggestions = new Array(11).fill(0).map((_, i) => ({id: i, name: `text${i}`}))
  }

  observeSuggestions() {
    afterNextRender(this, () =>
      this.comboElement.$.overlay._selector.dispatchEvent(new CustomEvent('iron-resize')));
  }
}

customElements.define(CustomComboBox.is, CustomComboBox);