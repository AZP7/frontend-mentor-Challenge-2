const Amount = document.getElementById("Amount");
const Year = document.getElementById("Year");
const InterestRate = document.getElementById("InterestRate");
const amount = document.getElementById("Amount");
const paymentType = document.getElementsByName("paymentType");



document.getElementById("CalculateBtn").addEventListener("click",(e)=>{
        e.preventDefault();
    
    let monthlyAmount; 
    let totalAmount;
    if(Amount.value==""||Amount.value ==null){
            let parent = Amount.parentElement;
            if(Amount.value.trim().length ===0){
                Amount.parentElement.classList.add("errorInput");
                Amount.previousElementSibling.classList.add("errorLabel");
                parent.nextElementSibling.textContent =`This field is required!`
                parent.nextElementSibling.classList.add("errorMsg")
            }
    }
    else if(Amount.value>0){
            let parent = Amount.parentElement;
            Amount.parentElement.classList.remove("errorInput");
            Amount.previousElementSibling.classList.remove("errorLabel");
            parent.nextElementSibling.textContent ="";
            parent.nextElementSibling.classList.remove("errorMsg")        
    }
    if(Year.value ==""||Year.value ==null){
        InvalidInput(Year)
    }
    else if(Year.value >0){
        ValidInput(Year)
    }
    if(InterestRate.value==""|| InterestRate.value==null){
        InvalidInput(InterestRate)
    }
    else if(InterestRate.value>0) {
        ValidInput(InterestRate)
    }
    PaymentCheck()
    if (Amount.value && Year.value && InterestRate.value) {
        let loanAmount = Amount.value;
        let loanInterestrate = InterestRate.value;
        let Repaymentyear = Year.value;
    
        // Convert annual interest rate to monthly and years to months
        loanInterestrate = ((loanInterestrate / 100) / 12);
        Repaymentyear = Repaymentyear * 12;
    
        // Correct formula for monthly payment calculation
        monthlyAmount = loanAmount * loanInterestrate * Math.pow((1 + loanInterestrate), Repaymentyear) / 
                        (Math.pow((1 + loanInterestrate), Repaymentyear) - 1);
        
        monthlyAmount = monthlyAmount.toFixed(2)
        totalAmount = monthlyAmount * Repaymentyear;
        totalAmount = totalAmount.toFixed(2);
        document.querySelector(".empty_state").style.display = "none";
        document.querySelector(".resultDisplay").style.display = "flex";
        document.getElementById("payMonth").textContent = `₤ ${monthlyAmount}`;
        document.getElementById("payTotal").textContent = `₤ ${totalAmount}`;
    }
    })

document.getElementById("clear").addEventListener("click",(e)=>{
    e.preventDefault;
    document.getElementById("myForm").reset();
})

function InvalidInput(element){
    let parent = element.parentElement;
    if(element.value.trim().length===0){
        element.parentElement.classList.add("errorInput");
        element.nextElementSibling.classList.add("errorLabel");
        parent.nextElementSibling.innerHTML =`This field is required!`
        parent.nextElementSibling.classList.add("errorMsg")
    }
}
function ValidInput(element){
    let parent = element.parentElement;
    parent.classList.remove("errorInput");
    parent.nextElementSibling.classList.remove("errorMsg");
    parent.nextElementSibling.textContent="";
    element.nextElementSibling.classList.remove("errorLabel");
    
}
function PaymentCheck() {
    let isPaymentSelected = false;
    const parent = document.querySelector(".payment");
    const errorElement = parent.nextElementSibling;
  
    // Check if at least one radio is selected
    paymentType.forEach((radio) => {
      if (radio.checked) {
        isPaymentSelected = true;
      }
    });
  
    // Apply error state if no selection
    if (!isPaymentSelected) {
      Array.from(parent.children).forEach((child) => {
        child.classList.add("errorInput");
      });
      errorElement.innerHTML = "This field is required!";
      errorElement.classList.add("errorMsg");
    } else {
      Array.from(parent.children).forEach((child) => {
        child.classList.remove("errorInput");
      });
      errorElement.innerHTML = "";
      errorElement.classList.remove("errorMsg");
    }
  }