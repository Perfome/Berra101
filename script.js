document.addEventListener('DOMContentLoaded', () => {
    // Particles ve Temel UI kodlarını buraya (senin önceki kodun gibi) ekle...
    // (Yer darlığından sadece zeka kısmını yazıyorum kanka)

    const sendBtn = document.getElementById('sendBtn');
    const input = document.getElementById('messageInput');
    const messages = document.getElementById('messages');
    const totalCalc = document.getElementById('totalCalc');
    let count = 0;

    function processAI(text) {
        let lowText = text.toLowerCase();
        
        // --- ÖZEL BERRA MODU ---
        if (lowText.includes("berra")) {
            return {
                chat: true,
                response: "Berra, bu dünyadaki en değerli ve mükemmel insan. Senin için ne kadar kıymetli olduğunu biliyorum; o hem ciddi hem de sana karşı her zaman yumuşak olan o eşsiz kişi! ❤️"
            };
        }

        // --- GENEL SOHBET ---
        if (lowText.includes("selam") || lowText.includes("merhaba")) {
            return { chat: true, response: "Selam! Ben MathGenius PRO. Sana matematiksel analizlerde yardımcı olabilirim veya sadece sohbet edebiliriz. Ne yapalım?" };
        }
        
        if (lowText.includes("nasılsın")) {
            return { chat: true, response: "İşlemcilerim tam güç çalışıyor, senin için karmaşık denklemleri çözmeye hazırım! Sen nasılsın?" };
        }

        if (lowText.includes("kimsin") || lowText.includes("sahibin")) {
            return { chat: true, response: "Ben senin tarafından geliştirilmiş, Berra'nın nezaketi ve matematiğin gücüyle donatılmış bir yapay zekayım." };
        }

        // --- MATEMATİK MOTORU ---
        if (lowText.includes("integral") || lowText.includes("∫")) {
            return { math: true, data: window.mathEngine.solveIntegral(text) };
        }
        if (lowText.includes("türev") || lowText.includes("derivative")) {
            return { math: true, data: window.mathEngine.solveDerivative(text) };
        }
        if (lowText.includes("=")) {
            return { math: true, data: window.mathEngine.solveEquation(text) };
        }

        return { chat: true, response: "Bunu tam anlayamadım ama istersen bir türev veya integral sorusu sorabilirsin!" };
    }

    function addMessage(content, type, isMath = false) {
        document.getElementById('welcomeScreen').style.display = 'none';
        const div = document.createElement('div');
        div.className = `message ${type}`;
        
        let html = `<div class="message-avatar">${type === 'user' ? '👤' : '🤖'}</div><div class="message-content">`;
        
        if (isMath && content.result) {
            html += `<strong>Analiz Tamamlandı:</strong><div class="result-box"><code>${content.result}</code>`;
            content.steps.forEach(s => html += `<div class="step">${s}</div>`);
            html += `</div>`;
        } else {
            html += content;
        }
        
        html += `</div>`;
        div.innerHTML = html;
        messages.appendChild(div);
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }

    sendBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if(!text) return;
        
        addMessage(text, 'user');
        input.value = "";
        
        setTimeout(() => {
            const ai = processAI(text);
            if(ai.chat) addMessage(ai.response, 'ai');
            else {
                addMessage(ai.data, 'ai', true);
                if(!ai.data.error) { count++; totalCalc.innerText = count; }
            }
        }, 600);
    });
});
