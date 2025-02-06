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
    else{
            let parent = Amount.parentElement;
            Amount.parentElement.classList.remove("errorInput");
            Amount.previousElementSibling.classList.remove("errorLabel");
            parent.nextElementSibling.textContent ="";
            parent.nextElementSibling.classList.remove("errorMsg")        

    }
    if(Year.value ==""||Year.value ==null){
        InvalidInput(Year)
    }
    else{
        ValidInput(Year)
    }
    if(InterestRate.value==""|| InterestRate.value==null){
        InvalidInput(InterestRate)
    }
    else{
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
    }
    console.log(monthlyAmount)
    console.log(totalAmount)

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
function PaymentCheck(){
    let isSelect = false;
    paymentType.forEach((radio)=>{ 
        if(!radio.checked){
            let parent = document.querySelector(".payment");
            Array.from(parent.children).forEach((child)=>{
                child.classList.add("errorInput")
            })
            parent.nextElementSibling.innerHTML = "This field is required!";
            parent.nextElementSibling.classList.add("errorMsg");
        }
        else if(radio.checked){
            let parent = document.querySelector(".payment");
            Array.from(parent.children).forEach((child)=>{
                child.classList.remove("errorInput")
            })
            parent.nextElementSibling.innerHTML = "";
            parent.nextElementSibling.classList.remove("errorMsg");

        }

    })

}