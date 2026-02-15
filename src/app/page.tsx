import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <div className="container">
        {/* 1) HERO */}
        <section id="hero" className="hero">
          <Image
            src="/logo.png"
            alt="ClearMargin Logo"
            width={64}
            height={64}
            style={{ marginBottom: '32px' }}
            priority
          />
          <h1>Understand your real profit.</h1>
          <p>
            ClearMargin turns your Shopify export into a calm, plain-English monthly summary — so you can see what you’re actually making after fees, ads, and refunds.
          </p>
          <button type="button">Get Early Access – $10/month</button>
          <p className="microcopy">
            No dashboards. No complexity. Just truth.
          </p>
        </section>

        {/* 2) PROBLEM */}
        <section id="problem" className="problem">
          <h2>Revenue isn’t profit.</h2>
          <div className="problem-content">
            <p>
              Most Shopify sellers look at revenue and hope for the best. But between payment fees, refunds, and ad spend, it’s hard to know your true net. Shopify analytics can feel overwhelming — and spreadsheets don’t always add up.
            </p>
            <p className="emphasized">
              You shouldn’t need an accountant to understand your own business.
            </p>
          </div>
        </section>

        {/* 3) HOW IT WORKS */}
        <section id="how-it-works" className="how-it-works">
          <div className="steps-grid">
            <div>
              <div className="step-number">01</div>
              <p className="step-text">Upload your Shopify export</p>
            </div>
            <div>
              <div className="step-number">02</div>
              <p className="step-text">We calculate your true net profit</p>
            </div>
            <div>
              <div className="step-number">03</div>
              <p className="step-text">Get a clear monthly summary</p>
            </div>
          </div>
          <p className="footer-text">That’s it.</p>
        </section>

        {/* 4) SAMPLE REPORT */}
        <section id="sample-report">
          <div className="summary-card">
            <h3>April 2025 Summary</h3>

            <div className="metrics-list">
              <div className="metric-item">
                <span>Gross Revenue</span>
                <span className="metric-value">$12,430.00</span>
              </div>
              <div className="metric-item">
                <span>Fees + Refunds</span>
                <span className="metric-value">-$1,840.00</span>
              </div>
              <div className="metric-item">
                <span>Ad Spend</span>
                <span className="metric-value">-$2,300.00</span>
              </div>
              <div className="metric-item total">
                <span>Real Profit</span>
                <span className="metric-value">$8,290.00</span>
              </div>
            </div>

            <div className="insights-list">
              <div>
                <p className="insight-label">Top Product by Profit</p>
                <p>"Minimalist Leather Wallet" yielded $2,140 in net profit this month.</p>
              </div>
              <div>
                <p className="insight-label">Margin Attention</p>
                <p>"Canvas Tote Bag" dropped to 9% margin due to rising Meta ad costs.</p>
              </div>
              <div className="warning-box">
                ⚠️ Warning: Ad costs for "Tote Bag" exceeded the gross margin per unit.
              </div>
            </div>
          </div>
        </section>

        {/* 5) WHO IT’S FOR */}
        <section id="who-it-is-for" className="who-it-for">
          <h2>Built for solo sellers.</h2>
          <ul>
            <li>✔ Solo Shopify store owners</li>
            <li>✔ $1k–$20k per month in revenue</li>
            <li>✔ Sellers without accounting backgrounds</li>
            <li>✔ Anyone tired of guessing their margin</li>
          </ul>
          <p className="exclusion">
            If you have a CFO or a marketing team, this isn't for you.
          </p>
        </section>

        {/* 6) PRICING */}
        <section id="pricing" className="pricing">
          <h2>Simple Access.</h2>
          <p>ClearMargin costs $10 per month. No contracts. Cancel anytime.</p>
          <button type="button">Get Early Access</button>
        </section>

        {/* 7) FOOTER */}
        <footer>
          <p className="contact">hello@clearmargin.com</p>
          <p className="copyright">© {new Date().getFullYear()} ClearMargin. Financial Clarity, Simplified.</p>
        </footer>
      </div>
    </main>
  );
}
