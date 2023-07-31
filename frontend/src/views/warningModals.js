
export default class Warning {
    constructor() {
        document.body.innerHTML +=         `
        <div class="modal fade" id="warningModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"></div>
                    <div class="modal-body"></div>
                    <div class="modal-footer"></div>
                </div>
            </div>
        </div>
        `;
        this.modalElement = document.getElementById('warningModal');
    }

    renderWarning(title, text) {
        this.modalElement.getElementsByClassName('modal-header')[0].innerHTML =
            `
                <h1 class="modal-title fs-2" >${title}</h1>
                <h2 class="modal-title fs-5"></h2>
            `;
        this.modalElement.getElementsByClassName('modal-body')[0].innerHTML =
            `
                <p>${text}</p>
            `;
        this.modalElement.getElementsByClassName('modal-footer')[0].innerHTML =
            `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
            `;
        const modal = new bootstrap.Modal(document.getElementById('warningModal'));
        modal.show();

        const timer = this.modalElement.getElementsByTagName('h2')[0];

        timer.innerText = '5'
        let i = 5;
        const textChanger = setInterval(() => {
            i--;
            timer.innerText = `${i}`;
        }, 1000);

        setTimeout(() => {
            clearInterval(textChanger);
            modal.hide();
        }, 4999);

    }

    renderConfirmation(text, action){
        this.modalElement.getElementsByClassName('modal-header')[0].innerHTML =
            `
                <h1 class="modal-title fs-2" >Do you really want to do it?</h1>
            `;
        this.modalElement.getElementsByClassName('modal-body')[0].innerHTML =
            `
                <p>${text}</p>
            `;
        this.modalElement.getElementsByClassName('modal-footer')[0].innerHTML =
            `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="confirmAct">Confirm</button>
            `;
        const modal = new bootstrap.Modal(document.getElementById('warningModal'));
        modal.show();
        document.getElementById('confirmAct').addEventListener('click',() => {
            action();
            modal.hide();
        });
    }
}