# The Harley Group: Founder Workflow Guide (Antigravity + ChatGPT)

*A plain-English operational runbook for Robbie Harley (Founder & CEO).*

---

## 1. The Core Principle: Clear Division of Labour

To get 100% value out of both subscriptions without duplicate work, wasting AI tokens, or having context drift, divide their roles cleanly:

| Tool | Role | Real-World Equivalent | What You Use It For |
| :--- | :--- | :--- | :--- |
| **ChatGPT (Plus / Work)** | **Chief of Staff & Commercial Brain** | Your Executive Advisor & Sales Strategist | • Daily morning planning and goal setting.<br>• Writing cold outreach emails and WhatsApp pitches.<br>• Practicing objection handling for trade calls.<br>• Reviewing business numbers, packages, and strategy.<br>• Conversational thinking on your phone, tablet, or laptop. |
| **Google Antigravity (This IDE)** | **Master Builder & Senior Engineer** | Your Technical Delivery Partner | • Writing, updating, and designing web pages.<br>• Generating and embedding authentic trade photography.<br>• Running all 205 automated quality tests and safety guards.<br>• Linking database tables, auth, and payment webhooks.<br>• Committing and pushing code to GitHub and Cloudflare. |

**The Golden Rule**: *ChatGPT plans and thinks; Antigravity builds, tests, and deploys.*

---

## 2. Is the Handover "Local Only"? (No, It Is on GitHub!)

Your handover log (`docs/HANDOVER.md`) and project status (`PROJECT_STATUS.md`) are **not local only**.

Every time Antigravity pushes your code, it goes straight to your public/private GitHub repository:
**`https://github.com/SkyPilot24/harley-digital-works`**

This means GitHub is already the single, shared bridge between Antigravity, ChatGPT, and your live hosting on Cloudflare.

---

## 3. The 10-Second "Handshake" Between Antigravity and ChatGPT

When you finish working in Antigravity and want to switch to ChatGPT (or vice-versa), you never need to copy-paste thousands of lines of code or re-explain the business.

### Step 1: Run the 1-Click Clipboard Helper
In the Antigravity terminal, run:
```bash
npm run handover:copy
```
*(This extracts the latest verified commit, current completed tasks, and ratified commercial rules, and **automatically copies them straight to your Windows clipboard**).*

### Step 2: Paste into ChatGPT
Open ChatGPT and press `Ctrl + V`.

It will paste a clean, 20-line executive brief like this:
> === THE HARLEY GROUP · CHATGPT HANDOVER BRIEF ===  
> Commit: 670869c (on origin/main)  
> Scope: Bespoke photography and RG Electrical demo overhauled...  
> Rules: £1,495 setup + £249/mo care, 0 VAT, max 2 active builds...

Then ask your question:
> *"What are my top 3 commercial priorities today based on this update?"*

---

## 4. One-Time Setup: ChatGPT Custom Instructions

To stop ChatGPT from ever hallucinating old prices (like £95/mo) or outdated turnaround promises (like 14 days), paste this into your **ChatGPT Custom Instructions** (or into your ChatGPT Project instructions):

### Field 1: "What would you like ChatGPT to know about you to provide better responses?"
```text
I am Robbie Harley, founder and CEO of The Harley Group Ltd (parent holding organisation). 
- Harley Digital Works (HDW) is our customer-facing web and digital services agency for UK trade contractors (electricians, heating engineers, roofers).
- Harley Labs (HL) is our AI automation and SaaS experiment arm.
- Standard HDW Package: £1,495 setup (50/50 split) + £249/month ongoing care. 
- Tax: No VAT charged (The Harley Group is not VAT registered).
- Capacity & Delivery: Agreed milestone schedule (never promise 14 days). Strictly maximum 2 active builds.
- Primary Territory: Bristol, Bath, and the M4 corridor.
- Development Platform: Antigravity IDE handles all local coding and pushes to GitHub (SkyPilot24/harley-digital-works).
```

### Field 2: "How would you like ChatGPT to respond?"
```text
- Speak in plain British English, step-by-step ("talk to me like I'm 5"). Lead with the bottom line first. Avoid tech jargon.
- Translate technical progress into real-world business value (cash, customer trust, booked trade jobs).
- Act as my Chief of Staff: help me prioritize my day, draft outbound trade communications, and review commercial decisions.
- Do not write speculative code or propose framework migrations; assume Antigravity executes all technical work directly in the GitHub repo.
```

---

## 5. Summary of Daily Routine

1. **Morning with ChatGPT**: Open ChatGPT, paste the brief from `npm run handover:copy`, and ask: *"What should I focus on today to generate revenue?"*
2. **Daytime with Antigravity**: Give Antigravity the chosen task (e.g. *"Audit the plumbing route and make sure it has real photos"*). Antigravity builds it, tests it, and shows it to you on `http://localhost:3000`.
3. **Evening Push**: Antigravity commits and pushes the work to GitHub, updates `docs/HANDOVER.md`, and everything is ready for the next day.
