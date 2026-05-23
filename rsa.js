// Check if a number is prime (only divisible by 1 and itself)
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false; // divisible by something else = not prime
  }
  return true;
}

// GCD = "Greatest Common Divisor" — biggest number that divides two numbers evenly
// We need this to help pick our keys
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b]; // swap a and b using the remainder
  }
  return a;
}

// modPow = "modular exponentiation" (fancy name for: base^exponent mod modulus)
// This is the core math for both encrypting and decrypting
function modPow(base, exponent, modulus) {
  let result = 1n; // 1n = BigInt 1 (BigInt handles huge numbers JS normally can't)
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) result = (result * base) % modulus;
    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }
  return result;
}

// Generate the public and private keys
function generateKeys(p, q) {
  const n = p * q; // multiply the two primes
  const phi = (p - 1) * (q - 1); // Euler's totient — a math concept for key generation
  
  let e = 2n;
  // e must share no common factors with phi (gcd = 1)
  while (e < phi && gcd(e, phi) !== 1n) e++;
  
  // d is the private key — it "reverses" e mathematically
  let d = modInverse(e, phi);
  
  return { publicKey: { e, n }, privateKey: { d, n } };
}
