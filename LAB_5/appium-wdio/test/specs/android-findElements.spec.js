import * as assert from "node:assert";
import {browser, driver} from "@wdio/globals";

describe('Android Elements Test', () => {
    it('Test Autocomplete Country field', async () =>{
        //пошук елемента за XPath
        const appViews = await $('//android.widget.TextView[@content-desc="Views"]');
        await expect(appViews).toBeExisting();

        await appViews.click();

        // пошук елемента за ідентифікатором
        const appAutocomplete = $('~Auto Complete');
        await expect(appAutocomplete).toBeExisting();

        await appAutocomplete.click();

        //пошук елемента за UiAutomator
        const appScreentop = $('android=new UiSelector().text("1. Screen Top")');
        await expect(appScreentop).toBeExisting();

        await appScreentop.click();

        const countryTextInput = $('//android.widget.AutoCompleteTextView[@resource-id="io.appium.android.apis:id/edit"]');
        await expect(countryTextInput).toBeExisting();

        const countryName = 'Ukraine';
        await countryTextInput.setValue(countryName);
        let countryInputValue = await countryTextInput.getText();

        await assert.equal(countryInputValue, countryName, 'Country name not equal to entered');

        await driver.back();
        await driver.back();
        await driver.back();
    });

    it('Test App Short Popup Notification', async () =>{
        const app = await $('//android.widget.TextView[@content-desc="App"]');
        await expect(app).toBeExisting();

        await app.click();

        const appNotification = $('//android.widget.TextView[@content-desc="Notification"]');
        await expect(appNotification).toBeExisting();

        await appNotification.click();

        const appNotifyWText = $('//android.widget.TextView[@content-desc="NotifyWithText"]');
        await expect(appNotifyWText).toBeExisting();

        await appNotifyWText.click();

        const appShortNotification = $('//android.widget.Button[@content-desc="Show Short Notification"]');
        await expect(appShortNotification).toBeExisting();

        await appShortNotification.click();

        const notificationPopup = $('//android.widget.Toast[@text="Short notification"]');
        await expect(notificationPopup).toBeExisting();

        const notificationText = await notificationPopup.getText();
        await assert.equal(
            notificationText,
            "Short notification",
            "Short notification text mismatch" + notificationText
        );

        await driver.back();
        await driver.back();
        await driver.back();
    });

    it('Test LogTextBox', async () =>{
        const text = await $('//android.widget.TextView[@content-desc="Text"]');
        await expect(text).toBeExisting();

        await text.click();

        const logTextBox = $('//android.widget.TextView[@content-desc="LogTextBox"]');
        await expect(logTextBox).toBeExisting();

        await logTextBox.click();

        const logTextBoxInput = $('//android.widget.TextView[@resource-id="io.appium.android.apis:id/text"]');
        await expect(logTextBoxInput).toBeExisting();
        const initialTexBoxText = await logTextBoxInput.getText();

        const addButton = $('//android.widget.Button[@content-desc="Add"]');
        await expect(addButton).toBeExisting();

        await addButton.click();

        const updatedTexBoxText = await logTextBoxInput.getText();

        await assert.notEqual(
            initialTexBoxText,
            updatedTexBoxText,
            "TextBox has not been changed"
        );

        await assert.equal(
            updatedTexBoxText,
            "This is a test\n",
            "TextBox text is different from expected"
        );
    });
});
