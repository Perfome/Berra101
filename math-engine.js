class AdvancedMathEngine {
    constructor() {
        this.algebrite = window.Algebrite;
        this.mathjs = window.math;
    }

    solveIntegral(expr) {
        try {
            // Temel temizlik
            let cleanExpr = expr.replace(/∫/g, '').trim();
            // Algebrite ile sembolik integral
            let result = this.algebrite.integral(cleanExpr).toString();
            
            return {
                result: result + " + C",
                steps: [
                    `İşlem: ∫ ${cleanExpr} dx`,
                    `Analiz: Sembolik entegrasyon kuralları uygulandı.`,
                    `Sonuç: ${result}`
                ]
            };
        } catch (e) {
            return { error: "Karmaşık integral yapısı: Lütfen terimleri kontrol et." };
        }
    }

    solveDerivative(expr) {
        try {
            let cleanExpr = expr.replace(/d\/dx/g, '').trim();
            // Mathjs ile türev (Daha güçlü adımlar için)
            let result = this.mathjs.derivative(cleanExpr, 'x').toString();
            
            return {
                result: result,
                steps: [
                    `İşlem: d/dx(${cleanExpr})`,
                    `Kural: Kuvvet, zincir veya çarpım kuralı uygulandı.`,
                    `Türev: ${result}`
                ]
            };
        } catch (e) {
            return { error: "Türev hesaplanamadı." };
        }
    }

    solveEquation(eq) {
        try {
            let parts = eq.split('=');
            let expr = parts.length > 1 ? `(${parts[0]}) - (${parts[1]})` : parts[0];
            let roots = this.algebrite.roots(expr).toString();
            return { result: "Kökler: " + roots, steps: ["Denklem 0'a eşitlendi", "Polinom kökleri hesaplandı"] };
        } catch (e) { return { error: "Denklem çözülemedi." }; }
    }
}
window.mathEngine = new AdvancedMathEngine();
