# High-Velocity Trade Outbound Prospecting Engine

This playbook provides automated batch merge scripts and dynamic personalization matrices for executing cold email, direct mail, and WhatsApp outreach across UK trade sectors.

---

## 1. Dynamic Merge Variables Matrix

| Variable             | Definition                     | Example Values                                            |
| -------------------- | ------------------------------ | --------------------------------------------------------- |
| `{{First_Name}}`     | Owner / Director First Name    | Mark, Dave, Gary, Sarah, Rob                              |
| `{{Company_Name}}`   | Registered Business Name       | Apex Electrical, Vanguard Roofing, Harley Heating         |
| `{{Trade_Niche}}`    | Specific Trade Specialism      | NICEIC electrician, Gas Safe heating engineer, GRP roofer |
| `{{City_Region}}`    | Operating County / Metro       | Greater Manchester, West Midlands, West Yorkshire         |
| `{{Demo_URL}}`       | Direct interactive trade demo  | `https://harleydigitalworks.com/demos?trade=electrical`   |
| `{{Calculator_URL}}` | Direct ROI calculator link     | `https://harleydigitalworks.com/calculator`               |
| `{{Local_Hub_URL}}`  | Regional coverage landing page | `https://harleydigitalworks.com/locations/manchester`     |

---

## 2. High-Converting WhatsApp Direct Outreach Sequence

### Message 1: The 15-Second Video / Demo Pitch

> **Subject / Greeting**:
> "Hi {{First_Name}}, came across {{Company_Name}} while looking at top {{Trade_Niche}} contractors around {{City_Region}}.
>
> We just built an interactive website prototype specifically for UK {{Trade_Niche}} businesses with an instant job price estimator and click-to-WhatsApp quote tool.
>
> You can test the live demo on your phone here:
> 👉 {{Demo_URL}}
>
> We build and write the entire website for you in 14 days for a fixed £1,495 (no technical work needed on your end).
>
> Worth a quick 5-min look?"

### Message 2: The ROI & Competitor Angle (Sent 48 Hours Later)

> "Hi {{First_Name}}, just following up on {{Company_Name}}.
>
> We ran the numbers on local search volume for {{Trade_Niche}} in {{City_Region}}. Just 2 extra customer enquiries a month generates an estimated +£35,000/year in turnover.
>
> You can run your own numbers on our free calculator here:
> 👉 {{Calculator_URL}}
>
> Would you like us to put together a fixed-price proposal for {{Company_Name}} this week?"

---

## 3. High-Impact Direct Mail Letter (A4 Print / Postal)

Use template: [`docs/print-materials/01-harley-digital-works-proposal-matrix.html`](../print-materials/01-harley-digital-works-proposal-matrix.html)

**Envelope Eyebrow**: _"Confidential: Website Audit & Local Market Report for the Directors of {{Company_Name}}"_
**Enclosures**:

1. Printed 1-page Proposal Matrix
2. Printed 14-Day Delivery Roadmap
3. Personal handwritten post-it note: _"{{First_Name}} — checked out your work in {{City_Region}}. We can have this live for {{Company_Name}} in 14 days. Call my direct mobile on 0161 820 4910. — Jack, Harley Digital Works"_

---

## 4. Prospecting Batch Target List (Pre-Qualified Sample)

```json
[
  {
    "company": "Apex Electrical & Solar",
    "contact": "Mark Taylor",
    "email": "mark@apexelectricalmcr.co.uk",
    "phone": "0161 820 4910",
    "trade": "electrical",
    "city": "manchester",
    "package": "Launch Website (£1,495)",
    "status": "qualified"
  },
  {
    "company": "Vanguard Roofing & Property Care",
    "contact": "Dave Evans",
    "email": "dave@vanguardroofingmidlands.co.uk",
    "phone": "0121 740 8820",
    "trade": "roofing",
    "city": "birmingham",
    "package": "Growth Website (£2,995)",
    "status": "new"
  },
  {
    "company": "Harley Heating & Gas",
    "contact": "Gary Thompson",
    "email": "gary@harleyheatingyorkshire.co.uk",
    "phone": "0113 490 1280",
    "trade": "heating",
    "city": "leeds",
    "package": "Launch Website (£1,495)",
    "status": "contacted"
  }
]
```
