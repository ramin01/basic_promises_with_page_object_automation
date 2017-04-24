// Describes the Visit Details modal that appears when a user has clicked the 'Details' button
// (which is seen on a Patient Information page's "Visit" tab section in the data grid

import {ElementFinder, $} from "protractor";
import {TabVisitInformation} from "./tabVisitInformation";
import {TabDiagnosis} from "./tabDiagnosis";

export class VisitDetailsModal {

    container: ElementFinder;

    title: ElementFinder;
    visitDate: ElementFinder;
    editVisit: ElementFinder;
    closeButton: ElementFinder;

    private actionMessage: ElementFinder;      // occurs once an action has been performed

    visitInformationSection: TabVisitInformation;
    diagnosisSection: TabDiagnosis;

    constructor() {

        this.container = $('modal-content');     // use this to ensure the elements found below are only in the container

        this.title = this.container.$('span.detailsModal-header-title');
        this.visitDate = this.container.$('span.detailsModal-header-date');
        // this.editVisit = this.container.$('');                               // Not yet instantiated
        this.closeButton = this.container.$('div.close-button');

        this.visitInformationSection = new TabVisitInformation(this.container.$('tab-content'));
    }

    setDiagnosisInfo() {
        this.diagnosisSection = new TabDiagnosis(this.container.$('tab-content'));
    }

    editTheVisit() {

        let cancelButton = this.container.$('');
        let saveButton = this.container.$('');

        this.editVisit.click();
        this.setActionMessage();
        expect(this.getEditResultText()).toBe("Editing Visit");

        /** TODO: Add the code here to edit the visit
         *      - update the above to accept an array of arguments
         *      - for each argument
         *          - determine what it is that they want to edit
         *          - input that into the proper input field
         */

        saveButton.click();

        this.setActionMessage();
        expect(this.getEditResultText()).toBe("Visit Changes Saved");
    }

    setActionMessage() {
        this.actionMessage = $('');
    }

    getEditResultText() {
        if (this.actionMessage.isPresent()) {
            return this.actionMessage.getText();
        } else {
            // TODO : Add some PROMISE stuff here to return 'No result set'
            // TODO : Set the above to return Promise<string>
        }
    }

    isPresent(): Promise<boolean> {
        return new Promise(()=> { this.container.isPresent(); });
    }
}
