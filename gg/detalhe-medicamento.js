import { diseases } from './diseases.js';

const params = new URLSearchParams(window.location.search);
const medName = params.get('medicamento');
const origem = params.get('origem') || 'medicamentos';

const medDetails = document.getElementById('medDetails');
const medTitle = document.getElementById('medName');

let found = null;

// Procurar o medicamento em todas as doenças
for (const disease of diseases) {
  const match = disease.medicines?.find(m => m.name === medName);
  if (match) {
    found = match;
    break;
  }
}

if (found) {
  medTitle.textContent = found.name;

  medDetails.innerHTML = `
    <p><strong>Indicação:</strong> ${found.indication}</p>
    <p><strong>Dosagem:</strong> ${found.dosage}</p>
    <p><strong>Instruções de uso:</strong> ${found.dosageInstructions}</p>
    <p><strong>Via de administração:</strong> ${found.administrationRoute}</p>
    <p><strong>Forma farmacêutica:</strong> ${found.pharmaceuticalForm}</p>
    <p><strong>Efeitos colaterais:</strong> ${found.sideEffects}</p>
    <p><strong>Contraindicações:</strong> ${found.contraindications}</p>
    <p><strong>Ação terapêutica:</strong> ${found.therapeuticAction}</p>
    <p><strong>Mecanismo de ação:</strong> ${found.mechanismOfAction}</p>
    <p><strong>Ingrediente ativo:</strong> ${found.activeIngredient}</p>
    <p><strong>Interações medicamentosas:</strong> ${found.drugInteractions}</p>
    ${found.leafletUrl ? `
      <a class="bula-button" href="${found.leafletUrl}" target="_blank" rel="noopener noreferrer">
        📄 Ver Bula Original
      </a>
    ` : ''}
  `;
} else {
  medTitle.textContent = "Medicamento não encontrado";
  medDetails.innerHTML = `
    <p>O medicamento <strong>${medName}</strong> não foi localizado no sistema.</p>
    <p><a class="back-button" href="index.html#${origem}">← Voltar</a></p>
  `;
}
