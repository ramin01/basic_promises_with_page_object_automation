/**
 *  Description: This will test P1 tests for the contents of the Visit tab found on the Patient Details page
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-55
 */

import {VisitTab} from "../../../objects/pages/patientDetails/visits/tabVisits";
import {NavigationMethods} from "../../../utils/navigationUtilities";

describe('The "Visit" tab on the Patient\'s Details page (from a P1 level)', () => {

    let visitTab: VisitTab;

    beforeAll( (done) => {
        return NavigationMethods.navigateToAPatientPageLikeAUser().then(()=> {
            return NavigationMethods.waitForLoadCompletion('table.visit-table').then(()=> {
                return visitTab = new VisitTab();
            });
        }).then(()=> {
            return visitTab.initialize().then(()=> {
                return done();
            });
        });
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/62 **/
    it('should be present, selected, and have the title "Visit"', () => {
        console.log("The 'Visits' tab on the Patients Details page should match the current year");
        expect<any>(visitTab.actualTab.isPresent()).toBe(true);
        expect<any>(visitTab.isSelected()).toBe(true);
        expect<any>(visitTab.getTabTitle()).toBe("Visits");
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/42 **/
    it('should display the proper elements above the grid', () => {
        console.log("The 'Visits' tab on the Patients Details page should display the proper elements above the grid");
        expect<any>(visitTab.title.isPresent()).toBe(true);
        expect<any>(visitTab.showDischargedVisits_checkbox.isPresent()).toBe(true);
        expect<any>(visitTab.visits.length).toBeGreaterThan(0);
    });

    // /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/64, Expected Result #1 **/
    // // TODO: introduce test once Create Visit button has been implemented
    // xit('should have the checkbox to the left of the Create Visit button', () => {
    //     console.log("The 'Visits' tab on the Patients Details page should have the checkbox to the left of the Create Visit button");
    //     visitTab.showDischargedVisits_checkbox.getLocation().then(function( dischargedVisitsCheckboxLocation ) {
    //         visitTab.createVisit_button.getLocation().then(function( createVisitButtonLocation ) {
    //             expect(dischargedVisitsCheckboxLocation.x).toBeLessThan(createVisitButtonLocation.x)
    //         });
    //     });
    //     expect(visitTab.showDischargedVisits_checkbox.attr('checked') ).toBeFalsy();
    // });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/64, Expected Result #2 **/
    it('should display the correct column headers', () => {
        console.log("The 'Visits' tab on the Patients Details page should display the correct column headers");
        expect<any>(visitTab.admissionDateHeader.isPresent()).toBe(true);
        expect<any>(visitTab.visitTypeHeader.isPresent()).toBe(true);
        expect<any>(visitTab.mrnHeader.isPresent()).toBe(true);
        expect<any>(visitTab.serviceProviderHeader.isPresent()).toBe(true);
        expect<any>(visitTab.visitNoHeader.isPresent()).toBe(true);
        expect<any>(visitTab.accountNumberHeader.isPresent()).toBe(true);
        expect<any>(visitTab.locationHeader.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/65, Expected Result #1 **/
    it('should be default sorted by Admission Date', () => {
        console.log("The 'Visits' tab on the Patients Details page should be default sorted by Admission Date");
        // visitTab.admissionDateHeader.headerElement.getAttribute('class').then(function (headerClass) {
        //     expect(headerClass.indexOf('sorted')).toBeGreaterThanOrEqual(0);
        // });
        expect<any>(visitTab.admissionDateHeader.isBeingUsedForSorting()).toBe(true);
    });

    //  TODO: Look into automating the other Expected Results from https://haemoslalom.testrail.net//index.php?/cases/view/65

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/66, Expected Result #1 **/
    // Note: assumes the patient has >6 visits
    it('should have 6 records on the page', () => {
        console.log("The 'Visits' tab on the Patients Details page should have 6 records on the page");
        expect(visitTab.visits.length).toBe(6);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/66, Expected Result #1 **/
    // Note: assumes the patient has >6 visits
    it('should have correct pagination', () => {
        console.log("The 'Visits' tab on the Patients Details page should have correct pagination");
        expect(visitTab.getNumberOfTotalPages()).toBeGreaterThanOrEqual(1);
    });

    /**
     *  TODO...
     *  - Case 65, #2 -> arrows in headers
     *  - Case 65, #3 -> column headers sort properly
     *  - Case 66, #2 -> Verify pagination
     */

});