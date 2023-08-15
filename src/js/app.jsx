import React, { useMemo, useState } from "react";
import { createRoot} from "react-dom/client";

const InvoiceApp = () => {

  const [paymentMade, setPaymentMade] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const submitPaymentForm = function(e) {
    e.preventDefault();

    if (formSubmitting) {
        console.log('form is already being submitted, preventing double submit');
        return;
    }


    let errors = [];
    let $errorFields = [];
    setErrors(errors, $errorFields);

    var authData = {"paymentApiKey": "TestPaymentKey"};

    var cardData = {};
    var bankData = {};
    var secureData = {};
    secureData.authData = authData;

    let paymentMethod = $("[name=paymentMethod]:checked").val();
    if (paymentMethod == 'creditCard') {
        cardData.cardNumber = cardJs.getCardNumber().replace(/[^0-9]/gi,'');
        cardData.month = cardJs.getExpiryMonth().replace(/[^0-9]/gi,'');
        cardData.year = cardJs.getExpiryYear().replace(/[^0-9]/gi,'');
        cardData.cardCode = cardJs.getCvc().replace(/[^0-9]/gi,'');
        cardData.zip = $("[name=zipCode]").val().trim();
        cardData.fullName = cardJs.getName().trim();
        secureData.cardData = cardData;
        if (cardData.month.length == 0 || cardData.year.length == 0) {
            errors.push("Please provide a valid expiration date.");
        }
    } else if (paymentMethod == 'bankAccount') {
        
        let accountNumber = $("[name=accountNumber]").val().trim();
        let accountNumberConfirm = $("[name=accountNumberConfirm]").val().trim();
        if (accountNumber != accountNumberConfirm) {
            errors.push("Account Number and Confirm Account Number do not match.");
        }
        let nameOnAccount = $("[name=nameOnAccount]").val().trim();
        let routingNumber = $("[name=routingNumber]").val().trim();
        let accountType = $("[name=accountType]").val().trim();
        bankData = {
            "accountNumber": accountNumber,
            "routingNumber": routingNumber,
            "nameOnAccount": nameOnAccount,
            "accountType": accountType,
        };
        secureData.bankData = bankData;
    }

    if (errors.length > 0) {
        setErrors(errors, $errorFields);
        setFormSubmitting(false);
        return;
    }

    // Future code will submit the object above
    console.log('This will be submitted:', authData, cardData, bankData, secureData)

    setShowPaymentModal(false);
    setShowPaymentSuccessModal(true);
    setFormSubmitting(false);
 };

  return (
    <div>

      {paymentMade && 
        <div className="invoice-status-bar invoice-status-bar--paid invoice-status-bar--client-facing">
          <div className="invoice-status-bar__text text--center">
              This invoice was paid on <b>{{payment_made_at}}</b>.
          </div>
        </div>}

      <div className="preview preview--client-facing">
        <div className="preview__wrapper">
          <div className="preview__overview">
            <div className="preview__overview__issues">
              <div className="preview__overview__issues__field">Invoice No.
                <b>#OV-0001</b>
              </div>
              <div className="preview__overview__issues__field">Issue Date
                <b>3/3/2023</b>
              </div>
              <div className="preview__overview__issues__field">Due Date <b>Upon Receipt</b></div>
              <div className="preview__overview__issues__field">
                Total Due <b>$300.00</b>
              </div>
              <div className="preview__overview__issues__field preview__overview__issues__field--pay-now">
                <button onClick={(e) => setShowPaymentModal(true)} className="pay-now pay-button preview__footer__send-actions__button m-t-0_75">PAY NOW</button>
              </div>
            </div>
            <img className="preview__overview__logo" src="img/lfbrown-sm.png" alt="logo"/>
            <div className="preview__overview__creator">
              <div className="preview__overview__creator__full-name">Bob Loblaw, Esq.</div>
              <div className="preview__overview__creator__email">bloblaw@lfbrown.law</div>
            </div>
          </div>
          <div className="preview__content">
            <div className="preview__header">
              <div className="preview__header__client">
                <div className="loose-caps">
                  Bill
                  To
                </div>
                <div className="preview__header__client-name">Sean Williams</div>
                <div className="preview__header__client-email">swilliams@overture.law</div>
              </div>
              <h1 className="preview__header__title">Invoice</h1>
            </div>
            
            <div className="preview__tables">
              <div className="billing-table billing-table--viewonly">
                <div className="billing-table__outer-head">
                  <h2 className="loose-caps">Time</h2>
                </div>
                <table role="table" className="table time-entry-table">
                  <thead>
                    <tr role="row">
                      <th colSpan="1" role="columnheader" style={{"minWidth": "0px", "width": "150px"}}><span>Date</span></th>
                        <th colSpan="1" role="columnheader" style={{"minWidth": "0px", "width": "auto"}}><span>Description</span></th>
                        <th colSpan="1" role="columnheader" style={{"minWidth": "0px", "width": "150px"}}><span>Duration</span></th>
                        <th colSpan="1" role="columnheader" style={{"minWidth": "0px", "width": "150px"}}><span>Rate</span></th>
                        <th colSpan="1" role="columnheader" style={{"minWidth": "0px", "width": "100px"}}><span>Amount</span></th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    <tr className="billing-table__tr billing-table__tr--team-member">
                      <td colSpan="5">Bob Loblaw</td>
                    </tr>
                    <tr className="billing-table__tr " role="row">
                      <td role="cell" className="td-date billing-table__td">3/3/2023</td>
                      <td role="cell" className="td-description billing-table__td">Drafted an independent contractor agreement.</td>
                      <td role="cell" className="td-duration billing-table__td">2</td>
                      <td role="cell" className="td-rate billing-table__td">$150.00/hr</td>
                      <td role="cell" className="td-amount billing-table__td">$300.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br className="hide-767-down"/>
            </div>
            
            <div className="preview__footer">
              <div className="preview__footer__summary">
                <div className="preview__sum-items">
                  <div className="preview__sum-item">
                    <h5 className="preview__sum-item__header">Time</h5>
                    <div className="preview__sum-item__group">
                      <div className="preview__sum-item__key"><span> Total Time </span></div>
                      <div className="preview__sum-item__value"><span>2 hrs</span></div>
                    </div>
                    <div className="preview__sum-item__group">
                      <div className="preview__sum-item__key"><span> Subtotal </span></div>
                      <div className="preview__sum-item__value"><span> $300.00 </span></div>
                    </div>
                  </div>
                  <h3 className="preview__footer__summary__receipt">Total Due Upon Receipt <span>$300.00</span></h3>
                </div>
              </div>

              <div className="preview__footer__recipients-and-message">
              </div>
              <div className="preview__footer__send-actions m-t-1">
                
                  <div className="preview__footer__send-actions__buttons">
                    <button onClick={(e) => setShowPaymentModal(true)} className="pay-now pay-button preview__footer__send-actions__button">
                      PAY NOW
                    </button>
                  </div>
                
              </div>
            </div>
          </div>
          <a href="https://overture.law">
            <div className="preview__mark">Invoice built with:<img src="img/overture-logo-black.svg" alt="Overture" /> </div>
          </a>
        </div>
      </div>

      <div className={"payment-modal " + (showPaymentModal ? "" : "payment-modal--hidden") + (formSubmitting ? "payment-modal--submitting" : "")} onClick={(e) => setShowPaymentModal(false)}>
          <div className="payment-modal__container center-block" onClick={(e) => e.stopPropagation()}>
              <form id="paymentForm" method="post" action="/" onSubmit={submitPaymentForm}>
                  <div className="payment-modal__form">
                      <div className="payment-modal__payment-method">
                          <input id="bankAccount" type="radio" name="paymentMethod" defaultChecked="checked" value="bankAccount" /> <label htmlFor="bankAccount">Bank Account</label>
                          <input id="creditCard" type="radio" name="paymentMethod" value="creditCard" /> <label htmlFor="creditCard">Credit Card</label>
                      </div>
                      <div className="payment-modal__inputs payment-modal__inputs--bank-account">
                          <div className="payment-modal__inputs__input--full-width">
                              <label htmlFor="nameOnAccount">Name on Account</label>
                              <input type="text" name="nameOnAccount" autoComplete="cc-name" /> 
                          </div>
                          <div className="payment-modal__inputs__input">
                              <label htmlFor="accountType">Account Type</label>
                              <select name="accountType">
                                  <option value=""></option>
                                  <option value="checking">Checking</option>
                                  <option value="businessChecking">Business Checking</option>
                                  <option value="savings">Savings</option>
                              </select>
                          </div>
                          <div className="payment-modal__inputs__input">
                              <label htmlFor="routingNumber">Routing Number</label>
                              <input type="text" name="routingNumber" id="routingNumber" inputMode="numeric" maxLength="9" />
                          </div>
                          <div className="payment-modal__inputs__input">
                              <label htmlFor="accountNumber">Account Number</label>
                              <input type="text" name="accountNumber" id="accountNumber" inputMode="numeric" maxLength="17" />
                          </div> 
                          <div className="payment-modal__inputs__input">
                              <label htmlFor="accountNumberConfirm">Confirm Account Number</label>
                              <input type="text" name="accountNumberConfirm" id="accountNumberConfirm" inputMode="numeric" maxLength="17" /> <br /><br />
                          </div>
                          
                      </div>
                      <div id="card-js" className="payment-modal__inputs payment-modal__inputs--credit-card" style={{"display": "none"}}>
                          <div className="payment-modal__inputs__input payment-modal__inputs__input--full-width">
                              <label htmlFor="cardholderName">Cardholder Name</label>
                              <input type="text" name="cardholderName" className="name" /> 
                          </div>
                          <div className="payment-modal__inputs__input payment-modal__inputs__input--full-width">
                              <label htmlFor="cardNumber">Card Number</label>
                              <input type="text" className="card-number" name="cardNumber" placeholder="1234 1234 1234 1234" inputMode="numeric" autoComplete="cc-number" />
                          </div>
                          <div className="payment-modal__inputs__input">
                              <label htmlFor="expiration">Expiration</label>
                              <input type="text" name="expMonth" className="expiry-month" inputMode="numeric" autoComplete="cc-exp-month"  /> 
                              <input type="text" name="expYear" className="expiry-year" inputMode="numeric" autoComplete="cc-exp-year" /> 
                          </div>
                          <div className="payment-modal__inputs__input payment-modal__inputs__input--one-sixth">
                              <label htmlFor="cardCode">CVC</label>
                              <input type="text" name="cardCode" className="cvc" inputMode="numeric" autoComplete="cc-csc" />
                          </div>
                          <div className="payment-modal__inputs__input payment-modal__inputs__input--one-third">
                              <label htmlFor="zipCode">Zip Code</label>
                              <input type="text" name="zipCode" inputMode="numeric" maxLength="20" /> 
                          </div>
                      </div>
                      <div className="payment-error"></div>
                      <div className="payment-modal__submit-container">
                          <button className="pay-button" type="submit" disabled={formSubmitting}>Pay</button>
                      </div>
                  </div>
              </form>
          </div>
      </div>
      <div className={"payment-success-modal " + (showPaymentSuccessModal ? "" : "payment-success-modal--hidden")} onClick={(e) => setShowPaymentSuccessModal(false)}>
          <div className="payment-success-modal__container" style={{"textAlign":"center"}}  onClick={(e) => e.stopPropagation()}>
              <h2>Payment Received</h2>
              <div>Your payment has been received, and you will be emailed a confirmation.</div>
              <button className="payment-success-modal__container__button button" style={{"margin": "1em auto"}} onClick={(e) => setShowPaymentSuccessModal(false)}>Close</button>
          </div>
      </div>
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<InvoiceApp />);
