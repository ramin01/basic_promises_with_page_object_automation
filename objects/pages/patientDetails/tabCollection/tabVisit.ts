// Describes the "Visit" tab section seen on the Patient Details page

import {$, browser, ElementFinder} from 'protractor';
import {Tab} from "../class_Tab";
import {ColumnHeader} from "../../elements/columnHeader";
import {VisitDetailsModal} from "../visitModal/visitDetailsModal";
import {Checkbox} from "../../elements/checkbox";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";
import {async} from "q";
import {promise} from "selenium-webdriver";
import {NavigationMethods} from "../../../../utils/navigationUtilities";

export class VisitTab extends Tab {

    private initializePromise: Promise<void>;

    showDischargedVisits_checkbox: Checkbox;
    createVisit_button: ElementFinder;            // not yet implemented

    admissionDateHeader: ColumnHeader;
    visitTypeHeader: ColumnHeader;
    mrnHeader: ColumnHeader;
    serviceProviderHeader: ColumnHeader;
    visitNoHeader: ColumnHeader;
    accountNumberHeader: ColumnHeader;
    locationHeader: ColumnHeader;

    visits: VisitRow[];

    visitsModal: VisitDetailsModal;

    constructor() {
        // console.log("  In constructor for 'VisitTab'");
        super($('li.patient-visit-tab'));
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'VisitTab'");

        if(!this.initializePromise) {
            await super.initialize();

            // await ElementMethods.initializationMessage(null, 'VisitTab');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                return super.initialize().then( async ()=> {
                    this.showDischargedVisits_checkbox = await ElementFactory.make(Checkbox, this.tabContentContainer.$('div.tab-actions'));
                    // this.createVisit_button = this.tabContentContainer.$('');            // not yet implemented

                    this.admissionDateHeader = await ElementFactory.make(ColumnHeader, $('th.visit-tableHeader-admissionDate'));
                    this.visitTypeHeader = await ElementFactory.make(ColumnHeader, $('th.visit-tableHeader-type'));
                    this.mrnHeader = await ElementFactory.make(ColumnHeader, $('th.visit-tableHeader-mrn'));
                    this.serviceProviderHeader = await ElementFactory.make(ColumnHeader, $('th.visit-tableHeader-serviceProvider'));
                    this.visitNoHeader = await ElementFactory.make(ColumnHeader, $('th.visit-tableHeader-externalVisitNumber'));
                    this.accountNumberHeader = await ElementFactory.make(ColumnHeader, $('th.visit-tableHeader-accountNo'));
                    this.locationHeader = await ElementFactory.make(ColumnHeader, $('th.visit-tableHeader-location'));

                    // this.visitsModal = new VisitDetailsModal();
                    this.visitsModal = await ElementFactory.make(VisitDetailsModal, null);

                    return this.setVisitsArray().then(async ()=> {
                        await this.admissionDateHeader.initialize();
                        await this.visitTypeHeader.initialize();
                        await this.mrnHeader.initialize();
                        await this.serviceProviderHeader.initialize();
                        await this.visitNoHeader.initialize();
                        await this.accountNumberHeader.initialize();
                        await this.locationHeader.initialize();

                        return resolve();
                    })
                });
            });
        }

        return this.initializePromise;
    }

    // This will get the rows, put them into the 'visits' array, and initialize each row to make sure it's usable
    async setVisitsArray(): Promise<any> {
        // console.log("   In 'setVisitsArray()' for 'VisitTab'");
        return ElementMethods.getCustomElementArray('tr.visit-tableRow', 'VisitRow').then(async (visitsArray)=> {
            let resolvingPromise;
            this.visits = await visitsArray;

            for (let i = 0; i < this.visits.length; i++) {
                // console.log("Initializing data row " + i);
                resolvingPromise = await this.visits[i].initialize();
            }

            return resolvingPromise;
        });
    }

    // will open a Visit modal
    async openViewModal(): Promise<void> {
        // console.log("   In 'openViewModal()' for 'VisitTab'");

        // clicking the Visit No twice to ensure the first visit row has a Visit Number that can be clicked (opening the modal)
        await this.sortBy(this.visitNoHeader);
        await this.sortBy(this.visitNoHeader);
        return this.visits[0].clickVisitNo().then(async ()=> {
            return this.visitsModal.initialize();
        });
    }

    private async sortBy(header: ColumnHeader): Promise<void> {
        return header.click().then(() => {
            return this.setVisitsArray();
        });
    }

    // this will return the admission date of the visit that's being opened.  The date is needed to verify the date in the Modal
    // TODO: FINISH THIS!
    // openTheVisitsModal(): Promise<any> {
    //     if (this.visitsModal.isPresent()) {
    //         browser.driver.navigate().refresh();   // Refreshing the page will git rid of the modal if it's already open
    //     }
    //     let visit = this.visits[0];
    //     let visitData: {
    //          admissionDate: string,
    //          type: string,
    //          mrn: string,
    //          serviceProvider: string,
    //          visitNo: string,
    //          accountNo: string,
    //          location: string
    //     } = {
    //
    //     }
    //
    //     return visit.getAdmissionDate().then(function(date) {
    //         return visit.click().then(function() {
    //             return date;
    //         });
    //     })
    // }
}


export class VisitRow {

    private initializePromise: Promise<void>;

    admissionDate: ElementFinder;
    type: ElementFinder;
    mrn: ElementFinder;
    serviceProvider: ElementFinder;
    visitNo: ElementFinder;
    accountNumber: ElementFinder;
    location: ElementFinder;

    constructor(private element: ElementFinder) {
        // console.log("  In constructor for 'VisitRow'");
    };

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'VisitRow'");

        if(!this.initializePromise) {
            // await ElementMethods.initializationMessage(this.element, 'VisitRow');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.admissionDate = await this.element.$('td.visit-tableCell-admissionDate');
                this.type = await this.element.$('td.visit-tableCell-visitTypeCode');
                this.mrn = await this.element.$('td.visit-tableCell-mrn');
                this.serviceProvider = await this.element.$('td.visit-tableCell-serviceProviderId');
                this.visitNo = await this.element.$('td.visit-tableCell-externalVisitNumber');
                this.accountNumber = await this.element.$('td.visit-tableCell-accountNumber');
                this.location = await this.element.$('td.visit-tableCell-locationId');

                return resolve();
            });
        }

        return this.initializePromise;
    }


    async getAdmissionDate(): Promise<string> {
        return this.admissionDate.getText();
    }

    async getType(): Promise<string> {
        return this.type.getText();
    }

    async getMRN(): Promise<string> {
        return this.mrn.getText();
    }

    async getServiceProvider(): Promise<string> {
        return this.serviceProvider.getText();
    }

    async getVisitNo(): Promise<string> {
        return this.visitNo.getText();
    }

    async getAccountNumber(): Promise<string> {
        return this.accountNumber.getText();
    }

    async getLocation(): Promise<string> {
        return this.location.getText();
    }

    async clickVisitNo(): Promise<any> {
        // console.log("   In 'clickVisitNo()' for 'VisitRow'");

        return this.visitNo.getText().then((visitNumber)=> {
            // console.log(`      ... the visit number is ${visitNumber}`);
            if (visitNumber === "") {
                throw "This row does not contain a Visit Number, meaning it cannot be clicked and the modal cannot be opened from here";
            } else {
                return this.visitNo.click();
            }
        });
    }

    // // TODO: Finish this!
    // // async getVisitDetails() {
    // //     return this.getAdmissionDate().then(function(admissionDate) {
    // //         return this.getType().then(function(type) {
    // //             return this.getMRN().then(function(mrn) {
    // //                 return this.getServiceProvider().then(function(serviceProvider) {
    // //                     return this.getVisitNo().then(function(visitNo) {
    // //                         return this.getAccountNumber().then(function(accountNo) {
    // //                             return this.getLocation().then(function(location) {
    // //                                 enum VisitDetails {
    // //                                     admissionDate = admissionDate,
    // //
    // //                                 }
    // //                             });
    // //                         });
    // //                     });
    // //                 });
    // //             });
    // //         });
    // //     });
    // // }

}
