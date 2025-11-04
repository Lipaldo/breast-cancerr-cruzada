const trainButton = document.getElementById("trainButton");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const meanAcc = document.getElementById("meanAcc");
const stdAcc = document.getElementById("stdAcc");

const ctx = document.getElementById("accuracyChart").getContext("2d");

let chart;

// === Simulação de treinamento ===
trainButton.addEventListener("click", () => {
  progressText.textContent = "Treinando rede neural...";
  progressBar.style.width = "0%";
  meanAcc.textContent = "--";
  stdAcc.textContent = "--";

  let progress = 0;
  const interval = setInterval(() => {
    progress += 5;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      showResults();
    }
  }, 200);
});

// === Resultados simulados (cross-validation) ===
function showResults() {
  progressText.textContent = "Treinamento concluído ✅";

  // Simula acurácias de 10 folds
  const accuracies = Array.from({ length: 10 }, () =>
    (Math.random() * 0.1 + 0.9).toFixed(3)
  );

  const mean =
    accuracies.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) /
    accuracies.length;

  const variance =
    accuracies
      .map((x) => Math.pow(x - mean, 2))
      .reduce((a, b) => a + b, 0) / accuracies.length;

  const std = Math.sqrt(variance);

  meanAcc.textContent = (mean * 100).toFixed(2) + "%";
  stdAcc.textContent = (std * 100).toFixed(2) + "%";

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: accuracies.map((_, i) => `Fold ${i + 1}`),
      datasets: [
        {
          label: "Acurácia",
          data: accuracies.map((a) => (a * 100).toFixed(2)),
          backgroundColor: "#4dd0e1",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { color: "#ccc" },
        },
        x: { ticks: { color: "#ccc" } },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });
}
