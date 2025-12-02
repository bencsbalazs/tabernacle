let translations = {};

async function loadTranslations() {
    try {
        const response = await fetch('i18n.json');
        translations = await response.json();
        // Set default language after loading
        setLanguage('hu');
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

globalThis.setLanguage = function (lang) {
    if (!translations[lang]) return;

    for (const id in translations[lang]) {
        const element = document.getElementById(id);
        if (element) {
            if (id === 'frame-header') {
                element.setAttribute('home-text', translations[lang][id]);
            } else {
                element.innerHTML = translations[lang][id];
            }
        }
    }
}

const goldPriceInput = document.getElementById('gold-price');
const silverPriceInput = document.getElementById('silver-price');
const copperPriceInput = document.getElementById('copper-price');
const eurRateInput = document.getElementById('eur-rate');
const hufRateInput = document.getElementById('huf-rate');
const cubitRegularRadio = document.getElementById('cubit_regular');
const cubitSacredRadio = document.getElementById('cubit_sacred');

const goldQuantity = Number.parseFloat(document.getElementById('summary-gold-quantity').textContent.replaceAll(',', ''));
const silverQuantity = Number.parseFloat(
    document.getElementById('summary-silver-quantity').textContent.replaceAll(',', '')
);
const copperQuantity = Number.parseFloat(
    document.getElementById('summary-copper-quantity').textContent.replaceAll(',', '')
);

const goldUnitPriceCell = document.getElementById('summary-gold-unit-price');
const goldTotalCell = document.getElementById('summary-gold-total');

const silverUnitPriceCell = document.getElementById('summary-silver-unit-price');
const silverTotalCell = document.getElementById('summary-silver-total');

const copperUnitPriceCell = document.getElementById('summary-copper-unit-price');
const copperTotalCell = document.getElementById('summary-copper-total');

const purpleFabricQuantityCell = document.getElementById('summary-purple-fabric-quantity');
const goatSkinQuantityCell = document.getElementById('summary-goat-skin-quantity');

const purpleFabricUnitPrice = Number.parseFloat(
    document.getElementById('summary-purple-fabric-unit-price').textContent.replaceAll(',', '')
);
const goatSkinUnitPrice = Number.parseFloat(
    document.getElementById('summary-goat-skin-unit-price').textContent.replaceAll(',', '')
);

const purpleFabricTotalCell = document.getElementById('summary-purple-fabric-total');
const goatSkinTotalCell = document.getElementById('summary-goat-skin-total');

const ramSkinTotal = Number.parseFloat(document.getElementById('summary-ram-skin-total').textContent.replaceAll(',', ''));
const tahashSkinTotal = Number.parseFloat(
    document.getElementById('summary-tahash-skin-total').textContent.replaceAll(',', '')
);

const grandTotalUsdCell = document.getElementById('grand-total-usd-value');
const grandTotalEurCell = document.getElementById('grand-total-eur-value');
const grandTotalHufCell = document.getElementById('grand-total-huf-value');

function formatNumber(num) {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function recalculate() {
    const goldPrice = Number.parseFloat(goldPriceInput.value) || 0;
    const silverPrice = Number.parseFloat(silverPriceInput.value) || 0;
    const copperPrice = Number.parseFloat(copperPriceInput.value) || 0;
    const usdToEurRate = Number.parseFloat(eurRateInput.value) || 0;
    const usdToHufRate = Number.parseFloat(hufRateInput.value) || 0;

    goldUnitPriceCell.textContent = formatNumber(goldPrice);
    silverUnitPriceCell.textContent = formatNumber(silverPrice);
    copperUnitPriceCell.textContent = formatNumber(copperPrice);

    const goldTotal = goldQuantity * goldPrice;
    const silverTotal = silverQuantity * silverPrice;
    const copperTotal = copperQuantity * copperPrice;

    goldTotalCell.textContent = formatNumber(goldTotal);
    silverTotalCell.textContent = formatNumber(silverTotal);
    copperTotalCell.textContent = formatNumber(copperTotal);

    const cubitValue = Number.parseFloat(document.querySelector('input[name="cubit_type"]:checked').value);

    const purpleFabricArea = 10 * (28 * cubitValue) * (4 * cubitValue);
    const goatSkinArea = 11 * (30 * cubitValue) * (4 * cubitValue);

    purpleFabricQuantityCell.textContent = formatNumber(purpleFabricArea);
    goatSkinQuantityCell.textContent = formatNumber(goatSkinArea);

    const purpleFabricTotal = purpleFabricArea * purpleFabricUnitPrice;
    const goatSkinTotal = goatSkinArea * goatSkinUnitPrice;

    purpleFabricTotalCell.textContent = formatNumber(purpleFabricTotal);
    goatSkinTotalCell.textContent = formatNumber(goatSkinTotal);

    const grandTotalUsd =
        goldTotal + silverTotal + copperTotal + purpleFabricTotal + goatSkinTotal + ramSkinTotal + tahashSkinTotal;
    const grandTotalEur = grandTotalUsd * usdToEurRate;
    const grandTotalHuf = grandTotalUsd * usdToHufRate;

    grandTotalUsdCell.textContent = formatNumber(grandTotalUsd);
    grandTotalEurCell.textContent = formatNumber(grandTotalEur);
    grandTotalHufCell.textContent = formatNumber(grandTotalHuf);
}

goldPriceInput.addEventListener('input', recalculate);
silverPriceInput.addEventListener('input', recalculate);
copperPriceInput.addEventListener('input', recalculate);
eurRateInput.addEventListener('input', recalculate);
hufRateInput.addEventListener('input', recalculate);
cubitRegularRadio.addEventListener('change', recalculate);
cubitSacredRadio.addEventListener('change', recalculate);

// Initial calculation
recalculate();
// Load translations
loadTranslations();
