import { LightningElement } from 'lwc';
import { getsessions } from 'data/sessionService';
export default class SessionList extends LightningElement {

    sessions = [];

    connectedCallback() {
        getsessions().then(result => {
            this.sessions = this.allSessions = result;
        });
    }

    handleSearchKeyInput(event) {
        const SearchKey = event.target.value.toLowerCase();
        this.sessions = this.allSessions.filter(
            session => session.name.toLowerCase().includes(SearchKey));
    }

    handleSessionClick(event) {
        const index = event.currentTarget.dataset.index;
        const navigateEvent = new CustomEvent('navigate', {
            detail: {
                state: 'details',
                sessionId: this.sessions[index].id
            }
        });
        this.dispatchEvent(navigateEvent);
    }
}