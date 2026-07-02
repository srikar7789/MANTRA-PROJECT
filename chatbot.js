/* ===================================================================
   Skyline Suites — Rule-Based FAQ Chatbot Widget
   Drop this file in and add <script src="chatbot.js"></script>
   before </body> on every page. No API key, no backend required.
=================================================================== */
(function () {
  "use strict";

  const KB = [
    {
      keywords: ["hi", "hello", "hey", "good morning", "good evening"],
      reply: "Hi there! 👋 I'm the Skyline Suites virtual assistant. Ask me about rooms, pricing, booking, amenities, or how to reach us."
    },
    {
      keywords: ["room type", "types of room", "kinds of room", "rooms available", "what rooms"],
      reply: "We have 4 room types:<br>• Classic Room — 28 m², from ₹1500/night<br>• Deluxe Room — 36 m², from ₹2500/night<br>• Skyline Suite — 52 m², from ₹4000/night<br>• Penthouse Suite — 88 m², from ₹5000/night<br><a href='rooms.html'>See full details →</a>"
    },
    {
      keywords: ["price", "cost", "rate", "how much", "charges", "tariff"],
      reply: "Nightly rates start at ₹1500 for a Classic Room and go up to ₹5000 for the Penthouse Suite. Full pricing is on our <a href='rooms.html'>Rooms page</a>."
    },
    {
      keywords: ["book", "booking", "reserve", "reservation", "availability"],
      reply: "You can book directly on our <a href='booking.html'>Booking page</a> — just pick your dates, room type, and guest count."
    },
    {
      keywords: ["cancel", "cancellation", "refund"],
      reply: "Our Skyline Suite offers free cancellation up to 48 hours before check-in. For other rooms, please check your booking confirmation or contact us for specifics."
    },
    {
      keywords: ["pool", "swimming", "swim"],
      reply: "We have a rooftop infinity pool, open from sunrise to late evening — a great spot to relax with a skyline view."
    },
    {
      keywords: ["restaurant", "food", "dining", "eat", "breakfast", "menu"],
      reply: "Our in-house restaurant serves seasonal tasting menus from our chef's table, paired with a curated wine cellar."
    },
    {
      keywords: ["address", "location", "where are you", "directions"],
      reply: "We're located at Somewhere, in the World, 010101. You'll find a map on our <a href='contact.html'>Contact page</a>."
    },
    {
      keywords: ["phone", "call", "number", "contact number"],
      reply: "You can reach our front desk 24/7 at +91 1234567890."
    },
    {
      keywords: ["email", "mail"],
      reply: "Email us anytime at stay@skylinesuites.example."
    },
    {
      keywords: ["contact", "reach you", "get in touch"],
      reply: "You can call us at +91 1234567890, email stay@skylinesuites.example, or use the form on our <a href='contact.html'>Contact page</a>."
    },
    {
      keywords: ["check in", "check-in", "checkin time"],
      reply: "Standard check-in is from 2:00 PM. Early check-in can be requested via the Booking page's special requests field, subject to availability."
    },
    {
      keywords: ["check out", "check-out", "checkout time"],
      reply: "Check-out is by 11:00 AM. Late check-out may be arranged with the front desk, subject to availability."
    },
    {
      keywords: ["wifi", "wi-fi", "internet"],
      reply: "Yes, complimentary high-speed Wi-Fi is available throughout the hotel, including all rooms and common areas."
    },
    {
      keywords: ["parking", "car park"],
      reply: "On-site parking is available for hotel guests. Let the front desk know if you're arriving by car."
    },
    {
      keywords: ["pet", "dog", "cat"],
      reply: "Please contact our front desk directly at +91 1234567890 to check pet policies before booking."
    },
    {
      keywords: ["about", "history", "who are you", "established", "founded"],
      reply: "Skyline Suites opened in 2014 as an independently run hotel — 64 suites & rooms, a 4.9 average rating, and 30+ resident staff. More on our <a href='about.html'>About page</a>."
    },
    {
      keywords: ["gallery", "photo", "pictures", "images"],
      reply: "Take a look at our <a href='gallery.html'>Gallery page</a> for photos of rooms, the pool, restaurant, and more."
    },
    {
      keywords: ["thank", "thanks"],
      reply: "You're very welcome! Let me know if there's anything else I can help with. 😊"
    },
    {
      keywords: ["bye", "goodbye", "see you"],
      reply: "Thanks for stopping by — hope to welcome you to Skyline Suites soon! 👋"
    },
    {
      keywords: ["human", "agent", "real person", "representative", "staff member"],
      reply: "For a real person, call our 24/7 front desk at +91 1234567890 or email stay@skylinesuites.example."
    }
  ];

  const FALLBACK = "I'm not sure about that one. Try asking about rooms, pricing, booking, amenities, or contact details — or call us directly at +91 1234567890.";

  const QUICK_REPLIES = ["Room types", "Pricing", "How do I book?", "Contact info"];

  function findReply(userText) {
    const text = userText.toLowerCase();
    for (const entry of KB) {
      if (entry.keywords.some((k) => text.includes(k))) {
        return entry.reply;
      }
    }
    return FALLBACK;
  }

  const css = `
  .sk-chat-btn {
    position: fixed; bottom: 22px; right: 22px; z-index: 9999;
    width: 58px; height: 58px; border-radius: 50%;
    background: #111111; color: #ffffff; border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    font-size: 26px; transition: transform 0.2s ease;
  }
  .sk-chat-btn:hover { transform: scale(1.06); }

  .sk-chat-window {
    position: fixed; bottom: 92px; right: 22px; z-index: 9999;
    width: 340px; max-width: calc(100vw - 32px);
    height: 460px; max-height: calc(100vh - 140px);
    background: #fff; border-radius: 16px; overflow: hidden;
    box-shadow: 0 12px 40px rgba(0,0,0,0.25);
    display: none; flex-direction: column;
    font-family: inherit;
    border: 1px solid rgba(0,0,0,0.08);
  }
  .sk-chat-window.open { display: flex; }

  .sk-chat-header {
    background: #111111; color: #fff; padding: 14px 16px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .sk-chat-header h3 { margin: 0; font-size: 15px; }
  .sk-chat-header span { font-size: 12px; opacity: 0.7; }
  .sk-chat-close {
    background: none; border: none; color: #fff; font-size: 20px;
    cursor: pointer; line-height: 1; padding: 4px;
  }

  .sk-chat-body {
    flex: 1; overflow-y: auto; padding: 14px;
    display: flex; flex-direction: column; gap: 10px;
    background: #fafafa;
  }
  .sk-msg { max-width: 82%; padding: 9px 12px; border-radius: 12px; font-size: 13.5px; line-height: 1.45; }
  .sk-msg a { color: inherit; text-decoration: underline; }
  .sk-msg.bot { background: #eeeeee; color: #111; align-self: flex-start; border-bottom-left-radius: 4px; }
  .sk-msg.user { background: #111111; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }

  .sk-quick-replies { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 14px 10px; background: #fafafa; }
  .sk-quick-btn {
    background: #fff; border: 1px solid #ddd; border-radius: 999px;
    padding: 6px 10px; font-size: 12px; cursor: pointer; color: #111;
  }
  .sk-quick-btn:hover { background: #f0f0f0; }

  .sk-chat-input-row {
    display: flex; gap: 8px; padding: 10px; border-top: 1px solid #eee; background: #fff;
  }
  .sk-chat-input {
    flex: 1; border: 1px solid #ddd; border-radius: 999px;
    padding: 9px 14px; font-size: 13.5px; outline: none;
  }
  .sk-chat-input:focus { border-color: #111; }
  .sk-chat-send {
    background: #111; color: #fff; border: none; border-radius: 50%;
    width: 38px; height: 38px; cursor: pointer; font-size: 16px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .sk-chat-send:hover { opacity: 0.85; }

  @media (max-width: 420px) {
    .sk-chat-window { right: 16px; left: 16px; width: auto; }
    .sk-chat-btn { right: 16px; }
  }
  `;
  const styleTag = document.createElement("style");
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <button class="sk-chat-btn" id="skChatToggle" aria-label="Open chat">💬</button>
    <div class="sk-chat-window" id="skChatWindow">
      <div class="sk-chat-header">
        <div>
          <h3>Skyline Suites</h3>
          <span>Usually replies instantly</span>
        </div>
        <button class="sk-chat-close" id="skChatClose" aria-label="Close chat">✕</button>
      </div>
      <div class="sk-chat-body" id="skChatBody"></div>
      <div class="sk-quick-replies" id="skQuickReplies"></div>
      <div class="sk-chat-input-row">
        <input class="sk-chat-input" id="skChatInput" type="text" placeholder="Type a message..." />
        <button class="sk-chat-send" id="skChatSend" aria-label="Send">➤</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  const toggleBtn = document.getElementById("skChatToggle");
  const closeBtn = document.getElementById("skChatClose");
  const chatWindow = document.getElementById("skChatWindow");
  const body = document.getElementById("skChatBody");
  const input = document.getElementById("skChatInput");
  const sendBtn = document.getElementById("skChatSend");
  const quickWrap = document.getElementById("skQuickReplies");

  let greeted = false;

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = "sk-msg " + sender;
    msg.innerHTML = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function renderQuickReplies() {
    quickWrap.innerHTML = "";
    QUICK_REPLIES.forEach((q) => {
      const btn = document.createElement("button");
      btn.className = "sk-quick-btn";
      btn.textContent = q;
      btn.addEventListener("click", () => handleUserMessage(q));
      quickWrap.appendChild(btn);
    });
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;
    addMessage(text, "user");
    input.value = "";
    setTimeout(() => {
      const reply = findReply(text);
      addMessage(reply, "bot");
    }, 350);
  }

  toggleBtn.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
    if (chatWindow.classList.contains("open") && !greeted) {
      addMessage("Hi! 👋 I'm the Skyline Suites assistant. Ask me about rooms, pricing, booking, or how to reach us.", "bot");
      renderQuickReplies();
      greeted = true;
    }
  });

  closeBtn.addEventListener("click", () => chatWindow.classList.remove("open"));

  sendBtn.addEventListener("click", () => handleUserMessage(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserMessage(input.value);
  });
})();