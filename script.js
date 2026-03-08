const skins = [
    // Gold (0.5%)
    { name: "AWP | Dragon Lore", img: "assets/awp_dragonlore.png", rarity: "gold", weight: 5, value: 55000 },
    { name: "M4A4 | Howl", img: "assets/m4a4_howl.png", rarity: "gold", weight: 5, value: 25000 },
    { name: "Butterfly Knife | Doppler", img: "assets/butterfly_doppler.png", rarity: "gold", weight: 5, value: 12000 },
    { name: "Talon Knife | Doppler", img: "assets/talon_doppler.png", rarity: "gold", weight: 5, value: 8000 },
    { name: "Huntsman Knife | Autotronic", img: "assets/huntsman_autotronic.png", rarity: "gold", weight: 5, value: 3500 },
    { name: "Stiletto Knife | Tiger Tooth", img: "assets/stiletto_tigertooth.png", rarity: "gold", weight: 5, value: 2800 },
    { name: "Moto Gloves | Spearmint", img: "assets/gloves_spearmint.png", rarity: "gold", weight: 5, value: 15000 },
    { name: "Moto Gloves | Turtle", img: "assets/gloves_turtle.png", rarity: "gold", weight: 5, value: 1200 },
    
    // Red (1.5%)
    { name: "AK-47 | Empress", img: "assets/ak47_empress.png", rarity: "red", weight: 15, value: 850 },
    { name: "M4A4 | Emperor", img: "assets/m4a4_emperor.png", rarity: "red", weight: 15, value: 750 },
    { name: "AK-47 | Neon Revolution", img: "assets/ak47_neonrevolution.png", rarity: "red", weight: 15, value: 450 },
    { name: "AWP | Oni Taiji", img: "assets/awp_onitaiji.png", rarity: "red", weight: 15, value: 1800 },
    { name: "Desert Eagle | Code Red", img: "assets/deagle_codered.png", rarity: "red", weight: 15, value: 250 },
    { name: "Desert Eagle | Printstream", img: "assets/deagle_printstream.png", rarity: "red", weight: 15, value: 600 },
    { name: "AK-47 | Aphrodite", img: "assets/ak47_aphrodite.png", rarity: "red", weight: 15, value: 3500 },
    { name: "AK-47 | Inheritance", img: "assets/ak47_inheritance.png", rarity: "red", weight: 15, value: 950 },
    
    // Pink (3%)
    { name: "M4A1-S | Hyper Beast", img: "assets/m4a1s_hyperbeast.png", rarity: "pink", weight: 30, value: 450 },
    { name: "Desert Eagle | Kumicho Dragon", img: "assets/deagle_kumichodragon.png", rarity: "pink", weight: 30, value: 120 },
    { name: "M4A1-S | Black Lotus", img: "assets/m4a1s_blacklotus.png", rarity: "pink", weight: 30, value: 80 },
    { name: "Glock-18 | Shinobu", img: "assets/glock_shinobu.png", rarity: "pink", weight: 150, value: 45 },

    // Purple (15%)
    { name: "Glock-18 | Water Elemental", img: "assets/glock_waterelemental.png", rarity: "purple", weight: 150, value: 35 },
    { name: "USP-S | Neo-Noir", img: "assets/usp_neonoir.png", rarity: "purple", weight: 150, value: 65 },
    { name: "AWP | Atheris", img: "assets/awp_atheris.png", rarity: "purple", weight: 150, value: 25 },
    
    // Blue (80%)
    { name: "P250 | Sand Dune", img: "assets/p250_sanddune.png", rarity: "blue", weight: 800, value: 0.5 },
    { name: "Glock-18 | Candy Apple", img: "assets/glock_candyapple.png", rarity: "blue", weight: 800, value: 1.2 },
    { name: "Nova | Caged Steel", img: "assets/nova_cagedsteel.png", rarity: "blue", weight: 800, value: 0.8 },
    { name: "MP9 | Sand Scale", img: "assets/mp9_sandscale.png", rarity: "blue", weight: 800, value: 0.4 },
    { name: "SG 553 | Candy Apple", img: "assets/sg553_candyapple.png", rarity: "blue", weight: 800, value: 1.5 },
    { name: "P90 | Sand Spray", img: "assets/p90_sandspray.png", rarity: "blue", weight: 800, value: 0.3 },
    { name: "SCAR-20 | Sand Mesh", img: "assets/scar20_sandmesh.png", rarity: "blue", weight: 800, value: 0.2 },
    { name: "AUG | Sweeper", img: "assets/aug_sweeper.png", rarity: "blue", weight: 800, value: 0.6 },
    { name: "Sawed-Off | Forest DDPAT", img: "assets/sawedoff_forestddpat.png", rarity: "blue", weight: 800, value: 0.4 },
    { name: "FAMAS | Colony", img: "assets/famas_colony.png", rarity: "blue", weight: 800, value: 0.3 },
];

const slider = document.getElementById('caseSlider');
const cardWidth = 160;
const totalCards = 50; 
let cardsData = [];

let isSpinning = false;
let lastTickIndex = -1;
let balance = 0;
let wageringMeta = 1000000; 
let userInventory = [];

// --- UI UPDATE ---
function updateDisplay() {
    const balanceElement = document.getElementById('userBalance');
    const metaElement = document.getElementById('userDebt');
    balanceElement.innerText = `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    metaElement.innerText = `R$ ${wageringMeta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

function addBalance(amount, message) {
    balance += amount;
    updateDisplay();
    if (message) alert(message);
}

function handleDeposit() {
    const milestones = [
        { msg: "Parabéns! Você é o nosso 8º visitante hoje. Como 8 é o número chinês da sorte, tome R$ 100,00!", amt: 100 },
        { msg: "Detectamos que você está usando um mouse Gamer. Tome R$ 25,00 para ajudar no clique!", amt: 25 },
        { msg: "O Scar acordou de bom humor hoje. Ele mandou te dar R$ 50,00.", amt: 50 },
        { msg: "Você clicou no botão com muita elegância. Bônus de R$ 15,00 por estilo!", amt: 15 },
        { msg: "Nosso sistema de IA (Provably Fair) previu que você ia clicar aqui. Tome R$ 200,00 de profecia.", amt: 200 },
        { msg: "Você é o nosso milionésimo visitante! Ganhe R$ 500,00 por ajudar a fortalecer o ecossistema do Scar!", amt: 500 },
        { msg: "O servidor acabou de rodar um `git push` com sucesso. Comemore com R$ 10,00!", amt: 10 },
        { msg: "Hype de Half-Life 3 foi detectado no seu perfil de usuário. Bônus de R$ 33,33.", amt: 33.33 },
        { msg: "Nosso satélite detectou que você está respirando. Bônus de vitalidade: R$ 20,00.", amt: 20 },
        { msg: "O admin esqueceu a chave do botão de depósito aberta. Rápido, pegue R$ 150,00!", amt: 150 },
        { msg: "Seu ping médio está abaixo de 20ms. Recompensa por fibra óptica: R$ 30,00.", amt: 30 },
        { msg: "Você clicou no botão exatamente no ângulo de 42 graus. Ciência! Ganhou R$ 42,00.", amt: 42 },
        { msg: "O sistema Provably Fair achou seu papel de parede bonito. R$ 20,00 de cortesia.", amt: 20 },
        { msg: "A GPU do servidor minerou um bloco de sorte. Distribuição de dividendos: R$ 85,00.", amt: 85 },
        { msg: "O Scar acha que você vai ganhar uma faca hoje. Ajuda de custo para o sonho: R$ 200,00.", amt: 200 },
        { msg: "Seu teclado mecânico faz um barulho satisfatório. Bônus acústico: R$ 15,00.", amt: 15 },
        { msg: "O nosso sistema de IA detectou que você cuida bem do seu computador. Taxa de bom usuário: R$ 120,00.", amt: 120 },
        { msg: "Mercúrio não está retrógrado para você hoje. Os astros mandaram R$ 88,00.", amt: 88 },
        { msg: "O estagiário confundiu o botão de 'Deletar Banco' com 'Dar Dinheiro'. Sorte sua: R$ 300,00!", amt: 300 }
    ];

    const randomMilestone = milestones[Math.floor(Math.random() * milestones.length)];
    addBalance(randomMilestone.amt, randomMilestone.msg);
}

// --- INVENTORY LOGIC ---
function toggleInventoryModal() {
    const modal = document.getElementById('inventoryModal');
    const overlay = document.getElementById('inventoryOverlay');
    const isOpen = modal.style.display === 'block';
    if (!isOpen) updateInventoryUI();
    modal.style.display = isOpen ? 'none' : 'block';
    overlay.style.display = isOpen ? 'none' : 'block';
}

function updateInventoryUI() {
    const list = document.getElementById('inventoryList');
    const totalValEl = document.getElementById('totalSkinsValue');
    const remainingEl = document.getElementById('metaRemainingValue');
    const progressBar = document.getElementById('metaProgressBar');
    list.innerHTML = '';
    let totalValue = 0;
    userInventory.forEach(skin => {
        totalValue += skin.value;
        const item = document.createElement('div');
        item.style.background = '#222';
        item.style.padding = '10px';
        item.style.borderRadius = '4px';
        item.style.textAlign = 'center';
        item.style.borderBottom = `3px solid var(--rarity-${skin.rarity})`;
        item.innerHTML = `
            <img src="${skin.img}" style="width: 50px; margin-bottom: 5px;">
            <p style="font-size: 0.6rem; font-weight: 800;">${skin.name}</p>
            <p style="font-size: 0.5rem; color: var(--accent);">R$ ${skin.value.toLocaleString('pt-BR')}</p>
        `;
        list.appendChild(item);
    });
    totalValEl.innerText = `R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    remainingEl.innerText = `R$ ${wageringMeta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    const progress = Math.min(100, (totalValue / 1000000) * 100);
    progressBar.style.width = `${progress}%`;
}

// --- HASH USERNAMES ---
function generateUserHash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 5; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `usuário: ${hash}`;
}

// --- UTILS ---
function getWeightedRandomSkin() {
    const totalWeight = skins.reduce((sum, skin) => sum + skin.weight, 0);
    let random = Math.random() * totalWeight;
    for (const skin of skins) {
        if (random < skin.weight) return skin;
        random -= skin.weight;
    }
    return skins[skins.length - 1];
}

function getLuckyFakeSkin() {
    const luckyRoll = Math.random() * 100;
    let targetRarity;
    if (luckyRoll < 35) targetRarity = "gold";
    else if (luckyRoll < 65) targetRarity = "red";
    else if (luckyRoll < 85) targetRarity = "pink";
    else if (luckyRoll < 95) targetRarity = "purple";
    else targetRarity = "blue";
    const possibleSkins = skins.filter(s => s.rarity === targetRarity);
    return possibleSkins[Math.floor(Math.random() * possibleSkins.length)];
}

// --- AUDIO (WEB API) ---
let audioCtx = null;
function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playTick() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square'; 
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

function playWin() {
    if (!audioCtx) return;
    [440, 554, 659].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + (i * 0.1));
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime + (i * 0.1));
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + (i * 0.1) + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + (i * 0.1));
        osc.stop(audioCtx.currentTime + (i * 0.1) + 0.5);
    });
}

// --- CORE LOGIC ---
function generateCards() {
    slider.innerHTML = '';
    cardsData = [];
    for (let i = 0; i < totalCards; i++) {
        let selectedSkin = getWeightedRandomSkin();
        cardsData.push(selectedSkin);
        const card = document.createElement('div');
        card.className = `skin-card rarity-${selectedSkin.rarity}`;
        card.innerHTML = `<img src="${selectedSkin.img}" alt="${selectedSkin.name}"><div class="name">${selectedSkin.name}</div>`;
        slider.appendChild(card);
    }
}

function startSpin() {
    initAudio(); 
    updateHash();
    if (balance < 10) {
        alert("Créditos insuficientes! Pegue um empréstimo com o Scar para continuar.");
        return;
    }
    const btn = document.getElementById('spinBtn');
    const display = document.getElementById('result-display');
    if (isSpinning) return;
    balance -= 10;
    updateDisplay();
    isSpinning = true;
    lastTickIndex = -1;
    btn.disabled = true;
    display.innerText = "Sorteando...";
    slider.style.transition = 'none';
    slider.style.transform = 'translateX(0)';
    slider.offsetHeight;
    generateCards();
    const winningIndex = 42; 
    const winner = getWeightedRandomSkin();
    cardsData[winningIndex] = winner;
    const winningCard = slider.children[winningIndex];
    winningCard.className = `skin-card rarity-${winner.rarity}`;
    winningCard.innerHTML = `<img src="${winner.img}" alt="${winner.name}"><div class="name">${winner.name}</div>`;
    const centerOffset = 500;
    const targetPos = (winningIndex * cardWidth) + (cardWidth / 2) - centerOffset;
    const randomInnerOffset = (Math.random() - 0.5) * (cardWidth * 0.8);
    const finalPos = targetPos + randomInnerOffset;
    slider.style.transition = 'transform 6s cubic-bezier(0.1, 0, 0.1, 1)';
    slider.style.transform = `translateX(-${finalPos}px)`;
    requestAnimationFrame(monitorSpin);
    setTimeout(() => {
        isSpinning = false;
        playWin();
        display.innerText = `Você ganhou: ${winner.name}!`;
        wageringMeta = Math.max(0, wageringMeta - winner.value); 
        userInventory.push(winner);
        updateDisplay();
        if (winner.name === "AWP | Dragon Lore") {
            window.open("https://youtu.be/xvFZjo5PgG0?list=RDxvFZjo5PgG0", '_blank');
        }
        btn.disabled = false;
        addRecentDrop(winner, "VOCÊ");
    }, 6500);
}

function addRecentDrop(skin, username) {
    const grid = document.getElementById('recentDrops');
    const drop = document.createElement('div');
    const name = username || generateUserHash();
    drop.className = `mini-card rarity-${skin.rarity}`;
    drop.innerHTML = `
        <div style="font-size: 0.5rem; color: var(--text-dim); margin-bottom: 2px; text-transform: uppercase;">${name}</div>
        <img src="${skin.img}" alt="skin">
        <p>${skin.name}</p>
    `;
    grid.prepend(drop);
    if (grid.children.length > 8) grid.lastElementChild.remove();
}

function toggleFairnessModal() {
    const modal = document.getElementById('fairnessModal');
    const overlay = document.getElementById('modalOverlay');
    const isOpen = modal.style.display === 'block';
    if (!isOpen) updateHash(); 
    modal.style.display = isOpen ? 'none' : 'block';
    overlay.style.display = isOpen ? 'none' : 'block';
}

function updateHash() {
    const hashElement = document.getElementById('fairnessHash');
    const characters = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 64; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    hashElement.innerText = result;
}

function simulateLiveDrops() {
    const nextDrop = Math.random() * 4000 + 1000; 
    setTimeout(() => {
        if (!isSpinning) {
            const fakeWinner = getLuckyFakeSkin(); 
            addRecentDrop(fakeWinner);
        }
        simulateLiveDrops();
    }, nextDrop);
}

function monitorSpin() {
    if (!isSpinning) return;
    const style = window.getComputedStyle(slider);
    const transform = style.transform || style.webkitTransform;
    let currentX = 0;
    if (transform && transform !== 'none') {
        const parts = transform.split('(')[1].split(')')[0].split(',');
        currentX = Math.abs(parseFloat(parts[4]));
    }
    const centerOffset = 500;
    const currentCardAtCenter = Math.floor((currentX + centerOffset) / cardWidth);
    if (currentCardAtCenter !== lastTickIndex) {
        playTick();
        lastTickIndex = currentCardAtCenter;
    }
    requestAnimationFrame(monitorSpin);
}

// --- INIT ---
generateCards();
simulateLiveDrops();

window.onload = () => {
    setTimeout(() => {
        balance += 20;
        updateDisplay();
        alert("Bem-vindo! O Scar te deu R$ 20,00 para começar! Divirta-se!");
    }, 1000);
};
