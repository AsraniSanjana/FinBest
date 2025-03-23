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



// Systematic Investment Plan (SIP) Calculation
function calculateSIP() {
  const amount = parseFloat(document.getElementById("sipAmount").value);
  const rate = parseFloat(document.getElementById("sipRate").value);
  const months = parseInt(document.getElementById("sipMonths").value);

  if (!amount || !rate || !months) {
    alert("Please fill all fields.");
    return;
  }

  // Future Value formula for SIP
  const futureValue = amount * (((Math.pow(1 + rate / 100, months) - 1) / (rate / 100)) * (1 + rate / 100));

  // Display results as summary
  document.getElementById("sipResult").innerHTML = 
    `<p><strong>Initial Investment:</strong> ₹${amount.toFixed(2)}</p>
    <p><strong>Returns:</strong> ₹${futureValue.toFixed(2)}</p>
    <p><strong>Profit:</strong> ₹${(futureValue - (amount * months)).toFixed(2)}</p>`
  ;
}

// Time Value of Money (TVM) Calculation: Future Value
function calculateTVM() {
  const amount = parseFloat(document.getElementById("tvmAmount").value);
  const rate = parseFloat(document.getElementById("tvmRate").value);
  const time = parseFloat(document.getElementById("tvmTime").value);

  if (!amount || !rate || !time) {
    alert("Please fill all fields.");
    return;
  }

  // Future Value (FV) formula
  const futureValue = amount * Math.pow((1 + rate / 100), time);

  // Display results as summary
  document.getElementById("tvmResult").innerHTML =`<p><strong>Amount:</strong> ₹ ${amount.toFixed(2)}</p>
    <p><strong>Future Value:</strong> ₹${futureValue.toFixed(2)}</p>`
  ;
}