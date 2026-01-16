# Спецификация квизов

## Общая логика квиза

Каждый квиз — это последовательность шагов внутри одной HTML страницы.
JavaScript управляет отображением шагов и сбором ответов.

### Навигация
- Клик по карточке ответа → переход к следующему шагу
- Ответы сохраняются в localStorage
- После формы → показ success страницы

---

## КВИЗ 1: Familien-Fotoshooting (Weihnachten)

**Лендинг**: 1
**Стиль карточек**: Прямоугольные (border: 1px solid)
**Количество шагов**: 5 + форма + успех

### Шаг 1
**Figma node**: `137:51`
```
Progress: "Weiter zum Gutschein"
Question: "Kennst du mich bereits?"
Options: 4
- "Ja, vom Hören"
- "Ja, na klar!"
- "Schon sehr lang"
- "Nein, noch nicht"
```

### Шаг 2
**Figma node**: `137:159`
```
Progress: "4 Fragen bis zum Gutschein"
Question: "Welches Bild gefällt dir am Besten?"
Options: 4
- "1"
- "2"
- "3"
- "4"
```

### Шаг 3
**Figma node**: `137:71`
```
Progress: "3 Fragen bis zum Gutschein"
Question: "Schon mal ein Familien-Fotoshooting gehabt?"
Options: 2
- "Ja, das war der Hammer!"
- "Nein, bisher noch nicht!"
```

### Шаг 4
**Figma node**: `137:179`
```
Progress: "2 Fragen bis zum Gutschein"
Question: "Wer wird mit dabei sein?"
Options: 3
- "Nur wir als Elternpaar"
- "Eltern und die Kinder"
- "Wir nehmen auch unser Haustier mit"
```

### Форма
**Figma node**: `137:111`
```
Label: "Klasse, jetzt zum Gutschein"
Title: "Trage dich jetzt ein und sichere dir dein Platz für ein"
Subtitle: "Familien-Fotoshooting zu Weihnachten!"
Note: "Diese Aktion gilt nur bis zum 06.12.25."
Button: "Jetzt Gutschein sichern!"
Privacy: "Deine Privatsphäre ist bei mir sicher – ich schätze dein Vertrauen."
Info Title: "WICHTIG! Bitte halte deinen Termin ein oder informiere mich rechtzeitig über eventuelle Änderungen."
```

### Успех
**Figma node**: `137:84`
```
Title: "Herzlichen Glückwunsch!"
Subtitle: "Deine Anfrage ist bei uns eingegangen!"
Text: "Wir melden uns bald bei dir."
CTA: "Jetzt Termin wählen & sichern!"
Alternative: "Natürlich kannst du uns auch ganz unkompliziert telefonisch oder per E-Mail erreichen – wir freuen uns auf deine Nachricht!"
```

---

## КВИЗ 2: Familien und Kinder (Kostenlos)

**Лендинг**: 2
**Стиль карточек**: Прямоугольные (border: 1px solid)
**Количество шагов**: 4 + форма + успех

### Шаг 1
**Figma node**: `313:26`
```
Progress: "3 Fragen bis zum Gutschein"
Question: "Kennst du mich bereits?"
Options: 4
- "Ja, vom Hören"
- "Ja, na klar!"
- "Schon sehr lang"
- "Nein, noch nicht"
```

### Шаг 2
**Figma node**: `313:82`
```
Progress: "2 Fragen bis zum Gutschein"
Question: "Gibt es bei euch auch tierische Familienmitglieder?"
Options: 3
- "Ja, unbedingt!"
- "Nein"
- "Vielleicht – sind noch unsicher"
```

### Шаг 3
**Figma node**: `313:47`
```
Progress: "1 Fragen bis zum Gutschein"
Question: "Wie groß ist eure Familie?"
Options: 4
- "2 Personen"
- "3–4 Personen"
- "5 oder mehr Personen"
- "Noch unklar – wir entscheiden spontan"
```

### Шаг 4
**Figma node**: `313:68`
```
Progress: "Fast geschafft!"
Question: "Schon mal ein Familien-Fotoshooting gehabt?"
Options: 2
- "Ja, das war der Hammer!"
- "Nein, bisher noch nicht!"
```

### Форма
**Figma node**: `313:100`
```
Label: "Klasse, jetzt zum Gutschein"
Title: "Special-Gutschein: Familien-Fotoshooting KOSTENLOS"
Subtitle: "Nur für kurze Zeit"
Button: "Sende mir den Gutschein zu!"
Privacy: "Deine Sicherheit ist unser größtes Anliegen – Vertraue uns und schütze deine Privatsphäre!"
```

### Успех
**Figma node**: `313:135`
```
Title: "Herzlichen Glückwunsch!"
Subtitle: "Deine Anfrage ist bei uns eingegangen!"
Text: "Wir melden uns bald bei dir."
CTA: "Jetzt Termin wählen & sichern!"
```

---

## КВИЗ 3: Hunde-Fotoshooting

**Лендинг**: 3
**Стиль карточек**: Скруглённые (border-radius: 20px)
**Количество шагов**: 4 + форма + успех

### Шаг 1
**Figma node**: `370:441`
```
Progress: "Weiter zum Gutschein"
Question: "Kennst du mich bereits?"
Options: 3
- "Ja, na klar!"
- "Ja, vom Hören"
- "Nein, noch nicht"
```

### Шаг 2
**Figma node**: `370:460`
```
Progress: "Noch 3 Fragen bis zum Gutschein"
Question: "Wer wird mit dabei sein?"
Options: 3
- "Mein pelziger Freund"
- "Meine pelzige Freunde"
- "Die ganze Familie"
```

### Шаг 3
**Figma node**: `370:479`
```
Progress: "Noch 2 Fragen bis zum Gutschein"
Question: "Wie alt ist dein Hund?"
Options: 4
- "Unter 1 Jahr"
- "1–3 Jahre"
- "4–7 Jahre"
- "Über 7 Jahre"
```

### Шаг 4
**Figma node**: `370:503`
```
Progress: "Noch 1 Fragen bis zum Gutschein"
Question: "Welche Eigenschaften beschreiben deinen Hund am besten?"
Options: 4
- "Ruhig und gelassen"
- "Verspielt und energiegeladen"
- "Schüchtern oder ängstlich"
- "Neugierig und aufgeschlossen"
```

### Форма
**Figma node**: `370:526`
```
Label: "Klasse, jetzt zum Gutschein"
Title: "Trag dich jetzt ein und sichere dir dein"
Subtitle: "kostenloses Hunde-Fotoshooting"
Note: "Das Fotoshooting findet nur bis zum 23.07.2025 statt! Schnell sein lohnt sich - ich freue mich auf euch!"
Button: "Jetzt Gutschein sichern!"
Privacy: "Deine Privatsphäre ist bei mir sicher – ich schätze dein Vertrauen."
```

### Успех
**Figma node**: `370:560`
```
Title: "Herzlichen Glückwunsch!"
Subtitle: "Deine Anfrage ist bei uns eingegangen!"
Text: "Wir melden uns bald bei dir."
CTA: "Jetzt Termin wählen & sichern!"
```

---

## КВИЗ 4: Kinder-Fotoshooting

**Лендинг**: 4
**Стиль карточек**: Скруглённые (border-radius: 20px)
**Количество шагов**: 4 + форма + успех

### Шаг 1
**Figma node**: `483:63`
```
Progress: "Weiter zum Gutschein"
Question: "Kennst du uns bereits?"
Options: 4
- "Ja, vom Hören"
- "Ja, na klar!"
- "Schon sehr lang"
- "Nein, noch nicht"
```

### Шаг 2
**Figma node**: `483:85`
```
Progress: "2 Fragen bis zum Gutschein"
Question: "Schon mal ein Kinder-Fotoshooting gehabt?"
Options: 2
- "Ja, das war der Hammer!"
- "Nein, bisher noch nicht!"
```

### Шаг 3
**Figma node**: `483:100`
```
Progress: "1 Fragen bis zum Gutschein"
Question: "Wer soll mit auf die Fotos?"
Options: 4
- "Nur das Kind / die Kinder"
- "Kind(er) mit Eltern"
- "Auch Großeltern"
- "Wir wissen es noch nicht genau"
```

### Шаг 4
**Figma node**: `483:122`
```
Progress: "Letzte Frage!"
Question: "Welches Bild gefällt dir am Besten?"
Options: 4
- "1"
- "2"
- "3"
- "4"
```

### Форма
**Figma node**: `483:144`
```
Label: "Klasse, jetzt zum Gutschein"
Title: "Trag dich jetzt ein und sichere dir dein"
Subtitle: "kostenloses Kinder-Fotoshooting"
Note: "Das kostenlose Fotoshooting findet nur vom 1.11.-29.11.25 statt!"
Additional: "Schnell sein lohnt sich - wir freuen uns auf euch!"
Button: "Jetzt Gutschein sichern!"
Privacy: "Deine Privatsphäre ist bei uns sicher – wir schätzen dein Vertrauen."
```

### Успех
**Figma node**: `483:180`
```
Title: "Herzlichen Glückwunsch!"
Subtitle: "Deine Anfrage ist bei uns eingegangen!"
Text: "Wir melden uns bald bei dir."
CTA: "Jetzt Termin wählen & sichern!"
```

---

## JavaScript структура квиза

```javascript
// quiz.js

class Quiz {
  constructor(config) {
    this.steps = config.steps;
    this.currentStep = 0;
    this.answers = {};
    this.formEndpoint = config.formEndpoint || null;
  }

  init() {
    this.bindEvents();
    this.showStep(0);
    this.loadSavedAnswers();
  }

  bindEvents() {
    // Option click
    document.querySelectorAll('[data-quiz-option]').forEach(option => {
      option.addEventListener('click', (e) => this.selectOption(e));
    });

    // Form submit
    const form = document.querySelector('[data-quiz-form]');
    if (form) {
      form.addEventListener('submit', (e) => this.submitForm(e));
    }
  }

  selectOption(e) {
    const option = e.currentTarget;
    const value = option.dataset.quizOption;
    
    // Save answer
    this.answers[`step_${this.currentStep}`] = value;
    this.saveAnswers();
    
    // Visual feedback
    option.classList.add('is-selected');
    
    // Next step after delay
    setTimeout(() => {
      this.nextStep();
    }, 300);
  }

  showStep(index) {
    document.querySelectorAll('[data-quiz-step]').forEach(step => {
      step.classList.remove('is-active');
    });
    
    const targetStep = document.querySelector(`[data-quiz-step="${index}"]`);
    if (targetStep) {
      targetStep.classList.add('is-active');
    }
  }

  nextStep() {
    this.currentStep++;
    this.showStep(this.currentStep);
    
    // Scroll to quiz section
    document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth' });
  }

  submitForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
      ...this.answers,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      availability: formData.getAll('availability'),
      timestamp: new Date().toISOString()
    };

    console.log('Form submitted:', data);
    
    // TODO: Send to backend
    // if (this.formEndpoint) {
    //   fetch(this.formEndpoint, {
    //     method: 'POST',
    //     body: JSON.stringify(data)
    //   });
    // }

    // Show success
    this.showStep('success');
    
    // Clear saved answers
    this.clearSavedAnswers();
    
    // Analytics event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        'event_category': 'quiz',
        'event_label': 'lead_capture'
      });
    }
  }

  saveAnswers() {
    localStorage.setItem('quiz_answers', JSON.stringify(this.answers));
  }

  loadSavedAnswers() {
    const saved = localStorage.getItem('quiz_answers');
    if (saved) {
      this.answers = JSON.parse(saved);
    }
  }

  clearSavedAnswers() {
    localStorage.removeItem('quiz_answers');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const quiz = new Quiz({
    steps: 5, // Adjust per landing
    formEndpoint: null
  });
  quiz.init();
});
```

---

## CSS для квиза

```css
/* quiz.css */

.quiz {
  padding: var(--section-padding-y) 0;
  background-color: var(--color-bg-primary);
}

/* Quiz Step */
.quiz-step {
  display: none;
}

.quiz-step.is-active {
  display: block;
}

.quiz-step__header {
  margin-bottom: 40px;
}

.quiz-step__progress {
  font-size: var(--font-size-text);
  color: var(--color-text-primary);
  margin-bottom: 16px;
  display: block;
}

.quiz-step__question {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
}

/* Quiz Options Grid */
.quiz-step__options {
  display: grid;
  gap: 20px;
}

.quiz-step__options--2 {
  grid-template-columns: repeat(2, 1fr);
  max-width: 600px;
  margin: 0 auto;
}

.quiz-step__options--3 {
  grid-template-columns: repeat(3, 1fr);
}

.quiz-step__options--4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Quiz Option Card */
.quiz-option {
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
  transition: transform 0.2s ease;
}

.quiz-option:hover {
  transform: translateY(-4px);
}

.quiz-option.is-selected {
  opacity: 0.7;
}

/* Square style (Landings 1, 2) */
.quiz-option--square {
  border: 1px solid var(--color-border);
  background: var(--color-white);
}

.quiz-option--square .quiz-option__image {
  aspect-ratio: 1;
  background: #7F7F7F;
}

.quiz-option--square .quiz-option__text {
  display: block;
  padding: 16px;
  font-size: var(--font-size-text);
}

/* Rounded style (Landings 3, 4) */
.quiz-option--rounded {
  background: var(--color-white);
  border-radius: var(--card-border-radius-rounded);
  overflow: hidden;
}

.quiz-option--rounded .quiz-option__image {
  aspect-ratio: 1;
  background: #7F7F7F;
  border-radius: var(--card-border-radius-rounded) var(--card-border-radius-rounded) 0 0;
}

.quiz-option--rounded .quiz-option__text {
  display: block;
  padding: 16px;
  font-size: var(--font-size-text);
}

/* Responsive */
@media (max-width: 991.98px) {
  .quiz-step__options--4,
  .quiz-step__options--3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575.98px) {
  .quiz-step__options--4,
  .quiz-step__options--3,
  .quiz-step__options--2 {
    grid-template-columns: 1fr;
  }
}
```
