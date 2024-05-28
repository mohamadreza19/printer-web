function isNumberInSequence(number) {
  if (number < 3) return false;

  // Start from the first number in the sequence
  let currentNumber = 3;
  let increments = [2, 3, 3, 3]; // The pattern of increments
  let index = 0;

  // Continue adding increments until we reach or exceed the number
  while (currentNumber < number) {
    let increment = increments[index % increments.length];
    currentNumber += increment;
    index++;
  }

  // Check if the current number equals the target number
  console.log(number);
  return currentNumber === number;
}

export default isNumberInSequence;
