const display = document.getElementById('display');
    const historyContainer = document.getElementById('history');
    let history = [];

    // Load history from localStorage on page load
    window.onload = function() {
      loadHistory();
      renderHistory();
    };

    // Append character to the display
    function appendToDisplay(value) {
      if (display.innerText === '0' && value !== '.') {
        display.innerText = value;
      } else {
        display.innerText += value;
      }
    }

    // Clear the display
    function clearDisplay() {
      display.innerText = '0';
    }

    // Clear the history and remove from localStorage
    function clearHistory() {
      history = [];
      localStorage.removeItem('calcHistory');
      renderHistory();
    }

    // Render history
    function renderHistory() {
      historyContainer.innerHTML = history.map(item => `<p>${item}</p>`).join('');
    }

    // Load history from localStorage
    function loadHistory() {
      const storedHistory = localStorage.getItem('calcHistory');
      if (storedHistory) {
        history = JSON.parse(storedHistory);
      }
    }

    // Save history to localStorage
    function saveHistory() {
      localStorage.setItem('calcHistory', JSON.stringify(history));
    }

    // Calculate the result
    function calculateResult() {
      try {
        const expression = display.innerText;
        const result = eval(expression); // Evaluate the expression

        // Display the result
        display.innerText = result;

        // Add the expression and result to history
        history.push(`${expression} = ${result}`);
        renderHistory();
        saveHistory(); // Save to localStorage
      } catch (error) {
        display.innerText = 'Error'; // Show error for invalid expressions
      }
    }

    // Delete the last character from the display
    function deleteLast() {
      if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
      } else {
        display.innerText = '0';
      }
    }