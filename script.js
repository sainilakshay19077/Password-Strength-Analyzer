const passwordInput = document.getElementById("password");
const strengthLabel = document.getElementById("strengthLabel");
const meterFill = document.getElementById("meterFill");
const feedback = document.getElementById("feedback");
const checkItems = [...document.querySelectorAll("[data-check]")];

const commonPasswords = new Set([
  "password", "password123", "12345678", "123456789", "qwerty123",
  "admin123", "letmein", "welcome123", "iloveyou", "abc12345"
]);

function analyzePassword(password) {
  const tests = {
    length: password.length >= 12,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
    repeat: password.length > 0 && !/(.)\1\1/.test(password),
    common: password.length > 0 && !commonPasswords.has(password.toLowerCase())
  };

  // This is an educational heuristic, not a guarantee against cracking.
  const score = Object.values(tests).filter(Boolean).length;
  let label = "Very weak";
  if (score >= 7) label = "Strong";
  else if (score >= 5) label = "Moderate";
  else if (score >= 3) label = "Weak";

  return { tests, score, label };
}

function updateAnalysis() {
  const password = passwordInput.value;
  if (!password) {
    strengthLabel.textContent = "Not checked";
    meterFill.style.width = "0%";
    feedback.textContent = "Enter a sample password to see feedback.";
    checkItems.forEach(item => item.classList.remove("pass"));
    return;
  }

  const result = analyzePassword(password);
  checkItems.forEach(item => {
    item.classList.toggle("pass", result.tests[item.dataset.check]);
  });

  strengthLabel.textContent = result.label;
  meterFill.style.width = `${(result.score / 7) * 100}%`;
  const missing = Object.entries(result.tests)
    .filter(([, passed]) => !passed)
    .map(([key]) => ({
      length: "make it at least 12 characters",
      lower: "add a lowercase letter",
      upper: "add an uppercase letter",
      number: "add a number",
      symbol: "add a special character",
      repeat: "avoid three identical characters in a row",
      common: "avoid commonly used passwords"
    }[key]));

  feedback.textContent = missing.length
    ? `Suggestions: ${missing.join("; ")}.`
    : "Good checklist result. Use a unique password for every account and consider a password manager.";
}

function secureRandomInt(max) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % max;
}

function generateExample() {
  const groups = ["ABCDEFGHJKLMNPQRSTUVWXYZ", "abcdefghijkmnopqrstuvwxyz", "23456789", "!@#$%&*?-_+"];
  const all = groups.join("");
  const chars = groups.map(group => group[secureRandomInt(group.length)]);
  while (chars.length < 16) chars.push(all[secureRandomInt(all.length)]);
  // Fisher-Yates shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  passwordInput.value = chars.join("");
  passwordInput.type = "text";
  document.getElementById("toggle").textContent = "Hide";
  updateAnalysis();
}

passwordInput.addEventListener("input", updateAnalysis);
document.getElementById("toggle").addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  document.getElementById("toggle").textContent = showing ? "Show" : "Hide";
});
document.getElementById("generate").addEventListener("click", generateExample);
document.getElementById("clear").addEventListener("click", () => {
  passwordInput.value = "";
  passwordInput.type = "password";
  document.getElementById("toggle").textContent = "Show";
  updateAnalysis();
});
updateAnalysis();
