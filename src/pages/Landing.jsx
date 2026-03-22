import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Layout";
import Button from "../components/Button";
import { fetchPlatformStats } from "../data/mockData";
import "./Landing.css";

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [counters, setCounters] = useState({
    sellers: 0,
    buyers: 0,
    transactions: 0,
  });

  useEffect(() => {
    if (user) {
      navigate(`/${user.role === "consumer" ? "consumer" : user.role}`);
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchPlatformStats().then((stats) => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const ease = 1 - Math.pow(1 - progress, 3);
        setCounters({
          sellers: Math.floor((stats.totalSellers || 0) * ease),
          buyers: Math.floor((stats.totalBuyers || 0) * ease),
          transactions: Math.floor((stats.totalTransactions || 0) * ease),
        });
        if (step >= steps) clearInterval(timer);
      }, interval);
    });
  }, []);

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <nav className="landing-nav">
          <div className="landing-logo">
            <span className="landing-logo-icon">🌿</span>
            <span className="landing-logo-text">Let's Order</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </nav>
        <div className="hero-content container">
          <div className="hero-text animate-slide-up">
            <div className="hero-badge">🚀 Voice-Enabled Platform</div>
            <h1>
              Farm Fresh,
              <br />
              <span className="text-gradient">Direct to You</span>
            </h1>
            <p className="hero-desc">
              India's first voice-enabled farm-to-fork digital marketplace.
              Connecting sellers, buyers, and consumers — transparently.
            </p>
            <div className="hero-actions">
              <Button
                variant="highlight"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Get Started Free
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More ↓
              </Button>
            </div>
          </div>
          <div className="hero-visual animate-fade-in">
            <div className="hero-card hero-card-1">
              <span>🌾</span>
              <div>
                <strong>500 kg Rice</strong>
                <small>Product: March 15</small>
              </div>
            </div>
            <div className="hero-card hero-card-2">
              <span>📦</span>
              <div>
                <strong>Order Confirmed</strong>
                <small>₹22,500 locked</small>
              </div>
            </div>
            <div className="hero-card hero-card-3">
              <span>🎤</span>
              <div>
                <strong>"List 200 kg banana"</strong>
                <small>Voice input detected</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-number">
              {counters.sellers.toLocaleString()}+
            </span>
            <span className="stat-label">Sellers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {counters.buyers.toLocaleString()}+
            </span>
            <span className="stat-label">Buyers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {counters.transactions.toLocaleString()}+
            </span>
            <span className="stat-label">Transactions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">16+</span>
            <span className="stat-label">Item Types</span>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="roles-section container">
        <h2 className="section-title">
          Built for Everyone in the Supply Chain
        </h2>
        <p className="section-desc">
          Whether you grow it, buy it, or eat it — we've got you covered.
        </p>
        <div className="roles-grid stagger-children">
          <div className="role-card">
            <div className="role-icon">🏬</div>
            <h3>For Sellers</h3>
            <ul>
              <li>✓ List product via voice or text</li>
              <li>✓ Auto-aggregation with nearby farms</li>
              <li>✓ Pre-product price locking</li>
              <li>✓ Transparent payment tracking</li>
            </ul>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => navigate("/login")}
            >
              Join as Seller
            </Button>
          </div>
          <div className="role-card featured">
            <div className="role-badge">Most Popular</div>
            <div className="role-icon">🏬</div>
            <h3>For Bulk Buyers</h3>
            <ul>
              <li>✓ Browse aggregated supply</li>
              <li>✓ Pre-order with price locks</li>
              <li>✓ Supply forecasting & analytics</li>
              <li>✓ Invoice management</li>
            </ul>
            <Button size="sm" fullWidth onClick={() => navigate("/login")}>
              Join as Buyer
            </Button>
          </div>
          <div className="role-card">
            <div className="role-icon">🛒</div>
            <h3>For Consumers</h3>
            <ul>
              <li>✓ Browse farm-fresh produce</li>
              <li>✓ Order in 2–3 taps</li>
              <li>✓ Track delivery in real-time</li>
              <li>✓ Know your seller</li>
            </ul>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => navigate("/login")}
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">From farm to fork in 4 simple steps</p>
          <div className="how-steps stagger-children">
            <div className="how-step">
              <div className="step-number">1</div>
              <div className="step-icon">🎤</div>
              <h4>List Product</h4>
              <p>
                Sellers list upcoming produce via voice or text — item,
                quantity, date.
              </p>
            </div>
            <div className="step-connector">→</div>
            <div className="how-step">
              <div className="step-number">2</div>
              <div className="step-icon">🔗</div>
              <h4>Smart Aggregation</h4>
              <p>
                Small farm outputs are intelligently grouped into bulk clusters.
              </p>
            </div>
            <div className="step-connector">→</div>
            <div className="how-step">
              <div className="step-number">3</div>
              <div className="step-icon">🤝</div>
              <h4>Match & Lock Price</h4>
              <p>
                Buyers browse supply, place pre-orders, and lock competitive
                prices.
              </p>
            </div>
            <div className="step-connector">→</div>
            <div className="how-step">
              <div className="step-number">4</div>
              <div className="step-icon">🚛</div>
              <h4>Deliver & Pay</h4>
              <p>
                Transparent fulfillment with real-time tracking and digital
                payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Ready to Transform Your Agri Business?</h2>
          <p className="section-desc">
            Join thousands of sellers and buyers already using the platform.
          </p>
          <Button
            variant="highlight"
            size="lg"
            onClick={() => navigate("/login")}
          >
            Get Started Now →
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div
                className="landing-logo"
                style={{ marginBottom: "var(--space-3)" }}
              >
                <span className="landing-logo-icon">🌿</span>
                <span className="landing-logo-text">Let's Order</span>
              </div>
              <p className="text-sm text-muted">
                Voice-enabled farm-to-fork digital supply chain platform.
              </p>
            </div>
            <div>
              <h4 className="footer-heading">Platform</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">For Sellers</a>
                </li>
                <li>
                  <a href="#">For Buyers</a>
                </li>
                <li>
                  <a href="#">For Consumers</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Let's Order. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
