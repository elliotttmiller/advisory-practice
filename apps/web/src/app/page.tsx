import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-secondary-200">
        <nav className="container-wide flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FA</span>
            </div>
            <span className="font-semibold text-secondary-900">Financial Advisor</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Services
            </Link>
            <Link href="#about" className="text-secondary-600 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Sign In
            </Link>
            <Link href="/get-started" className="btn-primary">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content" className="pt-16">
        {/* Hero Section */}
        <section className="section bg-gradient-to-b from-primary-50 to-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="compliance-badge mb-6">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                SEC/FINRA Compliant
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
                Your Trusted Partner in{' '}
                <span className="text-gradient">Financial Success</span>
              </h1>
              <p className="text-lg md:text-xl text-secondary-600 mb-8">
                Expert financial advisory services with enterprise-grade security and 
                full regulatory compliance. Build your wealth with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-3">
                  Schedule Consultation
                </Link>
                <Link href="#services" className="btn-outline text-lg px-8 py-3">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="section">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Comprehensive Advisory Services
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                From wealth management to retirement planning, we provide personalized 
                financial guidance to help you achieve your goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Cards */}
              <article className="card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Wealth Management</h3>
                <p className="text-secondary-600">
                  Comprehensive portfolio management tailored to your risk tolerance and financial objectives.
                </p>
              </article>

              <article className="card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Retirement Planning</h3>
                <p className="text-secondary-600">
                  Strategic planning to secure your financial future and ensure a comfortable retirement.
                </p>
              </article>

              <article className="card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Investment Advisory</h3>
                <p className="text-secondary-600">
                  Expert guidance on investment strategies aligned with your long-term financial goals.
                </p>
              </article>

              <article className="card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Estate Planning</h3>
                <p className="text-secondary-600">
                  Protect your legacy and ensure smooth wealth transfer to future generations.
                </p>
              </article>

              <article className="card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Tax Planning</h3>
                <p className="text-secondary-600">
                  Optimize your tax strategy to maximize wealth retention and minimize liabilities.
                </p>
              </article>

              <article className="card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Business Advisory</h3>
                <p className="text-secondary-600">
                  Strategic financial guidance for business owners and entrepreneurs.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Trust Indicators Section */}
        <section className="section bg-secondary-50">
          <div className="container-wide">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">$500M+</div>
                <p className="text-secondary-600">Assets Under Management</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
                <p className="text-secondary-600">Satisfied Clients</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">25+</div>
                <p className="text-secondary-600">Years of Experience</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                <p className="text-secondary-600">Regulatory Compliance</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="section bg-primary-600">
          <div className="container-narrow text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Financial Journey?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Schedule a free consultation with our certified financial advisors.
            </p>
            <Link href="/get-started" className="btn bg-white text-primary-600 hover:bg-primary-50 text-lg px-8 py-3">
              Book Your Free Consultation
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="container-wide">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FA</span>
                </div>
                <span className="font-semibold">Financial Advisor</span>
              </div>
              <p className="text-secondary-400 text-sm">
                Trusted financial advisory services with enterprise-grade security.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-secondary-400 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Wealth Management</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Retirement Planning</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Investment Advisory</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-secondary-400 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Our Team</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-secondary-400 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Form CRS</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-400 text-sm">
              © {new Date().getFullYear()} Financial Advisor Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-secondary-400 text-sm">
              <span className="compliance-badge bg-secondary-800 text-secondary-300">SEC Registered</span>
              <span className="compliance-badge bg-secondary-800 text-secondary-300">FINRA Member</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
