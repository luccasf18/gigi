export interface InviteRow {
  label: string;
  value: string;
}

export const siteContent = {
  open: {
    title: "Giovanna,",
    line: "tenho uma pergunta pra te fazer.",
    hint: "leva 30 segundos",
    button: "pode começar",
  },

  invite: {
    tag: "a ideia",
    title: "Você e eu",
    rows: [
      { label: "O que", value: "um jantar" },
      { label: "onde", value: "Segredo" },
      { label: "quando", value: "sexta" },
    ] as InviteRow[],
    note: "sem peso, só uma boa companhia",
    button: "Vamos",
  },

  response: {
    question: "Então, bora?",
    yesButton: "Bora",
    maybeButton: "deixa eu pensar",
    timerNote:
      "se não acertar esse botão em {s}s, fica confirmado que você vai",
    teases: [
      "por aqui não",
      "tenta de novo",
      "quase",
      "tá difícil, né",
      "pode desistir",
    ],
    yesMessage: "Isso. Então tá marcado: sexta eu te busco às 19h.",
    autoYesMessage:
      "Não acertou o botão a tempo. Então tá decidido: nos vemos sexta, te busco às 19h.",
    maybeMessage: "Tranquilo. Tô por aqui quando quiser.",
  },

  whatsapp: {
    phone: "5511955556138",
    message: "Oii, Sexta então né?",
    button: "vamos então?",
  },
};
