let selectedInterest = "SI"; // Default selection

function selectInterest(type) {
  selectedInterest = type;

  // Toggle button styles
  document.getElementById("siBtn").classList.remove("active");
  document.getElementById("ciBtn").classList.remove("active");

  if (type === "SI") {
    document.getElementById("siBtn").classList.add("active");
  } else {
    document.getElementById("ciBtn").classList.add("active");
  }
}

// FD Calculation
function calculateFD() {
  const principal = parseFloat(document.getElementById("fdPrincipal").value);
  const rate = parseFloat(document.getElementById("fdRate").value);
  const time = parseFloat(document.getElementById("fdTime").value);

  if (!principal || !rate || !time) {
    alert("Please fill all fields.");
    return;
  }

  let finalAmount;
  let interestType;

  if (selectedInterest === "SI") {
    finalAmount = principal + (principal * rate * time) / 100;
    interestType = "Simple Interest";
  } else {
    finalAmount = principal * Math.pow(1 + rate / 100, time);
    interestType = "Compound Interest";
  }

  document.getElementById("fdResult").innerHTML = `
    <p><strong>Interest Type:</strong> ${interestType}</p>
    <p><strong>Total Maturity Value:</strong> ₹${finalAmount.toFixed(2)}</p>
  `;
}


// RD Calculation with month-wise breakdown (expandable)
function calculateRD() {
  const amount = parseFloat(document.getElementById("rdAmount").value);
  const rate = parseFloat(document.getElementById("rdRate").value);
  const months = parseInt(document.getElementById("rdMonths").value);
  
  if (!amount || !rate || !months) {
    alert("Please fill all fields.");
    return;
  }

  const annualRate = rate / 100;
  const quarterlyRate = annualRate / 4; // Since it's compounded quarterly
  const n = 4; // Number of compounding periods per year
  const t = months / 12; // Time in years
  
  let maturityValue = 0;
  let breakdown = "";

  // Calculate maturity value using the formula
  for (let i = 1; i <= months; i++) {
    let timeLeft = (months - i + 1) / 12;
    let compoundFactor = Math.pow((1 + quarterlyRate), (n * timeLeft));
    let finalAmount = amount * compoundFactor;
    maturityValue += finalAmount;
    breakdown += `<p><strong>Month ${i}:</strong> ₹${finalAmount.toFixed(2)}</p>`;
  }

  const totalInvestment = amount * months;
  const profit = maturityValue - totalInvestment;

  document.getElementById("rdResult").innerHTML = `
    <p><strong>Total Investment:</strong> ₹${totalInvestment.toFixed(2)}</p>
    <p><strong>Maturity Value:</strong> ₹${maturityValue.toFixed(2)}</p>
    <p><strong>Profit:</strong> ₹${profit.toFixed(2)}</p>
  `;

  document.getElementById("rdExpansion").innerHTML = breakdown;
}

// Expand or collapse RD breakdown
function toggleRDExpansion() {
  const expansion = document.getElementById("rdExpansion");
  if (expansion.style.display === "none") {
    expansion.style.display = "block";
    document.getElementById("expandRD").innerText = "Collapse";
  } else {
    expansion.style.display = "none";
    document.getElementById("expandRD").innerText = "Expand";
  }
}

//----------------------------------------------------------------------------------------------------------------------

// Systematic Investment Plan (SIP) Calculation
// Function to handle buying shares
function buyUnits() {
  const marketRate = parseFloat(document.getElementById("marketRateBuy").value);
  const investmentAmount = parseFloat(document.getElementById("investmentAmount").value);

  if (!investmentAmount || !marketRate) {
    alert("Please enter both investment amount and market rate.");
    return;
  }

  const unitsBought = investmentAmount / marketRate;

  document.getElementById("buyResult").innerHTML = `
    <p><strong>Investment Amount:</strong> ₹${investmentAmount.toFixed(2)}</p>
    <p><strong>Market Rate (Buy Price per unit):</strong> ₹${marketRate.toFixed(2)}</p>
    <p><strong>Units Bought:</strong> ${unitsBought.toFixed(4)}</p>
  `;
}

// Function to handle selling shares
function sellUnits() {
  const unitsOwned = parseFloat(document.getElementById("unitsOwned").value);
  const marketRateSell = parseFloat(document.getElementById("marketRateSell").value);

  if (!unitsOwned || !marketRateSell) {
    alert("Please enter both the number of units you own and the market rate.");
    return;
  }

  const sellingPrice = unitsOwned * marketRateSell;
  const initialInvestment = unitsOwned * parseFloat(document.getElementById("marketRateBuy").value);
  const profitLoss = sellingPrice - initialInvestment;

  document.getElementById("sellResult").innerHTML = `
    <p><strong>Units Owned:</strong> ${unitsOwned.toFixed(4)}</p>
    <p><strong>Market Rate (Sell Price per unit):</strong> ₹${marketRateSell.toFixed(2)}</p>
    <p><strong>Selling Price:</strong> ₹${sellingPrice.toFixed(2)}</p>
    <p style="color: ${profitLoss >= 0 ? 'green' : 'red'};">
      <strong>${profitLoss >= 0 ? "Profit" : "Loss"}: ₹${profitLoss.toFixed(2)}</strong>
    </p>
  `;
}

//---------------------------------------------------------------------------------------------------------------------


// Time Value of Money (TVM) Calculation: Future Value
// Toggle between Even and Uneven Annuity
function selectAnnuity(type) {
  if (type === 'even') {
      document.getElementById("evenAnnuity").style.display = "block";
      document.getElementById("unevenAnnuity").style.display = "none";
      document.getElementById("evenBtn").style.backgroundColor = "#2c8eff"; // blue even
      document.getElementById("unevenBtn").style.color = "black"; // uneven font black
      document.getElementById("unevenBtn").style.backgroundColor = "#d3d3d3"; // grey uneven
      document.getElementById("evenBtn").style.color = "white"; // even still white
  } else {
      document.getElementById("evenAnnuity").style.display = "none";
      document.getElementById("unevenAnnuity").style.display = "block";
      document.getElementById("unevenBtn").style.backgroundColor = "#2c8eff"; // uneven blue
      document.getElementById("evenBtn").style.color = "black"; // even font black
      document.getElementById("evenBtn").style.backgroundColor = "#d3d3d3"; // even grey
      document.getElementById("unevenBtn").style.color = "white"; // uneven still white
  }
}

// ✅ Corrected Formula for Even Annuity Calculation
function calculateEvenAnnuity() {
  const P = parseFloat(document.getElementById("evenAmount").value);
  const r = parseFloat(document.getElementById("evenRate").value) / 100;
  const n = 12; // Monthly compounding
  const t = parseFloat(document.getElementById("evenMonths").value); // Number of months

  if (!P || !r || !t) {
      alert("Please enter all values.");
      return;
  }

  // ✅ Corrected Even Annuity Formula:
  // FV = P * [{(1 + r/n)^(nt) - 1} / (r/n)] * (1 + r/n)
  const i = r / n;
  const FV = P * ((Math.pow(1 + i, t) - 1) / i) * (1 + i);

  document.getElementById("evenResult").innerHTML = `
      <p><strong>Final Value:</strong> ₹${FV.toFixed(2)}</p>
      <p><strong>Total Investment:</strong> ₹${(P * t).toFixed(2)}</p>
      <p><strong>Profit:</strong> ₹${(FV - (P * t)).toFixed(2)}</p>
  `;
}

// ✅ Adding Fields for Uneven Annuity
function addInvestmentField() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="number" placeholder="Investment (₹)" class="uneven-input">`;
  document.getElementById("investmentList").appendChild(div);
}

// ✅ Corrected Formula for Uneven Annuity Calculation
function calculateUnevenAnnuity() {
  const investments = document.querySelectorAll(".uneven-input");
  const r = parseFloat(document.getElementById("unevenRate").value) / 100;
  const n = 12; // Monthly compounding
  const t = parseFloat(document.getElementById("unevenMonths").value); // Number of months

  if (!r || !t) {
      alert("Please enter all values.");
      return;
  }

  let FV = 0;
  let totalInvested = 0;
  const i = r / n;

  investments.forEach((input, index) => {
      const Pi = parseFloat(input.value);
      if (Pi) {
          const remainingMonths = t - index;
          FV += Pi * Math.pow(1 + i, remainingMonths);
          totalInvested += Pi;
      }
  });

  document.getElementById("unevenResult").innerHTML = `
      <p><strong>Final Value:</strong> ₹${FV.toFixed(2)}</p>
      <p><strong>Total Investment:</strong> ₹${totalInvested.toFixed(2)}</p>
      <p><strong>Profit:</strong> ₹${(FV - totalInvested).toFixed(2)}</p>
  `;
}
