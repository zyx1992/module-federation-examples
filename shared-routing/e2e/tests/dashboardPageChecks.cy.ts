import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors, widgets} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {SharedRoutingMethods} from "../methods/methods";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedRoutingMethods = new SharedRoutingMethods()

const sharedRoutingAppChartBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector
    .replace('{selector}', Constants.selectorParts.sharedRoutingAppSelectorsParts.chart.toUpperCase())
const sharedRoutingAppRecentDepositsBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector
    .replace('{selector}', Constants.selectorParts.sharedRoutingAppSelectorsParts.recentDeposits.toUpperCase())
const sharedRoutingAppRecentOrdersBlockSelector = widgets.sharedRoutingAppCommonWidgetSelector
    .replace('{selector}', Constants.selectorParts.sharedRoutingAppSelectorsParts.recentOrders.toUpperCase())

CommonTestData.sharedRoutingAppHosts.forEach((property: { host: number }) => {
    describe("It checks apps' dashboard page", () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host, Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard.toLowerCase())
        })
        it('checks Dashboard text visibility on header', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.header,
                text: Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard,
                visibilityState: 'be.visible'
            })
        })

        it('checks Dashboard header color', () => {
            basePage.checkElementHaveProperty({
                selector: baseSelectors.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.purple
            })
        })

        it('checks hamburger menu button functionality & visibility', () => {
            methodsPage.checkHamburgerMenuFunctionality()
        })

        it('checks that dashboard page can be visited by side menu button', () => {
            methodsPage.visitOnPageByName(Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard,
                Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders, 3000)
        })

        it('checks visit pages buttons block visibility', () => {
            basePage.checkElementVisibility(selectors.sharedRoutingAppSideMenuVisitPageButtonsBlock)
        })

        it('checks that profile & orders page can be visited from dashboard page by click and stays on page after reload', () => {
            methodsPage.transferringThroughPages(Constants.commonConstantsData.sharedRoutingAppPagesComponents.dashboard,
                Constants.commonConstantsData.sharedRoutingAppPagesComponents.orders, Constants.commonConstantsData.sharedRoutingAppPagesComponents.profile)
        })

        it('checks chart block visibility', () => {
            basePage.checkElementVisibility(sharedRoutingAppChartBlockSelector)
        })

        it('checks chart header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppChartBlockSelector,
                text: Constants.elementsText.sharedRoutingApp.chartInfo.today,
                visibilityState: 'be.visible'
            })
        })

        it('checks chart visibility', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppChartBlockSelector, selectors.sharedRoutingAppChart)
        })

        it('checks chart type visibility', () => {
            basePage.checkElementWithTextPresence({
                parentSelector: sharedRoutingAppChartBlockSelector,
                selector: baseSelectors.tspan,
                text: Constants.elementsText.sharedRoutingApp.chartInfo.sales,
                visibilityState: 'be.visible'
            })
        })

        it('checks chart horizontal marks visibility', () => {
            methodsPage.checkElementWithTextPresenceInTextArray({
                textArray: Constants.elementsText.sharedRoutingApp.chartMarks.horizontal,
                parentSelector: sharedRoutingAppChartBlockSelector,
                selector: baseSelectors.tspan
            })
        })

        it('checks chart vertical marks visibility', () => {
            methodsPage.checkElementWithTextPresenceInTextArray({
                textArray: Constants.elementsText.sharedRoutingApp.chartMarks.vertical,
                parentSelector: sharedRoutingAppChartBlockSelector,
                selector: baseSelectors.tspan
            })
        })

        it('checks chart graph appears', () => {
            basePage.checkElementExist({
                selector: selectors.sharedRoutingAppChartGraph,
                isVisible: false,
                notVisibleState: 'not.be.visible'
            })
            basePage.checkElementExist({
                selector: selectors.sharedRoutingAppChartGraph,
                visibleState: 'exist'
            })
        })

        it('checks recent deposits block visibility', () => {
            basePage.checkElementVisibility(sharedRoutingAppRecentDepositsBlockSelector)
        })

        it('checks recent deposits header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppRecentDepositsBlockSelector,
                text: Constants.elementsText.sharedRoutingApp.depositsInfo.recentDeposits,
                visibilityState: 'be.visible'
            })
        })

        it('checks recent deposit sum in deposit block visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppRecentDepositsBlockSelector,
                text: Constants.elementsText.sharedRoutingApp.depositsInfo.sum,
                visibilityState: 'be.visible'
            })
        })

        it('checks recent deposit date in deposit block visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppRecentDepositsBlockSelector,
                text: Constants.elementsText.sharedRoutingApp.depositsInfo.date,
                visibilityState: 'be.visible'
            })
        })

        it('checks deposit block includes button', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppRecentDepositsBlockSelector, baseSelectors.button)
        })

        it('checks deposit block button text', () => {
            basePage.checkChildElementContainText(sharedRoutingAppRecentDepositsBlockSelector, baseSelectors.button,
                Constants.elementsText.sharedRoutingApp.buttonsTexts.viewBalance)
        })

        it('checks deposit block button is not disabled', () => {
            basePage.checkElementState({
                parentSelector: sharedRoutingAppRecentDepositsBlockSelector,
                selector: baseSelectors.button,
                state: 'not.be.disabled'
            })
        })

        it('checks recent orders block visibility', () => {
            basePage.checkElementVisibility(sharedRoutingAppRecentOrdersBlockSelector)
        })

        it('checks recent orders header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: sharedRoutingAppRecentOrdersBlockSelector,
                text: Constants.elementsText.sharedRoutingApp.orders.ordersHeader,
                visibilityState: 'be.visible'
            })
        })

        it('checks recent orders table columns headers visibility', () => {
            methodsPage.checkElementWithTextPresenceInTextArray({
                textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                selector: baseSelectors.tableHeader
            })
        })

        it('checks recent orders table can contain more than one order row', () => {
            basePage.checkElementQuantity({
                parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                selector: selectors.sharedRoutingAppRecentOrderRow,
                quantity: 1,
                state: 'have.length.above'
            })
        })

        it('checks table row contain all required cells', () => {
            methodsPage.checkElementWithTextPresenceInTextArray({
                textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                parentSelector: selectors.sharedRoutingAppRecentOrderRow,
                selector: widgets.recentOrdersWidgetCell,
                childElement: true
            })
        })

        it('checks table row contain all required cells with text', () => {
            basePage.checkElementWithTextPresence({
                textArray: Constants.elementsText.sharedRoutingApp.orders.recentOrdersTableColumnsHeaders,
                parentSelector: selectors.sharedRoutingAppRecentOrderRow,
                selector: widgets.recentOrdersWidgetCell,
                text: Constants.elementsText.sharedRoutingApp.orders.recentOrderInfo,
                visibilityState: 'be.visible'
            })
        })

        it('checks recent orders block includes button', () => {
            basePage.checkChildElementVisibility(sharedRoutingAppRecentOrdersBlockSelector, baseSelectors.button)
        })

        it('checks recent orders block button text', () => {
            basePage.checkChildElementContainText(sharedRoutingAppRecentOrdersBlockSelector, baseSelectors.button,
                Constants.elementsText.sharedRoutingApp.buttonsTexts.seeMoreOrders)
        })

        it('checks recent orders block button is not disabled', () => {
            basePage.checkElementState({
                parentSelector: sharedRoutingAppRecentOrdersBlockSelector,
                selector: baseSelectors.button,
                state: 'not.be.disabled'
            })
        })
    })
})