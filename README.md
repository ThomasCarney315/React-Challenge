Development Tasks:

The project at overture-html-css-react-test.zip contains an invoice with a payment form. For the purpose of this coding exercise, the code calls no back-end APIs (the code assumes that the payment is processed successfully). The readme.md file should contain the instructions you need to get going, but please let me know if you have trouble getting the project running.

Please use the provided files to complete the following tasks and send the modified files to me.

1. This page originally used jQuery and has been partially transitioned into React. In /index.html, you'll notice that the displayFieldsBasedOnPaymentMethod function displays fields dynamically depending on what payment method is selected, and also synchs the values for the cardholder name and name on account fields. Please change the application so that this logic is handled within the React application rather than using jQuery.
2. We would like to enhance the payment form design to achieve a more polished and professional look. Please see mockup.png in the root of the project, which is based on some elements from the checkout form that QuickBooks uses. Please make the payment form look as similar to the mockup as possible, but with these changes:
a. Use the "loose-caps" class, which already exists, for the "PAYMENT AMOUNT" text
b. Use the $serif font-family, which is defined in the SCSS.
c. For the credit card and bank icons, please use the files at img/credit-card.svg and img/bank.svg
d. For the credit card icons below Name on card, please display a Visa, Mastercard, Discover and American Express logo. These are all available in img/cards.png
e. For the disclaimer text above the button, please use this text, but use the current date: "By selecting Pay, I authorize Overture Law, P.C. to charge $300.00 to my card on June 28, 2023."
f. For the button at the bottom, and the actively highlighted payment method (credit or bank), we can use the $link-blue color as an accent. (Do this for the button rather than the green shown in the mockup)
g. Please use the img/lock.svg icon for the padlock on the "Pay" button in the mockup.

I appreciate your time and effort in completing this coding exercise. If you have any further questions or require clarifications, please let me know. Good luck!

To set up the project:
`npm i`

To compile the JS and CSS, use any of these three:
```
npm run dev
npm run watch
npm run production
```

To test the project:
`npm start`

