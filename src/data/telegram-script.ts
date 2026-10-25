export interface TelegramMessage {
  id: string;
  sender: "user" | "bot";
  kind: "command" | "summary" | "alert" | "confirmation";
  time: string;
  delayMs: number;
  text?: string;
  summaryData?: {
    date: string;
    aspi: string;
    aspiChange: string;
    spSl20: string;
    spSl20Change: string;
    turnover: string;
    advancersDecliners: string;
    topGainers: { ticker: string; pct: string }[];
    topLosers: { ticker: string; pct: string }[];
    aiAnalysis: string;
  };
  alertData?: {
    ticker: string;
    price: string;
    changePct: string;
    volumeMultiplier: string;
    triggerReason: string;
  };
}

export const telegramScript: TelegramMessage[] = [
  {
    id: "msg-1",
    sender: "user",
    kind: "command",
    time: "14:30",
    delayMs: 600,
    text: "/today",
  },
  {
    id: "msg-2",
    sender: "bot",
    kind: "summary",
    time: "14:30",
    delayMs: 1600,
    summaryData: {
      date: "Market Close",
      aspi: "11,842.15",
      aspiChange: "+0.84%",
      spSl20: "3,485.60",
      spSl20Change: "+1.12%",
      turnover: "LKR 2.45B",
      advancersDecliners: "114 / 62",
      topGainers: [
        { ticker: "DEMO.N0000", pct: "+7.8%" },
        { ticker: "SAMPLE.N0001", pct: "+5.4%" },
        { ticker: "TEST.X0002", pct: "+4.9%" },
      ],
      topLosers: [
        { ticker: "MOCK.N0000", pct: "-4.2%" },
        { ticker: "TEMP.N0001", pct: "-3.1%" },
        { ticker: "SPEC.X0002", pct: "-2.8%" },
      ],
      aiAnalysis:
        "The ASPI rebounded strongly today supported by aggressive institutional turnover in banking and diversified financials. Sustained net foreign inflow signals continued positive sentiment heading into tomorrow's trading session.",
    },
  },
  {
    id: "msg-3",
    sender: "bot",
    kind: "alert",
    time: "14:33",
    delayMs: 3200,
    alertData: {
      ticker: "DEMO.N0000",
      price: "LKR 84.50",
      changePct: "+6.2%",
      volumeMultiplier: "3.4x avg volume",
      triggerReason: "Price ≥ +5.0% and Volume ≥ 3.0× 20-day moving average",
    },
  },
  {
    id: "msg-4",
    sender: "user",
    kind: "command",
    time: "14:33",
    delayMs: 1400,
    text: "Mute 1h",
  },
  {
    id: "msg-5",
    sender: "bot",
    kind: "confirmation",
    time: "14:33",
    delayMs: 800,
    text: "🔕 Muted DEMO.N0000 alerts for 1 hour.",
  },
];
